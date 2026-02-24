/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, h as addAttribute, u as unescapeHTML, m as maybeRenderHead } from '../../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BtsDOg2Y.mjs';
import { g as getGuideBySlug, a as getCategorieBySlug } from '../../chunks/data__-lBQRlo.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const guide = getGuideBySlug(slug);
  if (!guide) return Astro2.redirect("/blog");
  const categorie = getCategorieBySlug(guide.categorieSlug);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.titre,
    description: guide.description,
    author: { "@type": "Organization", name: "Trouve-Tout" },
    publisher: { "@type": "Organization", name: "Trouve-Tout" }
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": guide.titre, "description": guide.description }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", '<div class="max-w-3xl mx-auto px-4 pt-6 text-sm text-gray-500"> <a href="/" class="hover:text-indigo-600">Accueil</a> \u203A\n<a href="/blog" class="hover:text-indigo-600 mx-1">Guides</a> \u203A\n<span class="text-gray-800 font-medium">', '</span> </div> <article class="max-w-3xl mx-auto px-4 py-8"> <div class="text-sm text-indigo-600 font-medium mb-2"> ', " ", ' </div> <h1 class="text-3xl font-bold mb-4">', '</h1> <p class="text-lg text-gray-600 mb-8 border-l-4 border-indigo-200 pl-4">', '</p> <div class="space-y-8"> ', ' </div> <div class="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center"> <p class="font-semibold text-indigo-800 mb-3">Pr\xEAt \xE0 choisir ?</p> <div class="flex flex-col sm:flex-row gap-3 justify-center"> <a href="/choix-express" class="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition text-sm">\n\u26A1 Choix Express\n</a> <a', ' class="bg-white border border-indigo-200 text-indigo-700 px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-50 transition text-sm">\nVoir les comparatifs ', " </a> </div> </div> </article> "])), unescapeHTML(schema), maybeRenderHead(), guide.titre, categorie?.emoji, categorie?.nom, guide.titre, guide.intro, guide.sections.map((s) => renderTemplate`<section> <h2 class="text-xl font-bold mb-3">${s.titre}</h2> <p class="text-gray-700 leading-relaxed">${unescapeHTML(s.contenu.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"))}</p> </section>`), addAttribute(`/categories/${guide.categorieSlug}`, "href"), categorie?.nom) })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
