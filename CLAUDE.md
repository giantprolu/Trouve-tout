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
(`src/lib/affiliation.ts`) : prix exact si le flux Awin/ManoMano d'où il
sort a été **généré** il y a moins de 72 h (pas simplement téléchargé, voir
"Synchronisation des prix"), fourchette (`fourchettePrix()`,
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

Le `syncedAt` écrit dans le fichier ne doit **jamais** être l'heure
d'exécution du script — correction du 2026-08-04. Auparavant chaque run
réhorodatait les 118 fiches, ce qui produisait deux effets : la fraîcheur des
72 h mesurait l'âge du téléchargement et non celui du prix (un flux figé côté
Awin faisait donc publier un `offers` JSON-LD faussement frais), et le
garde-fou `git diff --quiet` du workflow voyait toujours un changement, d'où
deux redéploiements par jour pour rien.

**Ne pas coder d'URL de flux en dur.** Le secret à renseigner est
`AWIN_DATAFEED_API_KEY` (clé « datafeed », distincte de celle de la Publisher
API, à récupérer dans Awin). Avec elle, le script interroge
`https://productdata.awin.com/datafeed/list/apikey/<clé>`, trie les flux de
l'annonceur par `Last Imported` décroissant, ignore ceux de plus de 7 jours et
les parcourt du plus frais au plus ancien jusqu'à retrouver les 118 fiches —
en s'arrêtant dès qu'elles y sont, les flux ManoMano faisant environ un
million de lignes chacun. `AWIN_FEED_URL` reste un repli, et accepte
plusieurs URL séparées par des virgules ou des retours à la ligne : c'est la
seule porte de sortie quand la clé n'est pas exploitable, les URL des flux
étant lisibles dans la liste téléchargée à la main. **Toujours en garder une
de renseignée** — Awin répond `500` sur une clé invalide, et sans repli la
synchronisation s'arrête au lieu de se dégrader.

La fraîcheur de chaque fiche vient, par ordre de précision : de la colonne
`last_updated` de sa ligne, sinon du `Last Imported` de son flux, sinon de
l'en-tête `Last-Modified`, sinon — à défaut de toute date — de la comparaison
au snapshot précédent, auquel cas les `syncedAt` d'origine sont conservés tant
que le contenu ne bouge pas et le fichier reste inchangé.

Quand plusieurs annonces Awin existent pour une même référence (ManoMano est
une marketplace : autant d'annonces que de vendeurs), c'est **la moins chère
en stock** qui est retenue, une annonce liée au `p=` de la fiche primant
toujours sur un simple `model_id`.

Épisode fondateur, à ne pas réapprendre : le 2026-08-04, les 118 prix du flux
étaient identiques au centime aux `prixIndicatif` figés le 2026-07-29, alors
que ManoMano affichait +5,8 % sur au moins une fiche — le site publiait donc
des `offers` faux. Cause : `AWIN_FEED_URL` pointait sur le flux « ManoMano FR
- Part 1 », que l'annonceur avait cessé d'alimenter le **2026-05-15**, trois
mois plus tôt, pendant que d'autres flux du même annonceur étaient réimportés
chaque nuit. Un flux qui se télécharge n'est pas un flux qui vit, et aucune
fraîcheur ne se déduit de l'heure d'un `cron`.

Conséquence assumée : si le flux reste identique plus de 72 h, les fiches
repassent en fourchette et les `offers` disparaissent. C'est le comportement
correct — on ne peut pas certifier frais un prix quand rien ne distingue un
flux vivant d'un flux figé. Le script énonce dans ses logs lequel des trois
cas s'applique, ainsi que les en-têtes et colonnes réellement disponibles :
si Awin se met un jour à dater ses exports, ça se verra là.

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
