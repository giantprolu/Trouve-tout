/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BtsDOg2Y.mjs';
import { b as guides, a as getCategorieBySlug } from '../chunks/data__-lBQRlo.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Guides d'achat", "description": "Guides honn\xEAtes pour choisir le bon produit rapidement." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-2">Guides d'achat</h1> <p class="text-gray-500 mb-8">Des articles clairs pour vous aider à décider vite et bien.</p> <div class="space-y-4"> ${guides.map((g) => {
    const cat = getCategorieBySlug(g.categorieSlug);
    return renderTemplate`<a${addAttribute(`/blog/${g.slug}`, "href")} class="flex gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group"> <div class="text-3xl flex-shrink-0">${cat?.emoji}</div> <div> <div class="text-xs text-indigo-600 font-semibold mb-1">${cat?.nom}</div> <h2 class="font-semibold group-hover:text-indigo-600">${g.titre}</h2> <p class="text-sm text-gray-500 mt-1">${g.description}</p> </div> </a>`;
  })} </div> </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
