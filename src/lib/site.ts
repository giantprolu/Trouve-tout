/**
 * Source unique de vérité pour l'URL du site.
 * Doit correspondre EXACTEMENT au domaine servi en production
 * (et à `site` dans astro.config.mjs).
 *
 * Ne jamais mettre ici un domaine qu'on ne possède pas :
 * les balises canonical pointeraient ailleurs et Google
 * n'indexerait aucune page.
 */
export const SITE_URL = 'https://www.trouve-tout-conseil.fr';

/** Construit une URL absolue à partir d'un chemin racine ("/blog", "/og.png"...). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
