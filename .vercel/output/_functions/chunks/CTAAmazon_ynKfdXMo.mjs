import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_DSjKF99p.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$CTAAmazon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CTAAmazon;
  const { lien, label = "Voir sur Amazon", variant = "primary" } = Astro2.props;
  return renderTemplate`${variant === "primary" ? renderTemplate`${maybeRenderHead()}<a${addAttribute(lien, "href")} target="_blank" rel="noopener noreferrer nofollow" class="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-5 py-3 rounded-xl transition text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>${label}</a>` : renderTemplate`<a${addAttribute(lien, "href")} target="_blank" rel="noopener noreferrer nofollow" class="text-amber-600 hover:text-amber-700 text-sm font-medium underline underline-offset-2">${label} ↗
</a>`}`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/components/CTAAmazon.astro", void 0);

export { $$CTAAmazon as $ };
