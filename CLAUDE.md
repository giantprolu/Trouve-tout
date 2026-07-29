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

Le prix exact est affiché (`formaterPrix()`), décision explicite prise le
2026-07-29 malgré le risque documenté : Amazon comme Awin interdisent
officiellement un prix figé sans flux temps réel, et un prix figé devient
faux en quelques jours. Ce risque est assumé sciemment, pas oublié — si un
prix affiché ne correspond plus à la fiche marchand, ce n'est pas un bug,
c'est le compromis accepté. `prixIndicatif` vient du dernier export CSV
marchand disponible ; il n'y a pas de flux temps réel, donc pas de mécanisme
de rafraîchissement automatique — retraiter un nouveau CSV est aujourd'hui le
seul moyen de mettre les prix à jour.

## Données structurées

`Product` avec nom, description et marque, c'est tout. Pas de bloc `offers`
sans flux marchand réel. Pas d'`aggregateRating` : une note maison avec
`ratingCount: 1` est un avis auto-attribué, sanctionné par Google.

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
production. Ne pas ajouter de dépendance sans justification. Ne pas remplir
les mentions légales avec des informations plausibles : laisser les
emplacements `[À COMPLÉTER]` vides et les signaler.
