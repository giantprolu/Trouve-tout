import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DqsmIsTw.mjs';
import { manifest } from './manifest_DvN-WCOT.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/cadeau.astro.mjs');
const _page4 = () => import('./pages/categories/_slug_.astro.mjs');
const _page5 = () => import('./pages/categories.astro.mjs');
const _page6 = () => import('./pages/choix-express.astro.mjs');
const _page7 = () => import('./pages/marques/_slug_.astro.mjs');
const _page8 = () => import('./pages/marques.astro.mjs');
const _page9 = () => import('./pages/produits/_slug_.astro.mjs');
const _page10 = () => import('./pages/produits.astro.mjs');
const _page11 = () => import('./pages/profil.astro.mjs');
const _page12 = () => import('./pages/sitemap.xml.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/blog/index.astro", _page2],
    ["src/pages/cadeau/index.astro", _page3],
    ["src/pages/categories/[slug].astro", _page4],
    ["src/pages/categories/index.astro", _page5],
    ["src/pages/choix-express/index.astro", _page6],
    ["src/pages/marques/[slug].astro", _page7],
    ["src/pages/marques/index.astro", _page8],
    ["src/pages/produits/[slug].astro", _page9],
    ["src/pages/produits/index.astro", _page10],
    ["src/pages/profil/index.astro", _page11],
    ["src/pages/sitemap.xml.ts", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5bf6a133-9d12-47e0-875f-e73163be6631",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
