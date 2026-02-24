import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from './astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$CTAAmazon } from './CTAAmazon_ynKfdXMo.mjs';

const $$Astro = createAstro();
const $$TableauComparatif = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TableauComparatif;
  const { produits } = Astro2.props;
  const segmentLabel = {
    meilleur_rapport: "\u2B50 Premium",
    milieu: "\u{1F4A1} \xC9quilibre",
    moins_cher: "\u{1F4B8} Budget"
  };
  return renderTemplate`${maybeRenderHead()}<div class="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm"> <table class="w-full text-sm"> <thead> <tr class="bg-gray-50 border-b border-gray-100"> <th class="text-left px-4 py-3 font-semibold text-gray-700">Produit</th> <th class="text-center px-3 py-3 font-semibold text-gray-700">Prix</th> <th class="text-center px-3 py-3 font-semibold text-gray-700">⭐ Qualité</th> <th class="text-center px-3 py-3 font-semibold text-gray-700">🔧 Durabilité</th> <th class="text-center px-3 py-3 font-semibold text-gray-700">🛠 Fiabilité</th> <th class="text-center px-3 py-3 font-semibold text-gray-700">Segment</th> <th class="px-3 py-3"></th> </tr> </thead> <tbody> ${produits.map((p, i) => renderTemplate`<tr${addAttribute(`border-b border-gray-50 ${i === 0 ? "bg-indigo-50/40" : "bg-white hover:bg-gray-50"} transition`, "class")}> <td class="px-4 py-4"> <a${addAttribute(`/produits/${p.slug}`, "href")} class="font-medium hover:text-indigo-600 transition"> ${p.nom} </a> ${i === 0 && renderTemplate`<span class="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
Recommandé
</span>`} </td> <td class="text-center px-3 py-4 font-bold text-indigo-600"> ${p.prix.toLocaleString("fr-FR")} €
</td> <td class="text-center px-3 py-4"> <div class="flex justify-center gap-0.5"> ${Array.from({ length: 5 }).map((_, j) => renderTemplate`<div${addAttribute(`w-2 h-2 rounded-full ${j < p.qualite ? "bg-yellow-400" : "bg-gray-200"}`, "class")}></div>`)} </div> </td> <td class="text-center px-3 py-4"> <div class="flex justify-center gap-0.5"> ${Array.from({ length: 5 }).map((_, j) => renderTemplate`<div${addAttribute(`w-2 h-2 rounded-full ${j < p.durabilite ? "bg-blue-400" : "bg-gray-200"}`, "class")}></div>`)} </div> </td> <td class="text-center px-3 py-4"> <div class="flex justify-center gap-0.5"> ${Array.from({ length: 5 }).map((_, j) => renderTemplate`<div${addAttribute(`w-2 h-2 rounded-full ${j < p.fiabilite ? "bg-green-400" : "bg-gray-200"}`, "class")}></div>`)} </div> </td> <td class="text-center px-3 py-4 text-xs font-medium text-gray-600"> ${segmentLabel[p.segment]} </td> <td class="px-3 py-4"> ${renderComponent($$result, "CTAAmazon", $$CTAAmazon, { "lien": p.lienAmazon, "variant": "small", "label": "Amazon" })} </td> </tr>`)} </tbody> </table> </div>`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/components/TableauComparatif.astro", void 0);

export { $$TableauComparatif as $ };
