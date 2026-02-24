import { e as createComponent, f as createAstro, r as renderTemplate, l as renderSlot, n as renderHead, u as unescapeHTML, h as addAttribute } from './astro/server_DSjKF99p.mjs';
import 'piccolore';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Trouve le meilleur produit sans perdre de temps \u2014 comparatifs honn\xEAtes, verdict clair.",
    ogImage = "/og-default.png",
    canonicalPath
  } = Astro2.props;
  const siteUrl = "https://trouve-tout.fr";
  const canonical = canonicalPath ? `${siteUrl}${canonicalPath}` : `${siteUrl}${Astro2.url.pathname}`;
  const fullTitle = `${title} \u2014 Trouve-Tout`;
  return renderTemplate(_a || (_a = __template(['<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- SEO --><title>', '</title><meta name="description"', '><link rel="canonical"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:site_name" content="Trouve-Tout"><meta property="og:locale" content="fr_FR"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Schema.org WebSite --><script type="application/ld+json">', "<\/script>", '</head> <body class="bg-gray-50 text-gray-900 min-h-screen"> <nav class="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-6 text-sm font-medium"> <a href="/" class="text-lg font-bold text-indigo-600">Trouve-Tout</a> <a href="/categories" class="hover:text-indigo-600">Cat\xE9gories</a> <a href="/choix-express" class="hover:text-indigo-600">Choix Express</a> <a href="/cadeau" class="hover:text-indigo-600">Mode Cadeau</a> <a href="/blog" class="hover:text-indigo-600">Guides</a> <a href="/profil" class="ml-auto hover:text-indigo-600">Mon profil</a> </nav> <main> ', ' </main> <footer class="mt-16 border-t border-gray-200 py-8 px-4"> <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-400"> <div>\xA9 ', ' Trouve-Tout \xB7 Comparatif produits ind\xE9pendant</div> <div class="flex gap-4"> <a href="/categories" class="hover:text-gray-600">Cat\xE9gories</a> <a href="/blog" class="hover:text-gray-600">Guides</a> <a href="/sitemap.xml" class="hover:text-gray-600">Sitemap</a> </div> <div>Ce site contient des liens affili\xE9s Amazon. Votre prix ne change pas.</div> </div> </footer> </body></html>'])), fullTitle, addAttribute(description, "content"), addAttribute(canonical, "href"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(canonical, "content"), addAttribute(`${siteUrl}${ogImage}`, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(`${siteUrl}${ogImage}`, "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Trouve-Tout",
    url: siteUrl,
    description: "Comparatif produits honn\xEAte \u2014 verdict clair en 30 secondes."
  })), renderHead(), renderSlot($$result, $$slots["default"]), (/* @__PURE__ */ new Date()).getFullYear());
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
