import type { APIRoute } from 'astro';
import { categories, marques, produits, guides } from '../lib/data';
import { SITE_URL } from '../lib/site';

export const prerender = false;

const siteUrl = SITE_URL;

function url(path: string, priority: string, changefreq: string): string {
  return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = () => {
  const staticPages = [
    url('/', '1.0', 'weekly'),
    url('/categories', '0.9', 'weekly'),
    url('/marques', '0.7', 'weekly'),
    url('/produits', '0.6', 'weekly'),
    url('/choix-express', '0.8', 'monthly'),
    url('/blog', '0.7', 'weekly'),
    url('/mentions-legales', '0.2', 'yearly'),
    url('/confidentialite', '0.2', 'yearly'),
  ];

  // Une fiche produit n'est indexable que lorsqu'elle pointe vers une vraie
  // page marchand relue (verifie: true) — voir la règle d'honnêteté du
  // contenu dans CLAUDE.md. Tant que ce n'est pas le cas, la page existe
  // (accessible en direct) mais ne doit pas être poussée à Google.
  const produitsVerifies = produits.filter(p => p.verifie);
  const categoriesAvecProduitVerifie = new Set(produitsVerifies.map(p => p.categorieSlug));
  const marquesAvecProduitVerifie = new Set(produitsVerifies.map(p => p.marqueSlug));

  const catPages = categories
    .filter(c => categoriesAvecProduitVerifie.has(c.slug))
    .map(c => url(`/categories/${c.slug}`, '0.8', 'weekly'));
  const marquePages = marques
    .filter(m => marquesAvecProduitVerifie.has(m.slug))
    .map(m => url(`/marques/${m.slug}`, '0.7', 'weekly'));
  const produitPages = produitsVerifies.map(p => url(`/produits/${p.slug}`, '0.6', 'monthly'));
  const guidePages = guides.map(g => url(`/blog/${g.slug}`, '0.7', 'monthly'));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...catPages, ...marquePages, ...produitPages, ...guidePages].join('')}
</urlset>`;

  return new Response(xml, {
    // Rendu serveur volontaire (voir CLAUDE.md), mais le contenu ne bouge
    // qu'au déploiement : ce cache évite de reconstruire le XML à chaque
    // passage de crawler sans jamais servir une version périmée plus d'1h.
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
