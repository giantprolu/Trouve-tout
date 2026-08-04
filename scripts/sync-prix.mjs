/**
 * Synchronise src/data/prix-synchronises.json avec le flux produit Awin/ManoMano.
 *
 * Sources, par ordre de préférence :
 *
 *  1. AWIN_DATAFEED_API_KEY — le script découvre alors lui-même les flux de
 *     l'annonceur, les trie du plus fraîchement importé au plus ancien et les
 *     parcourt jusqu'à retrouver toutes les fiches. C'est le mode à utiliser :
 *     il survit au renommage d'un flux et, surtout, à son abandon par
 *     l'annonceur — c'est exactement ce qui est arrivé le 2026-08-04, où
 *     AWIN_FEED_URL pointait depuis trois mois sur un flux mort.
 *  2. AWIN_FEED_URL — une URL unique, ou un chemin de fichier local pour
 *     tester sans réseau.
 *
 *   AWIN_DATAFEED_API_KEY=… node scripts/sync-prix.mjs
 *   AWIN_FEED_URL=./datafeed_3007871.csv node scripts/sync-prix.mjs
 *
 * Matching : la plupart des `urlMarchand` de src/lib/data.ts sont des URL
 * Awin pré-trackées (`?p=<aw_product_id>&...`) — ce `p` est directement la
 * colonne `aw_product_id` du flux, donc aucun identifiant supplémentaire à
 * saisir. Une partie des fiches (liens ManoMano bruts, pas encore repassés
 * par le générateur de lien tracké) portent à la place `?model_id=<id>` :
 * cet id correspond à la colonne `merchant_product_id` du flux (l'id interne
 * ManoMano, stable), pas à `aw_product_id` (qui varie d'une annonce Awin à
 * l'autre pour un même produit — plusieurs annonces peuvent exister en
 * doublon). On matche d'abord sur aw_product_id, puis en repli sur
 * merchant_product_id pour les fiches qui n'ont que ça.
 */
import { readFileSync, writeFileSync, createReadStream, statSync } from 'node:fs';
import { Readable } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { parse } from 'csv-parse';

const feedUrl = process.env.AWIN_FEED_URL;
if (!feedUrl && !process.env.AWIN_DATAFEED_API_KEY) {
  console.error(
    '\n✖ Ni AWIN_DATAFEED_API_KEY ni AWIN_FEED_URL — aucune source de prix.\n' +
      '  La clé datafeed se récupère dans Awin, et laisse le script choisir\n' +
      '  lui-même un flux à jour.\n',
  );
  process.exit(1);
}

/**
 * Renvoie le flux ET la date a laquelle Awin l'a genere.
 *
 * Cette date est la seule qui compte pour la fraicheur affichee sur le site :
 * l'heure a laquelle ce script tourne ne dit rien de l'age des prix. Awin
 * regenere ses exports Create-a-Feed a son propre rythme, donc telecharger
 * deux fois par jour un CSV vieux de dix jours donnerait, si on horodatait
 * au moment du run, un "prix verifie il y a 2 h" entierement faux — et un
 * `offers` JSON-LD en decalage avec le prix reel du marchand, ce que Google
 * sanctionne. Voir CLAUDE.md, sections "Prix" et "Donnees structurees".
 *
 * Constat du 2026-08-04 : ce flux-ci ne renvoie pas de `Last-Modified`. La
 * datation retombe alors sur les replis mis en place plus bas (colonne date
 * du flux, puis comparaison au snapshot precedent). L'en-tete reste teste en
 * premier au cas ou la configuration Awin changerait.
 */
