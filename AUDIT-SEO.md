# Audit SEO — Trouve-Tout

Date : 2026-07-31. Périmètre : code, structure, configuration (pas de
réécriture du texte des guides). Stack : Astro 5, `output: 'server'`,
adaptateur `@astrojs/vercel`, déployé sur `www.trouve-tout-conseil.fr`.

## Synthèse

Le site est déjà bien construit du point de vue SEO technique : canonicals
cohérentes dérivées d'une source unique (`SITE_URL`), sitemap et robots.txt
générés dynamiquement, JSON-LD Article/Product/BreadcrumbList présent sur la
plupart des pages profondes, prix jamais mensongers vis-à-vis des données
structurées (`prixActuel()`), images toutes dimensionnées (`width`/`height`)
donc peu de risque CLS, profondeur de clic ≤ 3 partout. Les manques trouvés
sont réels mais ponctuels plutôt que structurels.

**14 problèmes corrigés** (redirection domaine, page 404, breadcrumb
manquant, maillage vers `/produits`, hiérarchie de titres, JSON-LD
Organization, `dateModified`, preconnect CDN images, priorité LCP, cache du
sitemap, titres de fiches produits trop longs, noindex sur `/profil`,
disclosure RGPD). **2 points importants restent proposés** (couverture
sémantique jardin-extérieur, FAQ) car ils touchent au contenu éditorial ou
nécessitent une donnée que je ne peux pas inventer sans la faire valider.
**7 points mineurs** sont listés avec correctif proposé.

Aucune fonctionnalité existante n'a été modifiée dans son comportement
(affiliation, tracking, design) — seuls des ajouts de balises/métadonnées et
un template de titre.

## Tableau des problèmes

