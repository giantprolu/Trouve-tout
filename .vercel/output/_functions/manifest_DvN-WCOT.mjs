import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_DSjKF99p.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_9DvPlKCP.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/","cacheDir":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/node_modules/.astro/","outDir":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/dist/","srcDir":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/src/","publicDir":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/public/","buildClientDir":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/dist/client/","buildServerDir":"file:///C:/Users/nathn/Desktop/Projet/TrouveTout/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/cadeau","isIndex":true,"type":"page","pattern":"^\\/cadeau\\/?$","segments":[[{"content":"cadeau","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cadeau/index.astro","pathname":"/cadeau","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/categories/[slug]","isIndex":false,"type":"page","pattern":"^\\/categories\\/([^/]+?)\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/categories/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/categories","isIndex":true,"type":"page","pattern":"^\\/categories\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories/index.astro","pathname":"/categories","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/choix-express","isIndex":true,"type":"page","pattern":"^\\/choix-express\\/?$","segments":[[{"content":"choix-express","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/choix-express/index.astro","pathname":"/choix-express","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/marques/[slug]","isIndex":false,"type":"page","pattern":"^\\/marques\\/([^/]+?)\\/?$","segments":[[{"content":"marques","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/marques/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/marques","isIndex":true,"type":"page","pattern":"^\\/marques\\/?$","segments":[[{"content":"marques","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/marques/index.astro","pathname":"/marques","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/produits/[slug]","isIndex":false,"type":"page","pattern":"^\\/produits\\/([^/]+?)\\/?$","segments":[[{"content":"produits","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/produits/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/produits","isIndex":true,"type":"page","pattern":"^\\/produits\\/?$","segments":[[{"content":"produits","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/produits/index.astro","pathname":"/produits","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/profil","isIndex":true,"type":"page","pattern":"^\\/profil\\/?$","segments":[[{"content":"profil","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profil/index.astro","pathname":"/profil","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.Dymh1qsA.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/cadeau/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/categories/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/categories/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/choix-express/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/marques/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/produits/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/nathn/Desktop/Projet/TrouveTout/src/pages/profil/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/cadeau/index@_@astro":"pages/cadeau.astro.mjs","\u0000@astro-page:src/pages/categories/[slug]@_@astro":"pages/categories/_slug_.astro.mjs","\u0000@astro-page:src/pages/categories/index@_@astro":"pages/categories.astro.mjs","\u0000@astro-page:src/pages/choix-express/index@_@astro":"pages/choix-express.astro.mjs","\u0000@astro-page:src/pages/marques/[slug]@_@astro":"pages/marques/_slug_.astro.mjs","\u0000@astro-page:src/pages/marques/index@_@astro":"pages/marques.astro.mjs","\u0000@astro-page:src/pages/produits/[slug]@_@astro":"pages/produits/_slug_.astro.mjs","\u0000@astro-page:src/pages/produits/index@_@astro":"pages/produits.astro.mjs","\u0000@astro-page:src/pages/profil/index@_@astro":"pages/profil.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@ts":"pages/sitemap.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DvN-WCOT.mjs","C:/Users/nathn/Desktop/Projet/TrouveTout/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DnLD8URq.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.Dymh1qsA.css","/favicon.svg","/robots.txt"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"ieh9U1HOx9GSj7Js68DXzyYyLPAbQd/UOIT1QyXB7W0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
