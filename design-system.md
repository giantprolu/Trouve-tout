# Trouve-Tout — Design System

## 1. Direction

Le site se lit comme une fiche technique d'atelier, pas comme un magazine : marges réglées, filets de cotation, une graduation qui court en marge et sert de repère de lecture. Ce parti pris dit au lecteur, avant la première phrase, que ce qu'il va lire a été mesuré et vérifié — pas mis en page pour vendre, à l'inverse de la fiche produit qu'il fuit en arrivant ici.

## 2. Palette

| Nom | Hex | Rôle |
|---|---|---|
| Atelier | `#EDEEE9` | Fond — papier d'atelier, grisé froid, jamais crème |
| Graphite | `#1D201F` | Texte — noir de mine de crayon, jamais noir pur |
| Tôle | `#E2E4DC` | Surfaces — cartes, blocs, tableaux |
| Bleu cordeau | `#2C4A6E` | Accent éditorial — liens, titres de verdict, focus. Évoque le cordeau à tracer du menuisier, pas une marque |
| Jaune sécurité | `#F0B400` | Signal d'action commerciale — réservé au bouton d'achat et rien d'autre, registre pictogramme de sécurité normalisé |
| Ligne | `#6E7268` | Filets, graduations, légendes discrètes — jamais pour du texte de lecture |

Contrastes vérifiés (WCAG) :
- Graphite sur Atelier : **14.1:1**
- Bleu cordeau sur Atelier : **7.8:1**
- Graphite sur Jaune sécurité : **8.8:1**
- Atelier (texte) sur Bleu cordeau (fond bouton secondaire) : **7.8:1**
- Graphite sur Tôle : **12.8:1**
- Ligne sur Atelier (usage graphique seul, pas texte) : 4.2:1

## 3. Typographie

Trois familles, trois métiers. Toutes sur Google Fonts (Astro : `@fontsource` recommandé, chargement rapide, pas de FOIT).

- **Display — Big Shoulders (Display), 700/800.** Réservée aux titres de verdict, aux gros chiffres de la jauge de budget, aux titres de section. Condensée, dressée, elle vient de la sérigraphie sur carter d'outil, pas de l'affiche. Utilisée avec retenue : jamais en paragraphe, jamais en dessous de 24px.
- **Lecture — Public Sans, 400/500/600.** Le corps du texte, les guides longs, les explications. Famille pensée pour la clarté documentaire, pas pour l'esthétique — exactement ce que demande un lecteur anxieux qui a besoin de comprendre vite.
- **Utilitaire — IBM Plex Mono, 400/500.** Cotes, dimensions, prix, cellules de tableau comparatif. Elle fait lire un chiffre comme un repère fiable, à la manière d'un afficheur de pied à coulisse.

### Échelle

| Style | Famille | Taille / Interligne | Graisse | Usage |
|---|---|---|---|---|
| Display XL | Big Shoulders Display | 56px / 58px | 800 | Titre d'accueil, résultat Choix Express |
| Display L | Big Shoulders Display | 40px / 44px | 700 | Titre de verdict, H1 de guide |
| Display M | Big Shoulders Display | 28px / 32px | 700 | H2 de section |
| Lecture L | Public Sans | 20px / 32px | 400 | Chapô, premier paragraphe |
| Lecture base | Public Sans | 17px / 28px | 400 | Corps de texte |
| Lecture accent | Public Sans | 17px / 28px | 600 | Emphase inline, labels de bouton |
| Légende | Public Sans | 14px / 20px | 500 | Méta, dates, crédits |
| Mono data L | IBM Plex Mono | 24px / 28px | 500 | Prix mis en avant, cote principale |
| Mono data base | IBM Plex Mono | 15px / 22px | 400 | Cellules de tableau, cotes secondaires |
| Kicker | IBM Plex Mono | 13px / 16px, +0.04em | 500 | Étiquettes de rubrique, UPPERCASE courtes |

## 4. Mise en page

**Concept :** chaque page est une feuille à dessin réglée — un cadre de marge fixe et une règle graduée qui longe la marge gauche du haut en bas, sert de repère de section et se transforme en indicateur de progression de lecture ; rien ne flotte au centre, tout s'aligne sur la règle.