async function fluxBrut(source) {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    const res = await fetch(source);
    if (!res.ok || !res.body) throw new Error(`Flux Awin injoignable (HTTP ${res.status})`);
    const lastModified = res.headers.get('last-modified');
    const genereLe = lastModified ? new Date(lastModified) : undefined;
    // Trace de diagnostic : si Awin se met un jour a dater ses exports, c'est
    // par un de ces en-tetes qu'on le verra, sans avoir a instrumenter a la main.
    const traces = ['last-modified', 'etag', 'age', 'date']
      .map((h) => [h, res.headers.get(h)])
      .filter(([, v]) => v);
    if (traces.length) {
      console.log(`En-têtes de datation : ${traces.map(([h, v]) => `${h}=${v}`).join(', ')}`);
    }
    return {
      stream: Readable.fromWeb(res.body),
      genereLe: genereLe && !Number.isNaN(genereLe.getTime()) ? genereLe : undefined,
    };
  }
  return { stream: createReadStream(source), genereLe: statSync(source).mtime };
}

/**
 * Certaines URL Create-a-Feed livrent le CSV compressé (`/compression/gzip/`).
 * On détecte le magic number plutôt que de se fier à l'URL ou aux en-têtes
 * HTTP (`fetch` décompresse déjà tout seul si le serveur pose
 * `Content-Encoding: gzip`, auquel cas le corps est déjà en clair).
 * Le flux entier (potentiellement plusieurs centaines de Mo une fois
 * décompressé — le compte Awin de ce projet a plusieurs variantes de flux
 * ManoMano actives) est traité au fil de l'eau, jamais chargé en RAM en
 * entier : seuls les deux premiers octets sont "regardés à l'avance" avant
 * de reconstituer le flux complet.
 */
async function fluxCsv(source) {
  const { stream: brut, genereLe } = await fluxBrut(source);
  const it = brut[Symbol.asyncIterator]();
  const premier = await it.next();
  const premierChunk = premier.done ? Buffer.alloc(0) : Buffer.from(premier.value);
  const gzip = premierChunk.length > 2 && premierChunk[0] === 0x1f && premierChunk[1] === 0x8b;

  async function* reassemble() {
    if (!premier.done) yield premierChunk;
    while (true) {
      const { value, done } = await it.next();
      if (done) return;
      yield value;
    }
  }
  const flux = Readable.from(reassemble());
  return { stream: gzip ? flux.pipe(createGunzip()) : flux, genereLe };
}

