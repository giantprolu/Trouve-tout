# Trouve-Tout — Design System

## 1. Direction

Trouve-Tout se lit comme un carnet d'atelier, pas comme une brochure de magasin : chaque page mesure, situe et tranche, à la manière d'un plan technique annoté plutôt que d'une vitrine. Ce choix retire au lecteur la sensation d'être vendu — il est mesuré, informé, jamais poussé — et remplace le vocabulaire visuel de la boutique (grilles de cartes, badges promo, dégradés) par celui de l'établi : cotes, repères, tolérances.

**Risque pris :** le site n'a presque pas de photos décoratives ni de mise en page "magazine". La structure elle-même — cotations, réglettes graduées, fiches de contrôle — porte l'identité visuelle. Si ce parti pris échoue, le site paraîtra austère ; s'il réussit, il sera le seul comparateur d'outillage qui ressemble à un plan et pas à un supermarché.

## 2. Palette

| Nom | Hex | Rôle |
|---|---|---|
| `ink` | `#1C1E1A` | Texte principal — quasi-noir à dominante vert-de-gris, jamais un noir pur d'imprimante |
| `bg` | `#EDEFE8` | Fond de page — blanc cassé froid, proche d'un acier brossé, pas de crème ni de beige |
| `surface` | `#E1E4D9` | Fond des cartes, tableaux, blocs verdict — un ton sous le fond |
| `accent` | `#3C6E58` | Vert établi / patine — liens, titres de section, le tracé du repère signature |
| `signal` | `#B8791A` | Ambre bruni — exclusivement l'action commerciale (bouton d'affiliation, "Voir le prix") |
| `line` | `#8E9488` | Gris-vert moyen — cotes secondaires, séparateurs, texte tertiaire |