| # | Problème | Preuve | Sévérité | Statut |
|---|----------|--------|----------|--------|
| C1 | Aucune redirection non-www → www dans le code ; risque de contenu dupliqué apex/www si le domaine nu est aussi attaché à Vercel | `vercel.json` ne contenait que `{"framework":"astro"}` | **Critique** | Corrigé (redirect 308 host-based dans `vercel.json`) + action manuelle requise |
| I1 | Pas de page 404 personnalisée — page d'erreur générique sans maillage de secours | absence de `src/pages/404.astro` | Important | Corrigé (`src/pages/404.astro`) |
| I2 | `BreadcrumbList` absent sur `/marques/[slug]` alors que présent sur `/categories/[slug]`, `/blog/[slug]`, `/produits/[slug]` | `src/pages/marques/[slug].astro` (avant correctif, aucun script JSON-LD breadcrumb) | Important | Corrigé |
| I3 | `/produits` (118 fiches) sans aucun lien interne entrant — seul le sitemap.xml la référence | `src/layouts/Layout.astro`, nav header/footer avant correctif | Important | Corrigé (lien "Tous les produits" au footer) |
| I4 | Hiérarchie de titres incorrecte sur `/marques/[slug]` : `<h2>` du verdict imbriqué sous le `<h2>` "Détail de chaque modèle" | `src/components/VerdictProduit.astro:31` (avant correctif) | Important | Corrigé (h2 → h3) |
| I5 | Schema `Article` des guides sans `dateModified` (et sans `datePublished` dérivable honnêtement) | `src/pages/blog/[slug].astro`, bloc `schema` avant correctif | Important | Corrigé pour `dateModified` (dérivé du dernier commit git sur `data.ts`, jamais inventé) ; `datePublished` non ajouté — à valider si vous voulez introduire un vrai champ éditorial par guide |
| I6 | Pas de schema `Organization` (seul `WebSite` présent) | `src/layouts/Layout.astro`, bloc JSON-LD avant correctif | Important | Corrigé |
| I7 | Aucun `preconnect`/`dns-prefetch` vers `images2.productserve.com`, CDN qui sert la quasi-totalité des images produit (candidat LCP le plus fréquent) | `src/layouts/Layout.astro` `<head>` avant correctif | Important | Corrigé |
| I8 | Images hero (candidates LCP) sans `fetchpriority="high"` sur home, guide, catégorie, fiche produit | `src/pages/index.astro`, `blog/[slug].astro`, `categories/[slug].astro`, `produits/[slug].astro` | Important | Corrigé |
| I9 | `sitemap.xml` en rendu serveur (choix documenté dans `CLAUDE.md`) sans `Cache-Control` : reconstruit à chaque crawl | `src/pages/sitemap.xml.ts` avant correctif | Important | Corrigé (`Cache-Control: s-maxage=3600`) |
| I10 | Title des fiches produits pouvant dépasser 100 caractères sur les noms techniques longs (ex. « Bosch GWB 12V-10 Perceuse-visseuse à percussion (2 batteries 6,0 Ah) — Avis et comparatif — Trouve-Tout ») | `src/pages/produits/[slug].astro:84` avant correctif | Important | Corrigé partiellement : le suffixe « Avis et comparatif » n'est plus ajouté que si le nom laisse de la marge (≤ 40 car.). Le nom du produit lui-même n'a pas été raccourci (donnée factuelle, pas de la prose éditoriale) — certains titres restent longs sans intervention sur les données produit |
| I11 | `/profil` (formulaire email/prénom/budget) indexable par défaut, orpheline (aucun lien interne, absente du sitemap) | `src/pages/profil/index.astro:32` avant correctif | Important | Corrigé (`noindex`) |
| I12 | La politique de confidentialité ne mentionnait pas la collecte email/prénom/budget de `/profil` | `src/pages/confidentialite.astro`, liste avant correctif | Important | Corrigé |
| I13 | Couverture sémantique déséquilibrée : jardin-extérieur concentre **58 produits pour 1 seul guide**, contre perçage-vissage (21 produits, 2 guides), sciage (18, 1), ponçage (21, 1) | comptage sur `src/lib/data.ts` (`categorieSlug: 'jardin-exterieur'` × 58) | Important | Proposé — contenu éditorial, voir plan d'action |
| I14 | Pas de `FAQPage` ni de section FAQ dans les guides, alors que le format capterait les requêtes conversationnelles ("comment choisir...") | `Guide` (type `sections: {titre, contenu}[]`) dans `src/lib/data.ts`, aucun champ FAQ | Important | Proposé — nécessite rédaction, soumis à validation |
| M1 | Meta description homepage un peu courte (~112 car.) vs la fourchette optimale 150-160 | `src/pages/index.astro`, prop `description` du `<Layout>` | Mineur | Proposé |
| M2 | Pas d'`apple-touch-icon` (seulement `favicon.svg`) | `src/layouts/Layout.astro` `<head>` | Mineur | Proposé |
| M3 | Pas de `og:image:width`/`og:image:height` | `src/layouts/Layout.astro`, bloc Open Graph | Mineur | Proposé |
| M4 | Logo `Organization` en SVG (`favicon.svg`) — Google recommande un raster (PNG/JPG) pour l'éligibilité au rich result "Logo" | `src/layouts/Layout.astro`, JSON-LD Organization ajouté ci-dessus | Mineur | Proposé — nécessite un asset PNG à fournir |
| M5 | Cannibalisation potentielle mineure entre les guides « Quelle perceuse-visseuse choisir ? » et « Premier équipement : par quoi commencer ? » (même catégorie, intention proche sur « premier achat perceuse ») | `src/lib/data.ts`, tableau `guides` | Mineur | À surveiller via Search Console, pas de correctif automatique pertinent |
| M6 | Commentaire obsolète dans `data.ts` mentionnant des produits jardin-extérieur encore `verifie: false` pour Bosch/Makita/Ryobi | `src/lib/data.ts:165-167` — `npm run check:produits` confirme 118/118 fiches vérifiées | Mineur | Proposé (nettoyage sans impact SEO) |
| M7 | Code mort : le fallback `Astro.redirect(...)` sur slug introuvable dans `blog/[slug].astro`, `categories/[slug].astro`, `marques/[slug].astro`, `produits/[slug].astro` n'est jamais atteint en `prerender` (Vercel sert directement la 404 statique pour tout slug hors `getStaticPaths`) | ex. `src/pages/blog/[slug].astro:19` | Mineur | Noté, aucune action nécessaire (la nouvelle `404.astro` couvre déjà ce cas côté plateforme) |

