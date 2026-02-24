/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BtsDOg2Y.mjs';
import { $ as $$TableauComparatif } from '../../chunks/TableauComparatif_eGun1oIM.mjs';
import { $ as $$VerdictProduit } from '../../chunks/VerdictProduit_CirnVrdB.mjs';
import { i as getMarqueBySlug, e as getProduitsByMarque, a as getCategorieBySlug } from '../../chunks/data__-lBQRlo.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const marque = getMarqueBySlug(slug);
  if (!marque) return Astro2.redirect("/categories");
  const produitsDuMarque = getProduitsByMarque(slug);
  const categorie = getCategorieBySlug(marque.categorieSlug);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${marque.nom} \u2014 Comparatif ${categorie?.sousTitre ?? ""}`, "description": `Comparatif complet ${marque.nom} : les 3 meilleurs mod\xE8les ${categorie?.sousTitre ?? ""} d\xE9cortiqu\xE9s.` }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500"> <a href="/" class="hover:text-indigo-600">Accueil</a> ›
<a href="/categories" class="hover:text-indigo-600 mx-1">Catégories</a> ›
<a${addAttribute(`/categories/${marque.categorieSlug}`, "href")} class="hover:text-indigo-600 mx-1">${categorie?.nom}</a> ›
<span class="text-gray-800 font-medium">${marque.nom}</span> </div> <div class="max-w-4xl mx-auto px-4 py-8"> <div class="mb-8"> <h1 class="text-3xl font-bold mb-2">${marque.nom}</h1> <p class="text-gray-500">${marque.description}</p> </div> <!-- Tableau comparatif --> <section class="mb-10"> <h2 class="text-xl font-bold mb-4">Comparatif des ${produitsDuMarque.length} modèles</h2> ${renderComponent($$result2, "TableauComparatif", $$TableauComparatif, { "produits": produitsDuMarque })} </section> <!-- Fiches détaillées --> <section> <h2 class="text-xl font-bold mb-6">Détail de chaque modèle</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> ${produitsDuMarque.map((p, i) => renderTemplate`${renderComponent($$result2, "VerdictProduit", $$VerdictProduit, { "produit": p, "numero": i + 1 })}`)} </div> </section> <div class="mt-10 text-center"> <a${addAttribute(`/categories/${marque.categorieSlug}`, "href")} class="text-indigo-600 hover:underline font-medium">
← Voir toutes les marques ${categorie?.nom} </a> </div> </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/marques/[slug].astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/marques/[slug].astro";
const $$url = "/marques/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
