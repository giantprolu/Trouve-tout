/* empty css                                  */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BtsDOg2Y.mjs';
import { $ as $$VerdictProduit } from '../chunks/VerdictProduit_CirnVrdB.mjs';
import { h as recommanderChoixExpress, f as categories } from '../chunks/data__-lBQRlo.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let resultat = null;
  let erreur = "";
  let valeurs = { categorie: "", priorite: "equilibre" };
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const categorie = form.get("categorie");
    const budget = parseInt(form.get("budget"), 10);
    const priorite = form.get("priorite");
    valeurs = { categorie, budget: String(budget), priorite };
    resultat = recommanderChoixExpress(categorie, budget, priorite);
    if (!resultat) erreur = `Aucun produit trouv\xE9 dans cette cat\xE9gorie sous ${budget} \u20AC. Essayez un budget plus \xE9lev\xE9.`;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Choix Express", "description": "3 questions, 1 recommandation personnalis\xE9e \u2014 sans compte." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-xl mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-2">⚡ Choix Express</h1> <p class="text-gray-500 mb-8">3 questions, 1 recommandation. Sans compte.</p> ${!resultat && renderTemplate`<form method="POST" class="space-y-6"> <div> <label class="block font-medium mb-2">Quelle catégorie ?</label> <select name="categorie" required class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"> <option value="">Choisir…</option> ${categories.map((c) => renderTemplate`<option${addAttribute(c.slug, "value")}${addAttribute(valeurs.categorie === c.slug, "selected")}> ${c.emoji} ${c.nom} — ${c.sousTitre} </option>`)} </select> </div> <div> <label class="block font-medium mb-2">Budget maximum ?</label> <select name="budget" required class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"> <option value="100">Moins de 100 €</option> <option value="300" selected>100 – 300 €</option> <option value="600">300 – 600 €</option> <option value="9999">+ de 600 €</option> </select> </div> <div> <label class="block font-medium mb-2">Priorité ?</label> <div class="flex gap-4"> ${[["prix", "\u{1F4B8} Prix bas"], ["equilibre", "\u2696\uFE0F \xC9quilibr\xE9"], ["qualite", "\u2B50 Qualit\xE9 max"]].map(([val, label]) => renderTemplate`<label class="flex-1 border border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-indigo-400 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50"> <input type="radio" name="priorite"${addAttribute(val, "value")} class="sr-only"${addAttribute(valeurs.priorite === val, "checked")} required> <span class="text-sm font-medium">${label}</span> </label>`)} </div> </div> ${erreur && renderTemplate`<div class="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"> ${erreur} </div>`} <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
Trouver mon produit →
</button> </form>`} ${resultat && renderTemplate`<div> <div class="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 mb-6 text-indigo-800"> <strong>✓ Recommandation personnalisée</strong> — basée sur vos réponses.
</div> ${renderComponent($$result2, "VerdictProduit", $$VerdictProduit, { "produit": resultat })} <div class="mt-6 text-center"> <a href="/choix-express" class="text-sm text-gray-500 hover:text-indigo-600 underline">
← Recommencer
</a> </div> </div>`} </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/choix-express/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/choix-express/index.astro";
const $$url = "/choix-express";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
