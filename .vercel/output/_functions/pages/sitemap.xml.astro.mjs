import { f as categories, m as marques, p as produits, b as guides } from '../chunks/data__-lBQRlo.mjs';
export { renderers } from '../renderers.mjs';

const siteUrl = "https://trouve-tout.fr";
function url(path, priority, changefreq) {
  return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
const GET = () => {
  const staticPages = [
    url("/", "1.0", "weekly"),
    url("/categories", "0.9", "weekly"),
    url("/choix-express", "0.8", "monthly"),
    url("/cadeau", "0.8", "monthly"),
    url("/blog", "0.7", "weekly")
  ];
  const catPages = categories.map((c) => url(`/categories/${c.slug}`, "0.8", "weekly"));
  const marquePages = marques.map((m) => url(`/marques/${m.slug}`, "0.7", "weekly"));
  const produitPages = produits.map((p) => url(`/produits/${p.slug}`, "0.6", "monthly"));
  const guidePages = guides.map((g) => url(`/blog/${g.slug}`, "0.7", "monthly"));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...catPages, ...marquePages, ...produitPages, ...guidePages].join("")}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
