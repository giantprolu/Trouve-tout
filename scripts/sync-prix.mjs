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
 * Matching : chaque `urlMarchand` de src/lib/data.ts est une URL Awin
 * pré-trackée (`?p=<aw_product_id>&...`) — ce `p` est directement la colonne
 * `aw_product_id` du flux, donc aucun identifiant supplémentaire à saisir.
 */
import { readFileSync, writeFileSync, createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { parse } from 'csv-parse';

const feedUrl = process.env.AWIN_FEED_URL;
if (!feedUrl) {
  console.error('\n✖ AWIN_FEED_URL absent — impossible de récupérer le flux Awin.\n');
  process.exit(1);
}

async function fluxBrut(source) {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    const res = await fetch(source);
    if (!res.ok || !res.body) throw new Error(`Flux Awin injoignable (HTTP ${res.status})`);
    return Readable.fromWeb(res.body);
  }
  return createReadStream(source);
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
  const brut = await fluxBrut(source);
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
  return gzip ? flux.pipe(createGunzip()) : flux;
}

function prixNumerique(brut) {
  if (!brut) return undefined;
  const n = Number.parseFloat(String(brut).replace(/^[A-Z]{3}/, ''));
  return Number.isFinite(n) ? n : undefined;
}

async function chargerFlux() {
  const stream = await fluxCsv(feedUrl);
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
  let lignes = 0;
  for await (const ligne of parseur) {
    lignes++;
    const id = ligne.aw_product_id?.trim();
    if (!id) continue;
    const prix = prixNumerique(ligne.search_price) ?? prixNumerique(ligne.store_price) ?? prixNumerique(ligne.display_price);
    if (prix === undefined) continue;
    parFluxId.set(id, {
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
    });
  }
  if (lignes === 0) throw new Error('Flux Awin vide — 0 ligne parsée.');
  if (lignesIgnorees > 0) console.log(`(${lignesIgnorees} ligne(s) du flux ignorée(s) — mal échappées)`);
  return parFluxId;
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
    return { slug, nom, awProductId };
  }).filter((p) => p.slug && p.awProductId);
}

const parFluxId = await chargerFlux();
const produits = produitsDeclares();

const synchronise = {};
const nonTrouves = [];
const syncedAt = new Date().toISOString();

for (const { slug, nom, awProductId } of produits) {
  const entree = parFluxId.get(awProductId);
  if (!entree) {
    nonTrouves.push(nom);
    continue;
  }
  synchronise[slug] = { ...entree, syncedAt };
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