function prixNumerique(brut) {
  if (!brut) return undefined;
  const n = Number.parseFloat(String(brut).replace(/^[A-Z]{3}/, ''));
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Source de datation n°0, la seule officielle : Awin publie la liste des flux
 * auxquels le compte a acces, avec pour chacun la date de derniere mise a
 * jour interne (colonne "Last Imported").
 *
 *   https://productdata.awin.com/datafeed/list/apikey/<AWIN_DATAFEED_API_KEY>
 *
 * Attention, cette cle est distincte de celle de la Publisher API : elle se
 * recupere dans l'interface Awin, section Toolbox > Create-a-Feed. Sans elle
 * on retombe sur les replis ci-dessous, qui ne font que constater l'immobilite
 * du flux sans pouvoir la dater.
 */
const AWIN_ANNONCEUR_MANOMANO = process.env.AWIN_ADVERTISER_ID ?? '17547';

/** Un flux dont la derniere importation remonte a plus de ca ne vaut plus rien. */
const FLUX_PERIME_JOURS = Number(process.env.AWIN_FLUX_PERIME_JOURS ?? 7);

/**
 * Liste les flux de l'annonceur, du plus fraichement importe au plus ancien.
 *
 * C'est ce qui a permis de comprendre l'incident du 2026-08-04 : le compte
 * avait acces a des flux "ManoMano FR - Part 1/2" abandonnes par l'annonceur
 * le 2026-05-15, et a des flux vivants reimportes chaque nuit. `AWIN_FEED_URL`
 * pointait sur un flux mort, d'ou trois mois de prix figes. Se fier a un
 * ordre decroissant de `Last Imported` evite que ca se reproduise, meme si
 * l'annonceur renomme ou renumerote ses flux.
 */
async function fluxDisponibles() {
  const cle = process.env.AWIN_DATAFEED_API_KEY;
  if (!cle) return [];
  try {
    const res = await fetch(`https://productdata.awin.com/datafeed/list/apikey/${cle}`);
    if (!res.ok) {
      console.log(`⚠ Liste des flux Awin injoignable (HTTP ${res.status}) — repli sur AWIN_FEED_URL.`);
      return [];
    }
    const corps = Buffer.from(await res.arrayBuffer());
    const lignes = await new Promise((resoudre, rejeter) => {
      const acc = [];
      Readable.from([corps])
        .pipe(parse({ columns: true, skip_empty_lines: true, relax_quotes: true }))
        .on('data', (l) => acc.push(l))
        .on('end', () => resoudre(acc))
        .on('error', rejeter);
    });
    if (!lignes.length) return [];

    // Les intitules de colonnes d'Awin ont deja bouge par le passe : on les
    // reconnait par leur contenu plutot que par une egalite stricte.
    const cles = Object.keys(lignes[0]);
    const cleImport = cles.find((c) => /last.*import/i.test(c));
    const cleAnnonceur = cles.find((c) => /advertiser.*id/i.test(c));
    const cleUrl = cles.find((c) => /^url$/i.test(c));
    const cleNom = cles.find((c) => /feed.*name/i.test(c));
    const cleId = cles.find((c) => /feed.*id/i.test(c));
    if (!cleImport || !cleUrl) {
      console.log(`⚠ Colonnes inattendues dans la liste Awin (${cles.join(', ')}) — repli sur AWIN_FEED_URL.`);
      return [];
    }

    const flux = lignes
      .filter((l) => !cleAnnonceur || String(l[cleAnnonceur]).trim() === AWIN_ANNONCEUR_MANOMANO)
      .map((l) => ({
        id: cleId ? String(l[cleId]).trim() : '?',
        nom: cleNom ? String(l[cleNom]).trim() : '?',
        url: String(l[cleUrl]).trim(),
        // Awin publie ces dates en UTC sans le marqueur de fuseau.
        importeLe: new Date(String(l[cleImport]).trim().replace(' ', 'T') + 'Z'),
      }))
      .filter((f) => f.url && !Number.isNaN(f.importeLe.getTime()))
      .sort((a, b) => b.importeLe - a.importeLe);

    if (!flux.length) return [];
    const limite = Date.now() - FLUX_PERIME_JOURS * 86_400_000;
    const vivants = flux.filter((f) => f.importeLe.getTime() >= limite);
    const jours = (f) => Math.round((Date.now() - f.importeLe) / 86_400_000);

    console.log(`\n${flux.length} flux accessibles pour l'annonceur ${AWIN_ANNONCEUR_MANOMANO} :`);
    console.log(`  · le plus récent : ${flux[0].nom} (${flux[0].id}), importé il y a ${jours(flux[0])} j`);
    console.log(`  · ${vivants.length} de moins de ${FLUX_PERIME_JOURS} jours, ${flux.length - vivants.length} périmé(s)`);
    if (!vivants.length) {
      console.log(
        `\n⚠ Aucun flux frais : le plus récent date de ${jours(flux[0])} jours. L'annonceur a\n` +
          "  probablement cessé d'alimenter les flux auxquels ce compte a accès.",
      );
    }
    return vivants.length ? vivants : flux.slice(0, 1);
  } catch (e) {
    console.log(`⚠ Lecture de la liste des flux Awin impossible (${e.message}) — repli sur AWIN_FEED_URL.`);
    return [];
  }
}

/**
 * Repli n°2 quand l'en-tete HTTP manque : certains exports Awin embarquent
 * la date de derniere mise a jour dans une colonne. On la cherche sur la
 * premiere ligne parmi les intitules connus, et on ne la retient que si sa
 * valeur se parse vraiment en date — une colonne "last_updated" remplie de
 * chaines vides ne vaut pas mieux que pas de colonne du tout.
 */
const COLONNES_DATE = [
  'last_updated', 'last_updated_date', 'date_updated', 'updated_at',
  'timestamp', 'feed_date', 'date',
];

function detecterColonneDate(ligne) {
  for (const nom of COLONNES_DATE) {
    const brut = ligne[nom];
    if (!brut) continue;
    const d = new Date(String(brut).trim());
    if (!Number.isNaN(d.getTime())) return nom;
  }
  return undefined;
}

/**
 * Parcourt une source et retient les lignes correspondant aux fiches encore
 * manquantes. Le catalogue ManoMano est decoupe en flux d'environ un million
 * de produits chacun : sans arret anticipe, retrouver 118 references
 * imposerait de lire plusieurs millions de lignes a chaque synchronisation.
 */
async function parcourirSource(source, index, trouve) {
  const { stream, genereLe } = await fluxCsv(source.url);
  // relax_quotes + skip_records_with_error : un export marchand de 50k+ lignes
  // contient presque toujours quelques champs mal échappés (guillemet isolé
  // dans une description) — on ignore ces lignes-là plutôt que de faire
  // échouer toute la synchronisation pour une poignée de fiches.
  // max_record_size : un guillemet jamais refermé avale sinon tout le reste
  // du fichier dans un seul champ, jusqu'à dépasser la limite de taille de
  // chaîne de Node — 100 000 caractères est très large pour une fiche
  // produit légitime, donc ça borne la casse sans risquer de couper une
  // description normale.
  const parseur = stream.pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      relax_quotes: true,
      skip_records_with_error: true,
      max_record_size: 100_000,
    }),
  );
  let lignesIgnorees = 0;
  parseur.on('skip', () => { lignesIgnorees++; });

  let lignes = 0;
  let colonneDate;
  let retenues = 0;
  for await (const ligne of parseur) {
    lignes++;
    if (lignes === 1) {
      colonneDate = detecterColonneDate(ligne);
      console.log(
        colonneDate
          ? `  colonne de date par produit : ${colonneDate}`
          : '  pas de colonne de date par produit',
      );
    }
    const id = ligne.aw_product_id?.trim();
    const merchantId = ligne.merchant_product_id?.trim();
    if (!id && !merchantId) continue;
    // Priorite a aw_product_id : c'est l'annonce precise vers laquelle pointe
    // le lien affilie de la fiche. merchant_product_id ne sert qu'aux fiches
    // qui n'ont pas encore de lien tracke.
    const slug = (id && index.parAw.get(id)) || (merchantId && index.parMerchant.get(merchantId));
    if (!slug) continue;
    const dejaVu = trouve.get(slug);
    if (dejaVu?.viaAw && !(id && index.parAw.has(id))) continue;
    const prix = prixNumerique(ligne.search_price) ?? prixNumerique(ligne.store_price) ?? prixNumerique(ligne.display_price);
    if (prix === undefined) continue;
    // Datation, par ordre de precision : la ligne elle-meme, sinon la date
    // d'import du flux declaree par Awin.
    const dateLigne = colonneDate ? new Date(String(ligne[colonneDate]).trim()) : undefined;
    const entree = {
      prix,
      enStock: ligne.in_stock === '1',
      ean: ligne.ean?.trim() || ligne.product_GTIN?.trim() || undefined,
      // Les photos codées en dur dans data.ts pourrissent avec le temps
      // (ManoMano renomme/déplace ses fichiers CDN) sans jamais être
      // rafraîchies ailleurs : on capte l'image du flux au même titre que
      // le prix. merchant_image_url (CDN ManoMano direct) en priorité : vérifié
      // en direct plus fiable que aw_image_url, dont le cache Varnish reste
      // parfois bloqué sur un ancien fallback "noimage" un mois entier
      // (max-age=2678400) après la disparition du fichier source côté
      // ManoMano — pas rattrapable en re-synchronisant plus souvent.
      // aw_image_url reste en repli si le marchand ne fournit pas l'autre.
      image: ligne.merchant_image_url?.trim() || ligne.aw_image_url?.trim() || undefined,
      viaAw: Boolean(id && index.parAw.has(id)),
      dateDonnee: dateLigne && !Number.isNaN(dateLigne.getTime()) ? dateLigne : (source.importeLe ?? genereLe),
    };
    // Plusieurs annonces Awin peuvent exister pour un meme produit ManoMano
    // (marketplace : autant d'annonces que de vendeurs). A defaut de savoir
    // laquelle ManoMano met en avant, on retient la moins chere en stock,
    // qui est ce que la page produit affiche dans la grande majorite des cas.
    const remplace =
      !dejaVu ||
      (entree.viaAw && !dejaVu.viaAw) ||
      (entree.viaAw === dejaVu.viaAw && entree.enStock && !dejaVu.enStock) ||
      (entree.viaAw === dejaVu.viaAw && entree.enStock === dejaVu.enStock && entree.prix < dejaVu.prix);
    if (remplace) {
      if (!dejaVu) retenues++;
      trouve.set(slug, entree);
    }
  }
  if (lignes === 0) throw new Error(`Flux ${source.nom} vide — 0 ligne parsée.`);
  if (lignesIgnorees > 0) console.log(`  (${lignesIgnorees} ligne(s) mal échappée(s), ignorées)`);
  console.log(`  ${lignes} lignes lues, ${retenues} nouvelle(s) fiche(s) trouvée(s)`);
}

