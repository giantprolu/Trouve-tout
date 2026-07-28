/**
 * Liste les fiches produits dont l'URL marchand est encore generique.
 * Tant qu'une fiche est `verifie: false`, elle envoie le visiteur sur une page
 * de recherche : la conversion s'effondre.
 *
 *   npm run check:produits
 */
import { readFileSync } from 'node:fs';

// Normalise les fins de ligne : le depot est en CRLF sous Windows, et la regex
// de decoupage ci-dessous doit matcher quel que soit l'OS qui a ecrit le fichier.
const src = readFileSync(new URL('../src/lib/data.ts', import.meta.url), 'utf8').replace(/\r\n/g, '\n');

// On isole le tableau `produits` avant de decouper : sans ca, le commentaire
// juste au-dessus (qui mentionne "urlMarchand" et "verifie: false" en toutes
// lettres) se fait passer pour une fiche produit et fausse le compte.
const tableauProduits = src.match(/export const produits: Produit\[\] = \[([\s\S]*?)\n\];/)?.[1] ?? '';

const blocs = tableauProduits.split(/\n  \{\n/).slice(1);
const aFaire = [];
let total = 0;

for (const b of blocs) {
  if (!b.includes('urlMarchand')) continue;
  total++;
  const nom = b.match(/nom:\s*'([^']+)'/)?.[1] ?? '?';
  if (/verifie:\s*false/.test(b)) aFaire.push(nom);
}

console.log(`\n${total - aFaire.length}/${total} fiches verifiees.\n`);
if (aFaire.length) {
  console.log('URL marchand encore generique :');
  for (const n of aFaire) console.log(`  · ${n}`);
  console.log(
    '\n→ Ouvre la fiche sur manomano.fr, colle son URL dans urlMarchand, passe verifie a true.\n',
  );
  process.exitCode = 1;
} else {
  console.log('Toutes les fiches pointent vers une URL produit reelle.\n');
}