## Détail par section de la checklist

**A. Indexation & robots** — `robots.txt` (`src/pages/robots.txt.ts`) autorise
tout le crawl et référence le sitemap depuis `SITE_URL`, aucun blocage
accidentel de CSS/JS. `sitemap.xml.ts` filtre correctement les fiches
`verifie: false` (aucune actuellement, `check:produits` confirme 118/118) et
exclut `/profil`. Canonical cohérente sur toutes les pages via
`Layout.astro` (normalisation slash final + absence de query string).
Manquait : la redirection non-www → www (C1, corrigé) et une 404
personnalisée (I1, corrigé).

**B. Architecture & maillage** — Profondeur de clic ≤ 3 partout, vérifié
page par page. Maillage contextuel présent (catégorie ↔ marques ↔ guides ↔
produits, `TableauComparatif`, `CarrouselProduits`). Deux trous : breadcrumb
manquant sur les pages marque (I2) et `/produits` sans aucun lien entrant
(I3) — les deux corrigés. Pas de pagination sur les listes (`/blog`,
`/categories/[slug]`, `/produits`) : pas nécessaire, les volumes restent
faibles (5 guides, jusqu'à 58 produits par catégorie affichés en une seule
page sans troncature), donc pas de risque de contenu dupliqué lié à de la
pagination absente.

**C. Balises on-page** — Title et meta description uniques par page (dérivés
des données, jamais de doublon générique). Un seul `<h1>` par page, vérifié
sur toutes les templates. `alt` descriptif sur toutes les images (jamais de
nom de fichier brut). Deux trous : hiérarchie de titres sur la page marque
(I4, corrigé) et titres de fiches produits trop longs (I10, corrigé
partiellement).

**D. Données structurées** — `WebSite` présent partout mais pas
`Organization` (I6, corrigé) ; pas de `SearchAction` ajouté car le site n'a
aucune recherche interne — en déclarer un aurait été un balisage inexact.
`Article` sur les guides sans dates (I5, `dateModified` corrigé). `Product` +
`Offer` sur les fiches produits déjà conforme à la règle du fichier
`CLAUDE.md` : `offers` uniquement quand `prixActuel()` renvoie un prix exact
et synchronisé, jamais avec une fourchette — aucun risque de "price
mismatch". Pas d'`AggregateRating`/`Review`, décision déjà actée (avis
auto-attribué sanctionné par Google) et cohérente avec l'absence de vrais
avis clients sur le site — à ne pas ajouter tant qu'il n'y a pas de vrais
avis. `BreadcrumbList` généralisé (I2, corrigé). `FAQPage` absent (I14,
proposé).

**E. Performance & Core Web Vitals** — CLS : toutes les images ont
`width`/`height` explicites, y compris celles servies par
`images2.productserve.com` (proxy dimensionnable via `imageTaille()`) — pas
de correctif nécessaire. LCP : manquait le `preconnect` vers le CDN externe
et le `fetchpriority` sur les images hero (I7, I8, corrigés). INP : les
scripts tiers (AdSense, tracking clic affilié) sont déjà `async`/`is:inline`
minimal, rien de bloquant identifié. `sitemap.xml` sans cache (I9, corrigé).
Mobile : viewport correct, tailles de police en `clamp()`, zones tactiles ≥
11×11 (`h-11 w-11` répété dans les CTA) — conforme.

