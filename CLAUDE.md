# Trouve-Tout — non-négociables

Ce fichier existe parce que ces règles viennent d'erreurs déjà commises sur ce
projet (canonical vers un domaine qu'on ne possède pas, ID d'affilié inventé,
prix figés faux au bout de quelques jours). Elles ne se redécouvrent pas à
chaque session, elles se respectent.

## Modèle économique

Le site ne vend rien. Il publie des guides d'achat et vit de commissions
d'affiliation : ManoMano (7 %, via Awin) en priorité, Amazon (3 %) en recours
ponctuel. Le revenu dépend de deux choses : que Google indexe les pages, et
que le lecteur fasse confiance à l'analyse avant de cliquer. Toute décision
technique qui abîme l'une ou l'autre est une mauvaise décision, même élégante.

## Stack

Astro 5, `output: 'server'`, adaptateur `@astrojs/vercel`, Tailwind,
TypeScript. Déploiement Vercel sur `www.trouve-tout-conseil.fr`. Ne pas
changer de stack sans instruction explicite.

## Identité du site

Une seule constante `SITE_URL`, dans `src/lib/site.ts`, alignée avec `site`
dans `astro.config.mjs`. Aucune URL de domaine écrite en dur ailleurs. Les
canoniques, le sitemap, `robots.txt`, les balises Open Graph et le JSON-LD en
dérivent tous. Chemins normalisés : pas de slash final parasite, pas de query
string dans la canonique.

## Affiliation

Aucun identifiant d'affilié dans le code. L'ID Awin se lit dans
`PUBLIC_AWIN_AFFILIATE_ID`, le tag Amazon éventuel dans
`PUBLIC_AMAZON_PARTNER_TAG`. Le build émet un avertissement visible si l'ID
Awin manque. Les liens sont construits à l'affichage (`src/lib/affiliation.ts`),
jamais stockés pré-assemblés dans les données. Tout lien commercial porte
`rel="sponsored nofollow noopener noreferrer"` et un attribut `data-affilie`
pour le suivi.

## Prix

Le prix affiché vient de `prixActuel()`/`prixAffichage()`
(`src/lib/affiliation.ts`) : prix exact si le produit a été synchronisé avec
le flux Awin/ManoMano il y a moins de 72 h, fourchette (`fourchettePrix()`,
écart max 50 €) sinon — décision du 2026-07-30 qui affine celle du
2026-07-29 (prix exact proscrit). La fourchette existait parce que
`prixIndicatif` venait d'un export CSV figé sans rafraîchissement : ce
rafraîchissement existe désormais (voir "Synchronisation des prix"), donc
un prix exact n'est plus une promesse en l'air — seulement quand la
fraîcheur est vérifiée. Ne jamais afficher `prixIndicatif` brut ni appeler
`formaterPrix()` directement dessus : `formaterPrix()` reste réservée aux
bornes déjà réelles (ex. min/max de prix d'une catégorie), tout le reste
passe par `prixActuel()`/`prixAffichage()`, seuls points qui savent si la
fraîcheur est garantie.

## Synchronisation des prix

`scripts/sync-prix.mjs`, lancé deux fois par jour (8h/12h heure de Paris) par
`.github/workflows/sync-prix.yml` (+ déclenchement manuel), télécharge le
flux produit Awin (annonceur ManoMano FR 17547, URL dans le secret
`AWIN_FEED_URL`) et régénère `src/data/prix-synchronises.json` — fichier
généré, à ne jamais éditer à la main. Le matching se fait via le `p=<id>`
déjà présent dans chaque `urlMarchand` (= colonne `aw_product_id` du flux),
donc aucun identifiant supplémentaire à saisir par fiche. Le workflow commit
et pousse directement sur `main` s'il y a un changement, ce qui déclenche un
redéploiement Vercel automatique : exception assumée à la règle "ne pas
déployer en production" ci-dessous, qui vise les actions manuelles de
l'assistant, pas ce pipeline construit explicitement pour ça.

## Données structurées

`Product` avec nom, description et marque, plus `gtin13` et `offers` quand
`prixActuel()` renvoie un prix exact — jamais avec une fourchette ou un prix
approximatif : le prix et la disponibilité déclarés dans `offers` doivent
toujours correspondre exactement à ce qui est affiché sur la page, sinon
Google sanctionne le mismatch. Pas d'`aggregateRating` : une note maison
avec `ratingCount: 1` est un avis auto-attribué, sanctionné par Google.

## Rendu

`export const prerender = true` sur toute page dont le contenu ne dépend pas
de la requête, avec `getStaticPaths` sur les routes dynamiques. Seuls le
Choix Express, le profil et le sitemap restent en rendu serveur.

## Honnêteté du contenu

Aucun de ces outils n'a été testé. Ne jamais inventer une mesure, une durée
d'autonomie, un niveau sonore, un résultat de test ou une photo. Les
positionnements de gamme et les critères techniques généraux sont légitimes ;
les données d'expérience ne le sont pas. Toute fiche dont l'URL marchand
n'est pas une vraie fiche produit est marquée `verifie: false`.
`npm run check:produits` liste ces fiches et sort en erreur s'il en reste.

## Design

`design-system.md` à la racine est la source de vérité pour toute décision
visuelle — palette, typographie, mise en page, composants. Ne pas improviser
de couleur ni de graisse hors de ce document ; si quelque chose manque,
demander plutôt qu'inventer.

## Ce qu'il ne faut pas faire

Ne pas fusionner `dev` dans `main`/`refonte` sans accord explicite (espace
admin, routes API et comparateur de `dev` ont été jugés hors-scope : ils
supposent une base Supabase que ce projet n'a plus, et un comparateur va à
l'encontre du parti pris éditorial des guides). Ne pas déployer en
production (exception assumée : `sync-prix.yml`, voir "Synchronisation des
prix"). Ne pas ajouter de dépendance sans justification. Ne pas remplir
les mentions légales avec des informations plausibles : laisser les
emplacements `[À COMPLÉTER]` vides et les signaler.
