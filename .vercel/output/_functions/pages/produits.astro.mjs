/* empty css                                  */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_DSjKF99p.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="text-2xl font-bold">Produits</h1> <p>Liste des produits...</p>`;
}, "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/produits/index.astro", void 0);

const $$file = "C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/produits/index.astro";
const $$url = "/produits";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