### Accueil
```
┌─ règle ─┬──────────────────────────────────────┐
│ |       │  TROUVE-TOUT           [Choix Express]│
│ |       │                                        │
│ 0 ─      │  On vous aide à choisir,               │
│ |       │  pas à acheter.          (Display XL)  │
│ |       │  chapô 2 lignes (Lecture L)             │
│ 1 ─      │  [ Commencer le Choix Express → ]      │
│ |       ├────────────────────────────────────────┤
│ |       │  GUIDES RÉCENTS (kicker)               │
│ 2 ─      │  ┌────────────┐┌────────────┐┌───────┐│
│ |       │  │ guide      ││ guide      ││ guide ││
│ |       │  │ + jauge    ││ + jauge    ││+ jauge││
│ |       │  └────────────┘└────────────┘└───────┘│
│ 3 ─      ├────────────────────────────────────────┤
│ |       │  PAR TYPE D'OUTIL (kicker)              │
│ |       │  liste flush-left, pas de grille de     │
│ |       │  cartes uniforme — largeurs variables    │
└─ règle ─┴──────────────────────────────────────┘
```
Mobile : la règle graduée se réduit à un simple trait vertical fin en marge gauche (8px), sans les chiffres ; les cartes de guides passent en pile pleine largeur, une par ligne, jamais en carrousel.

### Fiche produit
```
┌─ règle ─┬──────────────────────────────────────┐
│ 0 ─      │  ‹ Retour au guide                     │
│ |       │  NOM DU PRODUIT (Display L)             │
│ |       │  ┌─ BLOC VERDICT ─────────────────────┐│
│ 1 ─      │  │ [niveau à bulle]  "Bien calé pour   ││
│ |       │  │  un usage occasionnel"              ││
│ |       │  │  2 lignes de justification           ││
│ |       │  └──────────────────────────────────────┘│
│ 2 ─      │  TRANCHE DE BUDGET (gauge horizontale)   │
│ |       │  100€ ─┬───[███]───┬─ 500€               │
│ |       │  ┌──────────────┐┌────────────────────┐ │
│ 3 ─      │  │ Ce qui compte││ Ce qui ne compte pas│ │
│ |       │  │ (Lecture)    ││ (Lecture)           │ │
│ |       │  └──────────────┘└────────────────────┘ │
│ 4 ─      │  [ Voir le prix chez ManoMano ↗ ]        │
│ |       │  encart transparence affiliation          │
└─ règle ─┴──────────────────────────────────────┘
```
Mobile : le bloc verdict et le bouton commercial restent groupés et visibles sans défiler après le titre (le lecteur en rayon doit décider en un écran) ; les deux colonnes "ce qui compte" empilent.

### Guide d'achat long
```
┌─ règle ─┬──────────────────────────────────────┐
│ 0 ─      │  TITRE DU GUIDE (Display L)             │
│ |       │  Sommaire en marge (liens vers ancres,   │
│ |       │  pas de 01/02/03 — juste les intitulés)  │
│ 1 ─      │──────────────────────────────────────── │
│ |       │  §1 intitulé (Display M)                 │
│ |       │  texte long (Lecture, mesure ~68 car.)    │
│ 2 ─      │  figure/schéma coté en pleine largeur    │
│ |       │──────────────────────────────────────── │
│ 3 ─      │  §2 intitulé …                            │
│ |       │  tableau comparatif inline si pertinent    │
│ 4 ─      │──────────────────────────────────────── │
│ |       │  Bandeau : "Prêt à choisir ?"              │
│ |       │  [ Faire le Choix Express → ]              │
└─ règle ─┴──────────────────────────────────────┘
```
Mobile : le sommaire en marge devient un menu sticky compact (un seul trait "§3 / 7" + libellé courant) qui remplace la graduation numérotée — jamais de barre de progression en %.

