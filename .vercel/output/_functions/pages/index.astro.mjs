/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BtsDOg2Y.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accueil", "description": "Trouve le meilleur produit sans perdre de temps \u2014 comparatifs honn\xEAtes, verdict clair." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-3xl mx-auto px-4 py-16 text-center"> <h1 class="text-4xl font-bold mb-4">Trouve le bon produit, vite.</h1> <p class="text-lg text-gray-600 mb-8">
Comparatifs honnêtes, verdict clair. Pas de publicité déguisée.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/choix-express" class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
⚡ Choix Express (sans compte)
</a> <a href="/cadeau" class="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
🎁 Mode Cadeau
</a> <a href="/categories" class="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
Voir les catégories
</a> </div> </section> <section class="max-w-4xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"> <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"> <div class="text-3xl mb-2">📱</div> <h2 class="font-semibold mb-1">High-Tech</h2> <a href="/categories/high-tech" class="text-sm text-indigo-600 hover:underline">Voir les produits →</a> </div> <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"> <div class="text-3xl mb-2">🏠</div> <h2 class="font-semibold mb-1">Maison</h2> <a href="/categories/maison" class="text-sm text-indigo-600 hover:underline">Voir les produits →</a> </div> <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"> <div class="text-3xl mb-2">🍳</div> <h2 class="font-semibold mb-1">Cuisine</h2> <a href="/categories/cuisine" class="text-sm text-indigo-600 hover:underline">Voir les produits →</a> </div> </section> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
