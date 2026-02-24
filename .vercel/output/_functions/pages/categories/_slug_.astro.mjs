/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BtsDOg2Y.mjs';
import { $ as $$TableauComparatif } from '../../chunks/TableauComparatif_eGun1oIM.mjs';
import { $ as $$VerdictProduit } from '../../chunks/VerdictProduit_CirnVrdB.mjs';
import { a as getCategorieBySlug, c as getMarquesByCategorie, d as getGuidesByCategorie, e as getProduitsByMarque } from '../../chunks/data__-lBQRlo.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const categorie = getCategorieBySlug(slug);
  if (!categorie) return Astro2.redirect("/categories");
  const marquesListe = getMarquesByCategorie(slug);
  const guides = getGuidesByCategorie(slug);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${categorie.nom} \u2014 ${categorie.sousTitre}`, "description": categorie.description }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="max-w-5xl mx-auto px-4 pt-6 text-sm text-gray-500"> <a href="/" class="hover:text-indigo-600">Accueil</a> ›
<a href="/categories" class="hover:text-indigo-600 mx-1">Catégories</a> ›
<span class="text-gray-800 font-medium">${categorie.nom}</span> </div> <div class="max-w-5xl mx-auto px-4 py-8"> <div class="mb-10"> <div class="text-5xl mb-3">${categorie.emoji}</div> <h1 class="text-3xl font-bold mb-2">${categorie.nom} — ${categorie.sousTitre}</h1> <p class="text-gray-500 max-w-2xl">${categorie.description}</p> </div> <!-- Marques --> ${marquesListe.map((marque) => {
    const produitsDuMarque = getProduitsByMarque(marque.slug);
    const meilleur = produitsDuMarque.find((p) => p.segment === "meilleur_rapport");
    return renderTemplate`<section class="mb-14"> <div class="flex items-center justify-between mb-4"> <div> <h2 class="text-2xl font-bold">${marque.nom}</h2> <p class="text-gray-500 text-sm">${marque.description}</p> </div> <a${addAttribute(`/marques/${marque.slug}`, "href")} class="text-sm text-indigo-600 hover:underline font-medium shrink-0 ml-4">
Voir tous les produits →
</a> </div> ${renderComponent($$result2, "TableauComparatif", $$TableauComparatif, { "produits": produitsDuMarque })} ${meilleur && renderTemplate`<div class="mt-4 max-w-sm"> ${renderComponent($$result2, "VerdictProduit", $$VerdictProduit, { "produit": meilleur })} </div>`} </section>`;
  })} <!-- Guides associés --> ${guides.length > 0 && renderTemplate`<section class="mt-16 border-t border-gray-100 pt-10"> <h2 class="text-xl font-bold mb-4">Guides d'achat ${categorie.nom}</h2> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> ${guides.map((g) => renderTemplate`<a${addAttribute(`/blog/${g.slug}`, "href")} class="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition group"> <h3 class="font-semibold group-hover:text-indigo-600">${g.titre}</h3> <p class="text-sm text-gray-500 mt-1">${g.description}</p> </a>`)} </div> </section>`} </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/categories/[slug].astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/categories/[slug].astro";
const $$url = "/categories/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
