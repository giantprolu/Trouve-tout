/**
 * Synchronise src/data/prix-synchronises.json avec le flux produit Awin/ManoMano.
 *
 * Source du flux : AWIN_FEED_URL — l'URL "Create-a-Feed" Awin filtrée sur
 * l'annonceur ManoMano FR (17547). Accepte aussi un chemin de fichier local
 * (utile pour tester avec un CSV déjà téléchargé, sans toucher au réseau).
 *
 *   AWIN_FEED_URL=https://productdata.awin.com/... node scripts/sync-prix.mjs
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
if (!feedUrl) {
  console.error('\n✖ AWIN_FEED_URL absent — impossible de récupérer le flux Awin.\n');
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

async function chargerFlux() {
  const { stream, genereLe } = await fluxCsv(feedUrl);
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

  const parFluxId = new Map();
  const parMerchantId = new Map();
  let lignes = 0;
  let colonneDate;
  let dateFlux;
  for await (const ligne of parseur) {
    lignes++;
    if (lignes === 1) {
      colonneDate = detecterColonneDate(ligne);
      console.log(
        colonneDate
          ? `Colonne de date détectée dans le flux : ${colonneDate}.`
          : `Aucune colonne de date exploitable dans le flux (colonnes : ${Object.keys(ligne).join(', ')}).`,
      );
    }
    if (colonneDate) {
      // La date de generation du flux, c'est celle de sa donnee la plus
      // recente : un produit peut tres bien n'avoir pas bouge depuis des mois.
      const d = new Date(String(ligne[colonneDate]).trim());
      if (!Number.isNaN(d.getTime()) && (!dateFlux || d > dateFlux)) dateFlux = d;
    }
    const id = ligne.aw_product_id?.trim();
    const merchantId = ligne.merchant_product_id?.trim();
    if (!id && !merchantId) continue;
    const prix = prixNumerique(ligne.search_price) ?? prixNumerique(ligne.store_price) ?? prixNumerique(ligne.display_price);
    if (prix === undefined) continue;
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
    };
    if (id) parFluxId.set(id, entree);
    // merchant_product_id peut apparaître sur plusieurs lignes (plusieurs
    // annonces Awin en doublon pour le même produit ManoMano) : on garde la
    // première rencontrée, sans tenter d'arbitrer entre doublons quasi
    // identiques (prix généralement le même à quelques centimes près).
    if (merchantId && !parMerchantId.has(merchantId)) parMerchantId.set(merchantId, entree);
  }
  if (lignes === 0) throw new Error('Flux Awin vide — 0 ligne parsée.');
  if (lignesIgnorees > 0) console.log(`(${lignesIgnorees} ligne(s) du flux ignorée(s) — mal échappées)`);
  return { parFluxId, parMerchantId, genereLe: genereLe ?? dateFlux };
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

const { parFluxId, parMerchantId, genereLe } = await chargerFlux();
const produits = produitsDeclares();

const synchronise = {};
const nonTrouves = [];
const maintenant = new Date();

/**
 * Repli n°3, celui qui sert reellement sur ce flux : ni en-tete HTTP ni
 * colonne de date, donc la seule preuve qu'Awin a regenere son export est
 * que son contenu ait bouge.
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
const dateFluxConnue = genereLe && genereLe <= maintenant ? genereLe : undefined;

for (const { slug, nom, awProductId, modelId } of produits) {
  const entree = (awProductId && parFluxId.get(awProductId)) || (modelId && parMerchantId.get(modelId));
  if (!entree) {
    nonTrouves.push(nom);
    continue;
  }
  synchronise[slug] = entree;
}

const inchange =
  Object.keys(synchronise).length === Object.keys(precedent).length &&
  Object.entries(synchronise).every(
    ([slug, e]) => precedent[slug] && valeursMetier(precedent[slug]) === valeursMetier(e),
  );

for (const [slug, entree] of Object.entries(synchronise)) {
  // Priorite : date du flux si Awin la fournit ; sinon `syncedAt` d'origine
  // tant que le contenu n'a pas bouge ; sinon l'heure du run.
  const syncedAt = dateFluxConnue
    ? dateFluxConnue.toISOString()
    : inchange && precedent[slug]?.syncedAt
      ? precedent[slug].syncedAt
      : maintenant.toISOString();
  synchronise[slug] = { ...entree, syncedAt };
}

const reference = new Date(Object.values(synchronise)[0]?.syncedAt ?? maintenant);
const ageHeures = (maintenant - reference) / 3_600_000;

if (dateFluxConnue) {
  console.log(`\nFlux Awin daté à la source, généré il y a ${Math.round(ageHeures)} h.`);
} else if (!inchange) {
  console.log(
    '\nLe contenu du flux a changé depuis la dernière synchronisation : les prix\n' +
      'sont donc bien rafraîchis, horodatage à maintenant.',
  );
} else {
  console.log(
    `\n⚠ Flux non daté et contenu identique depuis ${Math.round(ageHeures)} h : rien ne prouve\n` +
      "  qu'Awin l'ait regénéré. Les `syncedAt` d'origine sont conservés, donc les\n" +
      '  fiches repasseront en fourchette au-delà de 72 h. Ce fichier est inchangé,\n' +
      '  le workflow ne redéploiera pas.',
  );
}
if (ageHeures >= 72) {
  console.log(
    '\n⚠ Les prix ont dépassé 72 h : le site affiche désormais des fourchettes.\n' +
      "  Vérifier la configuration Create-a-Feed côté Awin.",
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
