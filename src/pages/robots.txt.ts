import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

// Genere depuis SITE_URL plutot qu'ecrit en dur dans public/ : c'est exactement
// l'erreur qui a longtemps empeche l'indexation du site (domaine incorrect).
export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