/**
 * Enchaine les flux du plus frais au plus ancien et s'arrete des que toutes
 * les fiches declarees ont ete retrouvees.
 */
async function chargerFlux(produits) {
  const decouverts = await fluxDisponibles();
  const sources = decouverts.length
    ? decouverts
    : [{ id: 'env', nom: 'AWIN_FEED_URL', url: feedUrl, importeLe: undefined }];
  if (!sources[0].url) {
    console.error('\n✖ Aucune source : ni AWIN_DATAFEED_API_KEY exploitable, ni AWIN_FEED_URL.\n');
    process.exit(1);
  }

  const index = { parAw: new Map(), parMerchant: new Map() };
  for (const p of produits) {
    if (p.awProductId) index.parAw.set(p.awProductId, p.slug);
    if (p.modelId) index.parMerchant.set(p.modelId, p.slug);
  }

  const trouve = new Map();
  for (const source of sources) {
    if (trouve.size >= produits.length) break;
    const age = source.importeLe ? `importé il y a ${Math.round((Date.now() - source.importeLe) / 3_600_000)} h` : 'date inconnue';
    console.log(`\n▸ ${source.nom} (${source.id}) — ${age}`);
    try {
      await parcourirSource(source, index, trouve);
    } catch (e) {
      console.log(`  ⚠ flux ignoré : ${e.message}`);
    }
    console.log(`  → ${trouve.size}/${produits.length} fiches couvertes`);
  }
  return trouve;
}

