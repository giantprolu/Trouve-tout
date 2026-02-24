/* empty css                                  */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BtsDOg2Y.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let saved = false;
  let profil = { email: "", name: "", budgetMin: "", budgetMax: "", priorite: "equilibre" };
  const cookieHeader = Astro2.request.headers.get("cookie") ?? "";
  const cookieMatch = cookieHeader.match(/tt_profil=([^;]+)/);
  if (cookieMatch) {
    try {
      profil = { ...profil, ...JSON.parse(decodeURIComponent(cookieMatch[1])) };
    } catch {
    }
  }
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    profil = {
      email: form.get("email") ?? "",
      name: form.get("name") ?? "",
      budgetMin: form.get("budget_min") ?? "",
      budgetMax: form.get("budget_max") ?? "",
      priorite: form.get("priorite") ?? "equilibre"
    };
    saved = true;
    Astro2.response.headers.set(
      "Set-Cookie",
      `tt_profil=${encodeURIComponent(JSON.stringify(profil))}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
    );
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mon profil", "description": "Personnalisez vos pr\xE9f\xE9rences pour des recommandations sur mesure." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-xl mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-2">👤 Mon profil</h1> <p class="text-gray-500 mb-8">Configurez vos préférences pour des recommandations personnalisées.</p> ${saved && renderTemplate`<div class="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
✓ Profil enregistré avec succès.
</div>`} <form method="POST" class="space-y-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"> <div> <label class="block font-medium mb-1">Email</label> <input type="email" name="email"${addAttribute(profil.email, "value")} placeholder="vous@exemple.com" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"> </div> <div> <label class="block font-medium mb-1">Prénom</label> <input type="text" name="name"${addAttribute(profil.name, "value")} placeholder="Votre prénom" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"> </div> <div> <label class="block font-medium mb-2">Budget habituel (€)</label> <div class="flex gap-3 items-center"> <input type="number" name="budget_min"${addAttribute(profil.budgetMin, "value")} placeholder="Min" min="0" class="w-1/2 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"> <span class="text-gray-400">–</span> <input type="number" name="budget_max"${addAttribute(profil.budgetMax, "value")} placeholder="Max" min="0" class="w-1/2 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"> </div> </div> <div> <label class="block font-medium mb-2">Priorité globale</label> <div class="flex gap-4"> ${[["prix", "\u{1F4B8} Prix"], ["equilibre", "\u2696\uFE0F \xC9quilibre"], ["qualite", "\u2B50 Qualit\xE9"]].map(([val, label]) => renderTemplate`<label class="flex-1 border border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-indigo-400 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50"> <input type="radio" name="priorite"${addAttribute(val, "value")} class="sr-only"${addAttribute(profil.priorite === val, "checked")}> <span class="text-sm font-medium">${label}</span> </label>`)} </div> </div> <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
Enregistrer mon profil
</button> </form> </div> ` })}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/profil/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/profil/index.astro";
const $$url = "/profil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
