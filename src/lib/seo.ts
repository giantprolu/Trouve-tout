/**
 * Fabrication des <title> et <meta description> des pages generees en masse
 * (119 fiches produits, 8 marques). Les pages redigees a la main portent
 * leurs propres `titreSeo`/`metaDescription` dans data.ts — ce module ne
 * sert que la ou la saisie manuelle n'est pas tenable.
 *
 * Budget : Layout ajoute " — Trouve-Tout" (14 caracteres) a tout titre, donc
 * un titre doit tenir en 46 caracteres pour rester sous les ~60 affiches par
 * Google. Les meta descriptions sont bornees a 155.
 */
import type { Produit, Marque } from './data';

export const TITRE_MAX = 46;
export const META_MAX = 155;

/** Mots qui n'ont aucun sens en fin de titre tronque ("Perceuse a", "Pack de"). */
const MOTS_SUSPENDUS = new Set([
  'a', 'à', 'de', 'du', 'des', 'en', 'et', 'ou', 'le', 'la', 'les', 'un', 'une',
  'pour', 'avec', 'sans', 'par', 'sur', 'au', 'aux', 'd', 'l', '+', '-', '—', ':',
]);

/**
 * Coupe sur une frontiere de mot plutot qu'en plein milieu, puis retire les
 * mots-outils orphelins que la coupe laisse pendre. Pas d'ellipse ajoutee :
 * les trois points consommeraient trois caracteres du budget pour une
 * information nulle, et Google en ajoute deja une s'il tronque lui-meme.
 */
export function tronquerAuMot(texte: string, max: number): string {
  const propre = texte.trim().replace(/\s+/g, ' ');
  if (propre.length <= max) return propre;

  const mots = propre.slice(0, max + 1).split(' ');
  mots.pop(); // le dernier mot est coupe par la tranche, on l'abandonne
  while (mots.length > 1 && MOTS_SUSPENDUS.has(mots[mots.length - 1].toLowerCase())) {
    mots.pop();
  }
  return mots.join(' ').replace(/[,;:—–-]+$/, '').trim();
}

/**
 * Les noms de fiches sont des donnees marchand, pas du texte editorial : on
 * ne les reecrit pas, on retire seulement ce qui est deja affiche ailleurs
 * sur la page (conditionnement, nombre de batteries, mentions d'annonce)
 * avant de couper. Le type d'outil — le mot-cle — se trouve toujours dans
 * les trois premiers mots, donc il survit a la troncature.
 */
const SUFFIXE_AVIS = ' — Avis et comparatif';

export function titreSeoProduit(produit: Pick<Produit, 'nom'>): string {
  const nom = produit.nom.trim();
  // Un nom assez court laisse la place a un suffixe qui capte les requetes "avis".
  if (nom.length + SUFFIXE_AVIS.length <= TITRE_MAX) return `${nom}${SUFFIXE_AVIS}`;
  if (nom.length <= TITRE_MAX) return nom;

  const sansParentheses = nom.replace(/\s*\([^)]*\)/g, '').trim();
  if (sansParentheses.length <= TITRE_MAX) return sansParentheses;

  return tronquerAuMot(sansParentheses, TITRE_MAX);
}

/** `Outillage <Marque>` place le mot-cle en tete et reste court quelle que soit la marque. */
export function titreSeoMarque(marque: Pick<Marque, 'nom'>): string {
  return tronquerAuMot(`Outillage ${marque.nom} : gammes et avis`, TITRE_MAX);
}

/**
 * Assemble une meta description sous les 155 caracteres : le texte editorial
 * existant fournit le benefice concret, l'appel a l'action est ajoute a la
 * fin s'il reste de la place. Aucune donnee inventee, aucun prix (il change
 * entre deux crawls et Google sanctionne le decalage).
 */
function composerMeta(corps: string, cta: string): string {
  // -2 : l'espace qui separe le corps du CTA, plus le point que `ponctue`
  // ajoute quand la troncature ne tombe pas sur une fin de phrase. Sans cette
  // marge le total deborde d'un caractere et le CTA finit ampute.
  const budget = META_MAX - cta.length - 2;
  const debut = tronquerAuMot(corps.replace(/\s*[—–-]\s*$/, ''), budget);
  const ponctue = /[.!?]$/.test(debut) ? debut : `${debut}.`;
  return `${ponctue} ${cta}`;
}

export function metaProduit(produit: Pick<Produit, 'nom' | 'description' | 'pourQui'>): string {
  const corps = produit.pourQui?.trim()
    ? `${produit.description} ${produit.pourQui}`
    : produit.description;
  return composerMeta(corps, 'Lisez notre avis complet.');
}

export function metaMarque(marque: Pick<Marque, 'description' | 'positionnement'>): string {
  const corps = `${marque.positionnement}. ${marque.description}`;
  return composerMeta(corps, 'Découvrez nos recommandations.');
}
