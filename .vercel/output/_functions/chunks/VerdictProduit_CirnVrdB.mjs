import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from './astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$CTAAmazon } from './CTAAmazon_ynKfdXMo.mjs';

const $$Astro = createAstro();
const $$VerdictProduit = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VerdictProduit;
  const { produit, numero } = Astro2.props;
  const segmentLabel = {
    meilleur_rapport: "Notre choix n\xB01 \u2B50",
    milieu: "Meilleur rapport qualit\xE9/prix \u{1F4A1}",
    moins_cher: "Le plus abordable \u{1F4B8}"
  };
  const segmentColor = {
    meilleur_rapport: "bg-indigo-50 border-indigo-200 text-indigo-800",
    milieu: "bg-emerald-50 border-emerald-200 text-emerald-800",
    moins_cher: "bg-amber-50 border-amber-200 text-amber-800"
  };
  return renderTemplate`${maybeRenderHead()}<div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"> ${numero && renderTemplate`<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">N°${numero}</div>`} <div${addAttribute(`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${segmentColor[produit.segment]}`, "class")}> ${segmentLabel[produit.segment]} </div> <h3 class="text-xl font-bold mb-1">${produit.nom}</h3> <div class="text-2xl font-bold text-indigo-600 mb-3">${produit.prix.toLocaleString("fr-FR")} €</div> <p class="text-gray-600 text-sm mb-4">${produit.description}</p> <!-- Indicateurs --> <div class="grid grid-cols-3 gap-3 mb-4"> ${[
    { label: "\u2B50 Qualit\xE9", val: produit.qualite },
    { label: "\u{1F527} Durabilit\xE9", val: produit.durabilite },
    { label: "\u{1F6E0} Fiabilit\xE9", val: produit.fiabilite }
  ].map(({ label, val }) => renderTemplate`<div class="text-center bg-gray-50 rounded-xl py-2"> <div class="text-xs text-gray-500 mb-1">${label}</div> <div class="flex justify-center gap-0.5"> ${Array.from({ length: 5 }).map((_, i) => renderTemplate`<div${addAttribute(`w-2 h-2 rounded-full ${i < val ? "bg-indigo-500" : "bg-gray-200"}`, "class")}></div>`)} </div> </div>`)} </div> <!-- Pour qui / Contre qui --> <div class="space-y-2 mb-4 text-sm"> <div class="flex gap-2"> <span class="text-green-500 font-bold flex-shrink-0">✓</span> <span class="text-gray-700">${produit.pourQui}</span> </div> <div class="flex gap-2"> <span class="text-red-400 font-bold flex-shrink-0">✗</span> <span class="text-gray-500">${produit.contreQui}</span> </div> </div> ${renderComponent($$result, "CTAAmazon", $$CTAAmazon, { "lien": produit.lienAmazon })} </div>`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/components/VerdictProduit.astro", void 0);

export { $$VerdictProduit as $ };