**F. Contenu & pertinence sémantique** — Écart de couverture majeur
jardin-extérieur (I13). Pas de cannibalisation forte détectée à part le cas
mineur M5. Fraîcheur : `dateModified` maintenant réel sur les guides (I5)
mais reste au niveau du fichier `data.ts` entier, pas par guide individuel —
si le rythme de publication augmente, un champ `dateModification` éditorial
par guide serait plus précis. E-E-A-T : pas d'auteur identifié, pas de page
"méthodologie" — voir plan d'action.

**G. Conformité & confiance** — Disclosure d'affiliation déjà présente
près des liens commerciaux (`EncartTransparence`, `CTAAffilie`), pas
seulement en footer — conforme. RGPD : gap comblé (I12). Mentions légales
avec des `[À COMPLÉTER]` volontairement laissés vides conformément à
`CLAUDE.md` — **à compléter par vous avant mise en ligne définitive**, ce
n'est pas une omission technique.

**H. International / local** — `lang="fr"` correct, pas de `hreflang`
(cohérent avec un site mono-marché FR) — conforme, aucune action.

## Actions manuelles à faire (hors périmètre code)

1. **Rattacher le domaine apex** `trouve-tout-conseil.fr` au projet Vercel
   (Vercel → Settings → Domains) si ce n'est pas déjà fait : la règle de
   redirection ajoutée dans `vercel.json` ne s'applique qu'aux hosts
   effectivement attachés au projet.
2. **Google Search Console** : vérifier la propriété de
   `www.trouve-tout-conseil.fr`, soumettre `sitemap.xml`, surveiller la
   couverture d'indexation dans les semaines suivant le déploiement.
3. **Rich Results Test** (search.google.com/test/rich-results) une fois en
   ligne : valider manuellement les schémas `Article`, `Product`,
   `BreadcrumbList`, `Organization` sur un échantillon de pages.
4. **Mentions légales** : compléter les champs `[À COMPLÉTER]`
   (identité de l'éditeur, statut, adresse, contact, registrar du domaine)
   — obligatoire légalement (art. 6 LCEN), volontairement laissé vide par
   design, voir `CLAUDE.md`.
5. **Logo raster** (PNG, min. 112×112 px) si vous voulez que le JSON-LD
   `Organization` soit éligible au rich result "Logo" Google (M4).
6. **Vercel Speed Insights** (optionnel) : package `@vercel/speed-insights`
   + activation dans le dashboard, pour un monitoring Core Web Vitals en
   continu au-delà du Web Analytics déjà en place.
7. Valider les deux propositions de contenu ci-dessous avant toute
   rédaction (I13, I14).

## Plan d'action contenu (hors périmètre code)

- **Priorité 1 — combler le vide jardin-extérieur** (I13) : 58 produits
  déjà en base pour 1 seul guide. Familles à fort volume de recherche non
  couvertes par un guide dédié : taille-haie, nettoyeur haute pression,
  tronçonneuse, débroussailleuse/coupe-bordures, souffleur de feuilles,
  robot tondeuse (distinct du guide tondeuse classique existant vu le
  nombre de références robots déjà en base — Bosch Indego, etc.).
- **Priorité 2 — meuleuse d'angle** : plusieurs références déjà en base
  (rangées dans ponçage-finition) mais aucun guide dédié alors que c'est un
  outil à fort volume de recherche.
- **FAQ dans les guides existants** (I14) : 3-5 questions par guide au
  format `FAQPage`, pour capter les featured snippets et les recherches
  conversationnelles ("comment choisir une perceuse-visseuse ?"). Nécessite
  rédaction éditoriale — à soumettre avant intégration.
- **Netlinking** : hors périmètre technique. Pistes usuelles pour ce type de
  site (guides d'achat outillage) : forums et communautés bricolage,
  annuaires spécialisés, partenariats avec des blogs rénovation/jardin,
  éventuellement des comparatifs cités par des médias bricolage — travail
  éditorial et d'outreach à mener séparément.
- **Fraîcheur éditoriale** : envisager un champ `dateModification` par
  guide (au lieu du niveau fichier actuel) si la cadence de mise à jour
  s'accélère — permettrait un `dateModified` précis par page plutôt que
  partagé.