function produitsDeclares() {
  const src = readFileSync(new URL('../src/lib/data.ts', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const tableau = src.match(/export const produits: Produit\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? '';
  const blocs = tableau.split(/\n  \{\n/).slice(1);

  return blocs.map((b) => {
    const slug = b.match(/slug:\s*'([^']+)'/)?.[1];
    const urlMarchand = b.match(/urlMarchand:\s*'([^']+)'/)?.[1];
    const nom = b.match(/nom:\s*'([^']+)'/)?.[1] ?? '?';
    const awProductId = urlMarchand?.match(/[?&]p=(\d+)/)?.[1];
    const modelId = urlMarchand?.match(/[?&]model_id=(\d+)/)?.[1];
    return { slug, nom, awProductId, modelId };
  }).filter((p) => p.slug && (p.awProductId || p.modelId));
}

const produits = produitsDeclares();
const trouve = await chargerFlux(produits);

const synchronise = {};
const nonTrouves = produits.filter((p) => !trouve.has(p.slug)).map((p) => p.nom);
const maintenant = new Date();

/**
 * Dernier repli, quand aucune source ne date la donnee : la seule preuve
 * qu'Awin a regenere son export est que son contenu ait bouge.
 *
 * Regle : si les valeurs metier de toutes les fiches sont identiques a la
 * synchronisation precedente, on conserve les `syncedAt` d'origine. Les
 * fiches vieillissent alors normalement et repassent en fourchette apres
 * 72 h, ce qui est le comportement correct — on ne peut pas prouver qu'un
 * prix est frais quand rien ne distingue un flux vivant d'un flux fige.
 * Effet de bord voulu : le fichier reste alors byte-identique, donc le
 * workflow ne commit rien et ne redeploie pas.
 *
 * A l'inverse, un seul changement suffit a prouver que le flux est vivant :
 * toutes les fiches sont alors rehorodatees a maintenant.
 */
function snapshotPrecedent() {
  try {
    return JSON.parse(readFileSync(new URL('../src/data/prix-synchronises.json', import.meta.url), 'utf8'));
  } catch {
    return {};
  }
}

function valeursMetier({ prix, enStock, ean, image }) {
  return JSON.stringify({ prix, enStock, ean, image });
}

const precedent = snapshotPrecedent();

for (const [slug, { prix, enStock, ean, image }] of trouve) {
  synchronise[slug] = { prix, enStock, ean, image };
}

const inchange =
  Object.keys(synchronise).length === Object.keys(precedent).length &&
  Object.entries(synchronise).every(
    ([slug, e]) => precedent[slug] && valeursMetier(precedent[slug]) === valeursMetier(e),
  );

let dates = 0;
for (const [slug, entree] of Object.entries(synchronise)) {
  // Priorite : la date que la source attache a la donnee ; sinon le
  // `syncedAt` d'origine tant que le contenu n'a pas bouge ; sinon l'heure
  // du run, qui ne vaut que parce que le contenu vient de changer.
  const dateSource = trouve.get(slug).dateDonnee;
  const datee = dateSource && dateSource <= maintenant;
  if (datee) dates++;
  const syncedAt = datee
    ? dateSource.toISOString()
    : inchange && precedent[slug]?.syncedAt
      ? precedent[slug].syncedAt
      : maintenant.toISOString();
  synchronise[slug] = { ...entree, syncedAt };
}

const ages = Object.values(synchronise).map((e) => (maintenant - new Date(e.syncedAt)) / 3_600_000);
const ageMax = ages.length ? Math.max(...ages) : 0;
const perimees = ages.filter((h) => h >= 72).length;

console.log('');
if (dates === ages.length && dates > 0) {
  console.log(`Toutes les fiches sont datées à la source, la plus ancienne remonte à ${Math.round(ageMax)} h.`);
} else if (dates > 0) {
  console.log(`${dates}/${ages.length} fiches datées à la source, les autres par comparaison.`);
} else if (!inchange) {
  console.log(
    'Aucune source datée, mais le contenu du flux a changé depuis la dernière\n' +
      'synchronisation : les prix sont donc bien rafraîchis, horodatage à maintenant.',
  );
} else {
  console.log(
    `⚠ Aucune source datée et contenu identique depuis ${Math.round(ageMax)} h : rien ne prouve\n` +
      "  qu'Awin ait regénéré son export. Les `syncedAt` d'origine sont conservés,\n" +
      '  ce fichier est inchangé et le workflow ne redéploiera pas.',
  );
}
if (perimees) {
  console.log(
    `\n⚠ ${perimees} fiche(s) au-delà de 72 h : le site les affiche en fourchette et\n` +
      "  n'émet pas d'`offers` pour elles. Vérifier côté Awin que l'annonceur\n" +
      '  alimente toujours les flux auxquels ce compte a accès.',
  );
}

writeFileSync(
  new URL('../src/data/prix-synchronises.json', import.meta.url),
  JSON.stringify(synchronise, null, 2) + '\n',
);

console.log(`\n${Object.keys(synchronise).length}/${produits.length} fiches synchronisées avec le flux Awin.\n`);
if (nonTrouves.length) {
  console.log('Non trouvées dans le flux (restent sur la fourchette) :');
  for (const n of nonTrouves) console.log(`  · ${n}`);
  console.log('');
}