Contrastes (WCAG, sur fond `bg` #EDEFE8 sauf mention) :
- `ink` sur `bg` : **14.8:1** — texte de lecture
- `accent` sur `bg` : **5.1:1** — valide pour liens et texte de taille normale
- `ink` sur `signal` (texte de bouton) : **5.5:1** — c'est pourquoi le bouton commercial porte du texte sombre sur ambre, jamais du blanc sur ambre (qui tomberait à 3.2:1)
- `line` sur `bg` : **2.9:1** — réservé aux traits et légendes, jamais à du texte porteur de sens

Aucune couleur de marque : le vert est une patine désaturée (à distance du vert-jaune Ryobi), l'ambre est un ocre bruni (à distance du terracotta, du rouge Einhell et du orange générique).

## 3. Typographie

Trois familles, trois rôles stricts. Toutes libres (Google Fonts / Fontsource), chargées en `woff2` variable pour Astro.

- **Display — Big Shoulders** (condensée, graisses 600–800). Réservée aux titres de niveau page (H1, H2) et au repère signature. Elle porte la voix "atelier" — jamais utilisée en dessous de 24px, jamais pour un paragraphe.
- **Lecture — Public Sans** (400/500/700). Tout le texte courant : intros, paragraphes de guide, labels d'interface, verdicts. Chaux, sans prétention, conçue pour rester lisible longtemps sur mobile.
- **Utilitaire — IBM Plex Mono** (500/600). Cotes, prix, caractéristiques techniques, tableaux comparatifs, badges de tolérance. Signale visuellement "ceci est une donnée mesurée", pas une opinion.

### Échelle

| Niveau | Famille / graisse | Taille | Interligne | Usage |
|---|---|---|---|---|
| Display XL | Big Shoulders 800 | clamp(2.75rem, 6vw, 4.5rem) | 1.02 | Titre d'accueil |
| Display L | Big Shoulders 700 | clamp(2rem, 4vw, 2.75rem) | 1.08 | H1 fiche / guide |
| Display M | Big Shoulders 600 | 1.5rem | 1.15 | H2, titres de section |
| Titre bloc | Public Sans 700 | 1.125rem | 1.3 | H3, en-têtes de composant |
| Corps large | Public Sans 400 | 1.125rem | 1.7 | Chapô, intro de guide |
| Corps | Public Sans 400 | 1rem | 1.65 | Paragraphe standard |
| Petit | Public Sans 500 | 0.875rem | 1.5 | Légendes, notes, UI secondaire |
| Donnée | IBM Plex Mono 500 | 0.9375rem | 1.4 | Prix, specs, cellules de tableau |
| Étiquette | IBM Plex Mono 600, maj., +0.08em | 0.75rem | 1.3 | Eyebrows, badges de tolérance |

## 4. Mise en page

**Concept en une phrase :** chaque page est une fiche de mesure — un objet qu'on situe sur une échelle plutôt qu'une liste qu'on scrolle.

### Accueil
```
┌──────────────────────────────────────────┐
│ TROUVE-TOUT                    [Recherche]│
├──────────────────────────────────────────┤
│  GRANDE ACCROCHE (Display XL)             │
│  "Le bon outil, pas le plus cher."        │
│  sous-titre Corps large — 1 phrase        │
│                                            │
│  ┃— Choix Express (bouton primaire) →     │
├──────────────────────────────────────────┤
│  ┏━━━━━ Catégorie : Jardin ━━━━━┓         │
│  │ 3 guides, listés en ligne,    │         │
│  │ chacun avec sa cote de budget │         │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛         │
│  (répété par catégorie — jamais une       │
│   grille de cartes identiques : largeur   │
│   et densité varient par catégorie)       │
├──────────────────────────────────────────┤
│  Encart transparence affiliation (bas)    │
└──────────────────────────────────────────┘
```
Mobile : la recherche passe en bandeau collant sous le header ; chaque catégorie devient une bande pleine largeur empilée, le bouton Choix Express reste visible en pied de viewport (position sticky) tant qu'on n'a pas atteint le premier guide.

### Fiche produit
```
┌──────────────────────────────────────────┐
│ ← Retour au guide            Catégorie    │
├───────────────────────┬──────────────────┤
│ Nom du produit (Disp.L)│ ┌ VERDICT ─────┐│
│ Marque · gamme         │ │ Pour qui ?    ││
│                        │ │ phrase nette  ││
│ [image produit]        │ │ ├─cote─┤ 8/10  ││
│                        │ └───────────────┘│
│                        │ [Voir chez X] →  │
├───────────────────────┴──────────────────┤
│ RÉGLETTE BUDGET (repère signature)        │
│ 80€ ├────●──────────┤ 400€  "vous êtes ici"│
├────────────────────────────────────────────┤
│ Ce que ça change vraiment (Corps, 3-5 pts)│
│ Tableau comparatif vs. 2 alternatives      │
│ Encart transparence affiliation            │
└────────────────────────────────────────────┘
```
Mobile : la colonne verdict passe SOUS l'image (pas au-dessus — le lecteur voit d'abord l'objet, puis le jugement), le bouton d'action reste ancré en bas d'écran (sticky), la réglette budget garde sa pleine largeur car elle est le repère qu'on doit pouvoir lire d'un coup d'œil, même dans un rayon de magasin.

### Guide d'achat long
```
┌──────────────────────────────────────────┐
│ Titre du guide (Disp.L) + temps de lecture│
│ Chapô (Corps large)                       │
├──────────────────────────────────────────┤
│ Sommaire à cotes : chaque section listée  │
│ avec sa position sur une frise verticale  │
│ (pas de 01/02/03 — les sections ne sont   │
│  pas une séquence obligée)                │
├──────────────────────────────────────────┤
│ Section : "Le vocabulaire à connaître"    │
│  définitions courtes, terme en Mono       │
├──────────────────────────────────────────┤
│ Section : "3 profils, 3 choix" — 3 blocs  │
│  verdict côte à côte (pas une grille de   │
│  cartes égales : le bloc recommandé est   │
│  visuellement plus large)                 │
├──────────────────────────────────────────┤
│ Tableau comparatif complet                │
│ CTA de sortie vers 1-2 fiches produit     │
└──────────────────────────────────────────┘
```
Mobile : la frise de sommaire devient une barre de progression horizontale scrollable en haut de l'article ; les 3 blocs profils s'empilent dans l'ordre d'intérêt (recommandé en premier, jamais en dernier).

### Résultat du Choix Express
```
┌──────────────────────────────────────────┐
│ "Voici ce qu'on te propose, et pourquoi." │
│ (Disp.M — jamais "Résultats" froid)       │
├──────────────────────────────────────────┤
│ RÉPONSE PRINCIPALE                        │
│ ┌ 1 fiche verdict pleine largeur ────────┐│
│ │ nom, cote budget, 2 raisons du choix   ││
│ │ [Voir chez X] →                        ││
│ └─────────────────────────────────────────┘│
│ "Si tu préfères plutôt X" — 1-2 alternatives│
│ plus discrètes (texte, pas de carte pleine)│
├──────────────────────────────────────────┤
│ Lien : "Refaire le test" / "Lire le guide"│
└──────────────────────────────────────────┘
```
Mobile : une seule colonne, la réponse principale occupe tout le premier écran sans avoir à scroller pour voir le bouton d'action — c'est l'écran conçu en priorité pour quelqu'un debout dans un rayon.

## 5. Élément signature — la cote

**Un seul élément : le repère de cote**, empruntée au plan technique. Un trait fin (1.5px, `accent` ou `line`), terminé par deux courtes butées perpendiculaires (jamais de flèches — trop "diagramme marketing"), avec une étiquette Mono posée au-dessus ou à côté du trait.

Il n'est jamais décoratif : il apparaît uniquement pour situer une valeur sur une échelle — le prix d'un produit sur sa fourchette de budget, un score de confort sur 10, la position d'un guide dans un sommaire. Chaque fois qu'un chiffre du site a besoin d'être *situé* plutôt que juste affiché, il prend la forme d'une cote.

Il encode l'idée centrale du site : acheter un outil n'est pas un choix de goût, c'est une mesure — on situe un besoin sur une plage de prix, de puissance, d'usage, et la cote rend cette opération visible. Discipline : jamais plus d'une cote visible par bloc de contenu, jamais de cote sur du texte narratif.

Micro-mouvement autorisé (le seul de tout le site) : au premier passage à l'écran, le trait de la cote se dessine de gauche à droite en 400ms — jamais de rebond, de fondu répété au survol, ni d'animation sur autre chose.

## 6. Composants

**Bouton d'action commerciale**
Fond `signal` (#B8791A), texte `ink` en Public Sans 700, coins arrondis 6px (pas de pill — trop "app de shopping"), une petite étiquette Mono en majuscules au-dessus du libellé ("CHEZ MANOMANO") pour que le lien affilié soit visible avant d'être cliqué, jamais caché. Libellé toujours au futur immédiat et concret : "Voir le prix chez ManoMano", jamais "En savoir plus". Survol : fond assombri de 8%, pas d'ombre ajoutée. Pas d'icône panier ni de flash — une seule flèche fine `→` en fin de libellé.

**Bloc verdict**
Cadre `surface`, bordure 1px `line`, coin supérieur gauche coupé à 45° sur 12px (rappel d'une étiquette de contrôle qualité — le seul autre clin d'œil graphique du site, toujours discret). En-tête Mono ("POUR QUI ?"), une phrase Corps de verdict net, une cote de confort/qualité sur 10 rendue avec l'élément signature. Jamais d'étoiles, jamais de badge "Meilleur choix" doré.

**Tranche de budget**
Réglette horizontale pleine largeur, trait `line` de fond, segment `accent` plus épais marquant la fourchette pertinente, un repère de cote (signature) pointant la position du produit courant, bornes basse/haute en Mono aux extrémités. Toujours accompagnée d'une micro-légende Corps ("Dans la moyenne pour un usage occasionnel").

**Tableau comparatif**
Lignes alternées `bg`/`surface` (pas de trait vertical entre colonnes), en-têtes Display M minuscule condensé, cellules numériques en Mono alignées à droite, la colonne du produit recommandé porte un fond `surface` légèrement plus soutenu sur toute sa hauteur — pas de coche verte, pas de croix rouge : le contraste de fond suffit à guider l'œil.

**Encart transparence affiliation**
Fond `bg` (se détache du `surface` environnant), bordure `line` en tirets fins, coin identique aux blocs verdict pour rester dans la même famille visuelle. Texte à la deuxième personne, honnête et bref : "Si tu achètes via ce lien, le marchand nous verse une commission. Le prix ne change pas pour toi, et ça ne change rien à notre avis — on a écrit ce guide avant de savoir qui te le proposerait." Jamais en petit gris illisible : Corps 0.875rem minimum, `ink` à 80% d'opacité.

## 7. Tokens Tailwind

```js
// tailwind.config.js (extrait)
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#1C1E1A',
        bg: '#EDEFE8',
        surface: '#E1E4D9',
        accent: '#3C6E58',
        signal: '#B8791A',
        line: '#8E9488',
      },
      fontFamily: {
        display: ['"Big Shoulders"', 'sans-serif'],
        body: ['"Public Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.02', fontWeight: '800' }],
        'display-l': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.08', fontWeight: '700' }],
        'display-m': ['1.5rem', { lineHeight: '1.15', fontWeight: '600' }],
        'block-title': ['1.125rem', { lineHeight: '1.3', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        data: ['0.9375rem', { lineHeight: '1.4', fontWeight: '500' }],
        label: ['0.75rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(28 30 26 / 0.06), 0 1px 1px 0 rgb(28 30 26 / 0.04)',
      },
    },
  },
};
```

---

### Relecture contre le brief (décisions changées en cours de route)

- Premier réflexe de palette : accent orange proche du terracotta (#C9622B). Changé pour un ambre/ocre (#B8791A) plus jaune, pour ne pas retomber dans la direction crème+terracotta explicitement écartée — et parce que ça libère un vrai signal "attention/action" au lieu d'un ton café.
- Premier réflexe typographique : une serif de lecture pour les longs paragraphes. Changée pour Public Sans (sans-serif) — une serif de lecture, même avec une autre palette, rapproche trop visuellement de la direction éditoriale "cream + serif" à éviter ; un sans-serif fonctionnel colle mieux à la voix "artisan qui explique, sans notice ni magazine".
- Premier réflexe de mise en page : grille de cartes uniforme pour les catégories et les guides. Changée pour des blocs de largeur variable — la grille égale est justement le motif "comparateur générique" que le brief disqualifie.
- Vérifié qu'aucune cote/numérotation 01/02/03 n'apparaît sur du contenu non séquentiel (sommaire de guide, catégories d'accueil).
