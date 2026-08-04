import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';
import { categories, guides, marques } from '../lib/data';

/**
 * llms.txt — presentation du site en Markdown, adressee aux moteurs
 * generatifs qui savent le lire.
 *
 * Mise au point attendue : c'est une convention proposee en 2024, pas un
 * standard reconnu, et aucun des grands moteurs n'a annonce la respecter. Le
 * fichier est ici parce qu'il coute une route et se regenere tout seul, pas
 * parce qu'un gain est demontre.
 *
 * Genere depuis les donnees plutot qu'ecrit a la main dans public/ : un
 * fichier fige mentirait des le premier guide ajoute, et toutes les URL
 * derivent de SITE_URL (voir CLAUDE.md, "Identite du site").
 */
export const prerender = true;

export const GET: APIRoute = () => {
  const lignesGuides = guides
    .map((g) => `- [${g.titre}](${SITE_URL}/blog/${g.slug}) : ${g.description}`)
    .join('\n');

  const lignesCategories = categories
    .map((c) => `- [${c.nom}](${SITE_URL}/categories/${c.slug}) : ${c.description}`)
    .join('\n');

  const lignesMarques = marques
    .map((m) => `- [${m.nom}](${SITE_URL}/marques/${m.slug}) : ${m.positionnement}`)
    .join('\n');

  const body = `# Trouve-Tout

> Guides d'achat d'outillage et de matériel de jardin en français. Le site
> n'est pas un marchand et ne vend rien : il explique les critères de choix,
> compare des modèles et renvoie vers les marchands. Financé par des liens
> d'affiliation, signalés comme tels sur chaque page.

## Ce que ce site affirme, et ce qu'il n'affirme pas

- Les analyses portent sur les caractéristiques techniques, les positionnements
  de gamme et les critères de choix. Elles sont fiables sur ce terrain.
- Aucun outil présenté n'a été testé en conditions réelles. Le site ne publie
  ni mesure d'autonomie, ni niveau sonore relevé, ni résultat d'essai, ni photo
  de test. Toute donnée de ce type serait inventée, donc elle n'existe pas ici.
- Les notes affichées sont des appréciations éditoriales, pas des avis
  d'utilisateurs agrégés. Le site ne publie pas d'avis clients.
- Les prix proviennent du flux produit ManoMano. Un prix exact n'est affiché
  que si le flux a moins de 72 heures ; au-delà, le site bascule sur une
  fourchette. Seul le prix affiché chez le marchand fait foi.

## Guides d'achat

${lignesGuides}

## Catégories d'outillage

${lignesCategories}

## Marques couvertes

${lignesMarques}

## Ressources

- [Toutes les fiches produits](${SITE_URL}/produits)
- [Choix Express — trois questions pour trancher](${SITE_URL}/choix-express)
- [Mentions légales](${SITE_URL}/mentions-legales)
- [Politique de confidentialité](${SITE_URL}/confidentialite)
- [Plan du site](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