### Résultat Choix Express
```
┌─ règle ─┬──────────────────────────────────────┐
│ |       │  Vos réponses (rappel court, mono)       │
│ 0 ─      │                                          │
│ |       │        ╭──────────────────────╮           │
│ |       │        │   [NIVEAU À BULLE]   │  grand,   │
│ 1 ─      │        │   XXL, bulle animée  │  format   │
│ |       │        ╰──────────────────────╯  héros    │
│ |       │  "Ce qu'on vous conseille" (Display L)     │
│ 2 ─      │  justification 2-3 phrases (Lecture)      │
│ |       │  ┌────────────┐  produit recommandé,       │
│ |       │  │ bloc verdict│  bouton commercial inclus  │
│ 3 ─      │  └────────────┘                            │
│ |       │  [ Refaire le test ]  (ghost, discret)      │
└─ règle ─┴──────────────────────────────────────┘
```
Mobile : la bulle héros garde sa taille (c'est l'élément qu'on doit reconnaître, jamais miniaturisé), le rappel des réponses passe en accordéon fermé par défaut.

## 5. Élément signature

**Le niveau à bulle — jauge de confiance.** Une capsule horizontale façon fiole de niveau (coins droits, léger reflet en haut, deux traits de calibrage gravés à 30% et 70% de sa longueur), avec un point plein qui se positionne le long de la capsule selon le niveau de confiance éditoriale de la recommandation — pas une note sur 5, pas des étoiles. Quand la bulle est centrée entre les deux traits, le choix est solide ; quand elle dérive vers un bord, le texte à côté explique pourquoi ("correct, mais seulement si vous bricolez rarement"). C'est l'objet le plus universel et le moins marqué de l'outillage : un niveau ne vend rien, il vérifie que quelque chose est aligné — exactement ce que le lecteur veut qu'on fasse pour lui. Il apparaît à trois endroits seulement : le bloc verdict (grand), le résultat du Choix Express (héros, la bulle se pose avec un léger temps de réglage), et en miniature dans une colonne du tableau comparatif. Nulle part ailleurs — pas de décoration, pas de variante réduite en logo.

## 6. Composants

**Bouton d'action commerciale.** Fond Jaune sécurité, texte Graphite, bordure 1px Graphite (registre étiquette de sécurité, pas bouton web générique). Le label dit l'action exacte : *« Voir le prix chez ManoMano ↗ »*, jamais « Acheter » ou « En savoir plus ». Sous le bouton, toujours visible : *« Lien affilié — le prix est le même pour vous. »* en Légende. Au survol : jaune assombri de 8%. Focus clavier : anneau Bleu cordeau, offset 2px.

**Bloc verdict.** Fond Tôle, filet supérieur 3px Bleu cordeau (marque un début de section technique, pas une carte flottante). Niveau à bulle en tête, puis titre du verdict en Display M (une phrase, jamais un adjectif seul type "Excellent"), puis 1-2 phrases de justification en Lecture.

**Tranche de budget.** Bandeau horizontal gradué de 100€ à 500€ (ou plage pertinente), traits de graduation tous les 100€ façon nuancier de quincaillerie, segment du produit en cours mis en évidence par un remplissage Bleu cordeau clair, prix exact en Mono data L au-dessus avec une flèche de cote qui pointe le segment.

**Tableau comparatif.** En-tête Graphite/texte Atelier (inversé), lignes sur fond Tôle séparées par un filet 1px Ligne — visible, pas capillaire. Colonnes chiffrées en Mono, colonnes texte en Lecture, une colonne "adéquation" avec la jauge miniature.

**Encart de transparence affiliation.** Fond Atelier, bordure 1px Graphite, kicker Mono *« Comment on gagne notre vie »*. Texte à la deuxième personne, sans jargon : *« Si vous achetez via ce lien, le marchand nous verse une commission. Ça ne change rien à votre prix. Le verdict a été écrit avant qu'on choisisse le marchand. »* Toujours visible à côté du bouton commercial, jamais en pied de page seul.

## 7. Tokens Tailwind

```js
// tailwind.config.js (extrait)
module.exports = {
  theme: {
    extend: {
      colors: {
        atelier: '#EDEEE9',
        graphite: '#1D201F',
        tole: '#E2E4DC',
        cordeau: {
          DEFAULT: '#2C4A6E',
          light: '#DCE4EC',
        },
        securite: {
          DEFAULT: '#F0B400',
          dark: '#D9A400',
        },
        ligne: '#6E7268',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        lecture: ['"Public Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['56px', { lineHeight: '58px', fontWeight: '800' }],
        'display-l':  ['40px', { lineHeight: '44px', fontWeight: '700' }],
        'display-m':  ['28px', { lineHeight: '32px', fontWeight: '700' }],
        'lecture-l':  ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'lecture':    ['17px', { lineHeight: '28px', fontWeight: '400' }],
        'legende':    ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'mono-l':     ['24px', { lineHeight: '28px', fontWeight: '500' }],
        'mono-base':  ['15px', { lineHeight: '22px', fontWeight: '400' }],
        'kicker':     ['13px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        none: '0px',
        sm: '1px',
        DEFAULT: '0px',
      },
      boxShadow: {
        none: 'none',
        etch: 'inset 0 0 0 1px #1D201F', // filet gravé, jamais d'ombre portée décorative
      },
    },
  },
};
```

## Relecture contre le brief

Trois réflexes de "site de comparatif générique" repérés et écartés en cours de route :

- **Étoiles / notes sur 5** envisagées pour le bloc verdict — remplacées par la jauge de niveau à bulle, seul élément signature du système, qui encode la confiance sans emprunter au vocabulaire des marketplaces.
- **Marqueurs 01/02/03** envisagés pour le sommaire des guides longs — écartés (explicitement disqualifiés) au profit de la règle graduée en marge et des intitulés de section flush-left.
- **Fond quasi noir + accent unique** envisagé un temps comme "le risque esthétique" — reconnu comme l'une des trois directions interdites par le brief. Le vrai risque retenu est ailleurs : faire porter tout le langage de confiance du site par un seul objet (le niveau à bulle) plutôt que par des couleurs de fond inversées.
