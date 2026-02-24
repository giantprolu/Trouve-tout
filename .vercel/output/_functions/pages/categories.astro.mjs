/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BtsDOg2Y.mjs';
import { f as categories } from '../chunks/data__-lBQRlo.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cat\xE9gories", "description": "Toutes les cat\xE9gories de produits compar\xE9s sur Trouve-Tout." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-8">Toutes les catégories</h1> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/categories/${cat.slug}`, "href")} class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition group"> <div class="text-4xl mb-3">${cat.emoji}</div> <h2 class="font-semibold text-lg mb-1 group-hover:text-indigo-600">${cat.nom}</h2> <p class="text-sm text-gray-500">${cat.description}</p> </a>`)} </div> </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/categories/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/categories/index.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
