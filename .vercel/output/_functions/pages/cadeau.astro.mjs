/* empty css                                  */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BtsDOg2Y.mjs';
import { $ as $$VerdictProduit } from '../chunks/VerdictProduit_CirnVrdB.mjs';
import { r as recommanderCadeau } from '../chunks/data__-lBQRlo.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let resultats = [];
  let submitted = false;
  if (Astro2.request.method === "POST") {
    submitted = true;
    const form = await Astro2.request.formData();
    const profile = {
      destinataire: form.get("destinataire"),
      age: form.get("age"),
      budget: parseInt(form.get("budget"), 10),
      occasion: form.get("occasion"),
      niveauTech: form.get("niveau_tech")
    };
    resultats = recommanderCadeau(profile);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mode Cadeau", "description": "Trouvez le cadeau id\xE9al en r\xE9pondant \xE0 quelques questions." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-xl mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-2">🎁 Mode Cadeau</h1> <p class="text-gray-500 mb-8">Dites-nous tout sur la personne, on trouve le cadeau parfait.</p> ${!submitted && renderTemplate`<form method="POST" class="space-y-6"> <div> <label class="block font-medium mb-2">Pour qui ?</label> <select name="destinataire" required class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"> <option value="">Choisir…</option> ${[["ami", "Ami(e)"], ["parent", "Parent"], ["enfant", "Enfant"], ["conjoint", "Conjoint(e)"], ["collegue", "Coll\xE8gue"]].map(([v, l]) => renderTemplate`<option${addAttribute(v, "value")}>${l}</option>`)} </select> </div> <div> <label class="block font-medium mb-2">Tranche d'âge ?</label> <select name="age" required class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"> <option value="enfant">Enfant (moins de 12 ans)</option> <option value="ado">Ado (12–18 ans)</option> <option value="adulte" selected>Adulte (18–60 ans)</option> <option value="senior">Senior (60+)</option> </select> </div> <div> <label class="block font-medium mb-2">Budget ?</label> <select name="budget" required class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"> <option value="50">Moins de 50 €</option> <option value="150">50 – 150 €</option> <option value="300">150 – 300 €</option> <option value="9999">+ de 300 €</option> </select> </div> <div> <label class="block font-medium mb-2">Occasion ?</label> <select name="occasion" required class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"> ${[["noel", "No\xEBl"], ["anniversaire", "Anniversaire"], ["fete", "F\xEAte"], ["autre", "Autre"]].map(([v, l]) => renderTemplate`<option${addAttribute(v, "value")}>${l}</option>`)} </select> </div> <div> <label class="block font-medium mb-2">Niveau tech de la personne ?</label> <div class="flex gap-4"> ${[["debutant", "\u{1F423} D\xE9butant"], ["moyen", "\u{1F464} Moyen"], ["expert", "\u{1F680} Expert"]].map(([val, label]) => renderTemplate`<label class="flex-1 border border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-pink-400 has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50"> <input type="radio" name="niveau_tech"${addAttribute(val, "value")} class="sr-only" required> <span class="text-sm font-medium">${label}</span> </label>`)} </div> </div> <button type="submit" class="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
Trouver le cadeau idéal →
</button> </form>`} ${submitted && renderTemplate`<div> ${resultats.length > 0 ? renderTemplate`<div> <div class="bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 mb-6 text-pink-800"> <strong>🎁 ${resultats.length} idée${resultats.length > 1 ? "s" : ""} de cadeau</strong> sélectionnée${resultats.length > 1 ? "s" : ""} pour vous.
</div> <div class="space-y-6"> ${resultats.map((p, i) => renderTemplate`${renderComponent($$result2, "VerdictProduit", $$VerdictProduit, { "produit": p, "numero": i + 1 })}`)} </div> </div>` : renderTemplate`<div class="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-amber-800">
Aucun produit trouvé pour ce budget. Essayez un budget plus élevé.
</div>`} <div class="mt-8 text-center"> <a href="/cadeau" class="text-sm text-gray-500 hover:text-pink-600 underline">
← Recommencer
</a> </div> </div>`} </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/cadeau/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/cadeau/index.astro";
const $$url = "/cadeau";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
