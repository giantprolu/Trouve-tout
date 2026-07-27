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
    url('/choix-express', '0.8', 'monthly'),
    url('/cadeau', '0.8', 'monthly'),
    url('/blog', '0.7', 'weekly'),
  ];

  const catPages = categories.map(c => url(`/categories/${c.slug}`, '0.8', 'weekly'));
  const marquePages = marques.map(m => url(`/marques/${m.slug}`, '0.7', 'weekly'));
  const produitPages = produits.map(p => url(`/produits/${p.slug}`, '0.6', 'monthly'));
  const guidePages = guides.map(g => url(`/blog/${g.slug}`, '0.7', 'monthly'));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...catPages, ...marquePages, ...produitPages, ...guidePages].join('')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
