/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BtsDOg2Y.mjs';
import { $ as $$TableauComparatif } from '../../chunks/TableauComparatif_eGun1oIM.mjs';
import { $ as $$CTAAmazon } from '../../chunks/CTAAmazon_ynKfdXMo.mjs';
import { j as getProduitBySlug, i as getMarqueBySlug, a as getCategorieBySlug, e as getProduitsByMarque } from '../../chunks/data__-lBQRlo.mjs';
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
  const produit = getProduitBySlug(slug);
  if (!produit) return Astro2.redirect("/categories");
  const marque = getMarqueBySlug(produit.marqueSlug);
  const categorie = getCategorieBySlug(produit.categorieSlug);
  const autresDuMarque = getProduitsByMarque(produit.marqueSlug);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: produit.nom,
    description: produit.description,
    brand: { "@type": "Brand", name: marque?.nom },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: produit.prix,
      availability: "https://schema.org/InStock",
      url: produit.lienAmazon
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ((produit.qualite + produit.durabilite + produit.fiabilite) / 3).toFixed(1),
      bestRating: 5,
      worstRating: 1,
      ratingCount: 1
    }
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${produit.nom} \u2014 Avis et comparatif`, "description": `${produit.verdict} \u2014 ${produit.description} Prix : ${produit.prix} \u20AC.` }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script>  ", '<div class="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500"> <a href="/" class="hover:text-indigo-600">Accueil</a> \u203A\n<a', ' class="hover:text-indigo-600 mx-1">', "</a> \u203A\n<a", ' class="hover:text-indigo-600 mx-1">', '</a> \u203A\n<span class="text-gray-800 font-medium">', '</span> </div> <div class="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Main --> <div class="lg:col-span-2 space-y-8"> <div> <h1 class="text-3xl font-bold mb-1">', '</h1> <div class="text-3xl font-bold text-indigo-600 mb-3">', ' \u20AC</div> <p class="text-gray-600">', '</p> </div> <!-- Indicateurs --> <div class="bg-gray-50 rounded-2xl p-6 grid grid-cols-3 gap-4"> ', ' </div> <!-- Pour qui / Contre qui --> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div class="bg-green-50 border border-green-100 rounded-xl p-4"> <div class="font-semibold text-green-800 mb-2">\u2713 Id\xE9al pour</div> <p class="text-green-700 text-sm">', '</p> </div> <div class="bg-red-50 border border-red-100 rounded-xl p-4"> <div class="font-semibold text-red-800 mb-2">\u2717 Moins adapt\xE9 si</div> <p class="text-red-700 text-sm">', '</p> </div> </div> <!-- Comparaison avec les autres produits de la marque --> <div> <h2 class="text-xl font-bold mb-4">Comparaison avec les autres ', "</h2> ", ' </div> </div> <!-- Sidebar --> <div class="lg:col-span-1 space-y-4"> <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-4"> <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notre verdict</div> <div class="text-lg font-bold text-indigo-600 mb-3">', '</div> <div class="text-3xl font-bold mb-4">', " \u20AC</div> ", ' <p class="text-xs text-gray-400 mt-3">\nLien affili\xE9 \u2014 votre prix ne change pas.\n</p> </div> <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-800"> <strong>Pas s\xFBr(e) ?</strong><br> <a href="/choix-express" class="underline">Utilise le Choix Express</a> pour une recommandation personnalis\xE9e.\n</div> </div> </div> '])), unescapeHTML(schema), maybeRenderHead(), addAttribute(`/categories/${produit.categorieSlug}`, "href"), categorie?.nom, addAttribute(`/marques/${produit.marqueSlug}`, "href"), marque?.nom, produit.nom, produit.nom, produit.prix.toLocaleString("fr-FR"), produit.description, [
    { label: "\u2B50 Qualit\xE9", val: produit.qualite },
    { label: "\u{1F527} Durabilit\xE9", val: produit.durabilite },
    { label: "\u{1F6E0} Fiabilit\xE9/SAV", val: produit.fiabilite }
  ].map(({ label, val }) => renderTemplate`<div class="text-center"> <div class="text-sm text-gray-500 mb-2">${label}</div> <div class="text-2xl font-bold text-indigo-600">${val}/5</div> <div class="flex justify-center gap-1 mt-1"> ${Array.from({ length: 5 }).map((_, i) => renderTemplate`<div${addAttribute(`w-3 h-3 rounded-full ${i < val ? "bg-indigo-500" : "bg-gray-200"}`, "class")}></div>`)} </div> </div>`), produit.pourQui, produit.contreQui, marque?.nom, renderComponent($$result2, "TableauComparatif", $$TableauComparatif, { "produits": autresDuMarque }), produit.verdict, produit.prix.toLocaleString("fr-FR"), renderComponent($$result2, "CTAAmazon", $$CTAAmazon, { "lien": produit.lienAmazon, "label": `Voir sur Amazon` })) })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/produits/[slug].astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/produits/[slug].astro";
const $$url = "/produits/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
