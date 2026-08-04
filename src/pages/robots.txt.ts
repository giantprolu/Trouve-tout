import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

// Genere depuis SITE_URL plutot qu'ecrit en dur dans public/ : c'est exactement
// l'erreur qui a longtemps empeche l'indexation du site (domaine incorrect).
export const prerender = true;

// `User-agent: *` autorise deja ces robots : les lister n'ouvre aucun acces
// nouveau. L'interet est ailleurs — rendre l'autorisation explicite, pour
// qu'un durcissement futur de la regle generique ne les exclue pas par
// inadvertance, et pour que l'intention soit lisible par un humain qui
// reprend le fichier. Aucun gain de trafic a en attendre en soi.
const ROBOTS_IA = [
  'GPTBot', // OpenAI — entrainement
  'OAI-SearchBot', // OpenAI — citations dans ChatGPT Search
  'ChatGPT-User', // OpenAI — navigation declenchee par un utilisateur
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended', // Gemini / Vertex, distinct de Googlebot
  'Applebot-Extended',
  'CCBot', // Common Crawl, source de la plupart des corpus
];

export const GET: APIRoute = () => {
  const blocsIa = ROBOTS_IA.map((bot) => `User-agent: ${bot}\nAllow: /\n`).join('\n');
  const body =
    `User-agent: *\nAllow: /\n\n${blocsIa}\n` +
    `Sitemap: ${SITE_URL}/sitemap.xml\n` +
    `# Presentation du site a destination des moteurs generatifs : ${SITE_URL}/llms.txt\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
