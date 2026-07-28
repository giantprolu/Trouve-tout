import type { Marchand } from './affiliation';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Categorie {
  slug: string;
  nom: string;
  emoji: string;
  description: string;
  sousTitre: string;
}

export interface Marque {
  slug: string;
  nom: string;
  /** Une marque d'outillage couvre plusieurs familles d'outils. */
  categorieSlugs: string[];
  description: string;
  positionnement: string;
}

export interface Produit {
  slug: string;
  nom: string;
  marqueSlug: string;
  categorieSlug: string;
  /** Ordre de grandeur, usage INTERNE (filtrage budget). Jamais affiche tel quel. */
  prixIndicatif: number;
  segment: 'meilleur_rapport' | 'milieu' | 'moins_cher';
  qualite: number;
  durabilite: number;
  fiabilite: number;
  verdict: string;
  pourQui: string;
  contreQui: string;
  description: string;
  marchand: Marchand;
  /** URL de la fiche produit chez le marchand. Le lien tracke est genere a l'affichage. */
  urlMarchand: string;
  /** false = URL encore generique et fiche non relue. */
  verifie: boolean;
}

export interface Guide {
  slug: string;
  titre: string;
  description: string;
  categorieSlug: string;
  intro: string;
  sections: { titre: string; contenu: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────────

export const categories: Categorie[] = [
  {
    slug: 'percage-vissage',
    nom: 'Perçage & vissage',
    emoji: '🔩',
    description:
      "Perceuses-visseuses, perforateurs, visseuses à chocs. Le premier outil qu'on achète, et celui qu'on garde dix ans.",
    sousTitre: "L'outil de base, celui qu'il ne faut pas rater",
  },
  {
    slug: 'sciage',
    nom: 'Sciage',
    emoji: '🪚',
    description:
      'Scies circulaires, scies sauteuses, scies à onglet. Couper droit, couper propre, sans y laisser un doigt.',
    sousTitre: 'Couper droit du premier coup',
  },
  {
    slug: 'poncage-finition',
    nom: 'Ponçage & finition',
    emoji: '🎨',
    description:
      "Ponceuses excentriques, vibrantes, à bande. L'étape que tout le monde bâcle et qui fait 80 % du rendu final.",
    sousTitre: 'Là où se joue le rendu final',
  },
  {
    slug: 'jardin-exterieur',
    nom: 'Jardin & extérieur',
    emoji: '🌿',
    description:
      "Tondeuses, taille-haies, souffleurs, nettoyeurs. L'entretien extérieur sans y passer ses week-ends.",
    sousTitre: 'Reprendre le dessus sur le jardin',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Marques
// ─────────────────────────────────────────────────────────────────────────────

export const marques: Marque[] = [
  {
    slug: 'bosch',
    nom: 'Bosch',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition', 'jardin-exterieur'],
    description:
      "Deux gammes distinctes qu'il ne faut surtout pas confondre : la verte (grand public) et la bleue Professional (chantier). Le SAV est parmi les meilleurs du marché et les pièces détachées restent disponibles longtemps.",
    positionnement: 'La valeur sûre, à condition de choisir la bonne gamme',
  },
  {
    slug: 'makita',
    nom: 'Makita',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition', 'jardin-exterieur'],
    description:
      "Marque de professionnels. Plus chère à l'achat, mais l'écosystème de batteries LXT 18V est immense et la mécanique encaisse un usage quotidien pendant des années.",
    positionnement: 'Le choix long terme si tu bricoles beaucoup',
  },
  {
    slug: 'ryobi',
    nom: 'Ryobi',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition', 'jardin-exterieur'],
    description:
      "Le système ONE+ 18V couvre plus de cent outils, tous sur la même batterie — outillage et jardin compris. C'est l'argument principal : tu achètes les batteries une seule fois.",
    positionnement: 'Le meilleur écosystème pour un budget raisonnable',
  },
  {
    slug: 'einhell',
    nom: 'Einhell',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition', 'jardin-exterieur'],
    description:
      "Entrée de gamme assumée, avec le système de batteries Power X-Change partagé sur toute la marque. Suffisant pour un usage occasionnel, à éviter si tu enchaînes les chantiers.",
    positionnement: 'Le moins cher pour démarrer sans se ruiner',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Produits
//
// ⚠️  Les URLs ci-dessous sont des recherches ManoMano generiques et les fiches
//     n'ont pas encore ete relues (verifie: false). Avant de pousser du trafic :
//       1. ouvre la fiche produit reelle sur manomano.fr
//       2. colle son URL dans urlMarchand
//       3. relis le verdict, corrige la reference si besoin
//       4. passe verifie a true
//     `npm run check:produits` liste tout ce qui reste a traiter.
// ─────────────────────────────────────────────────────────────────────────────

const rechercheManoMano = (q: string) =>
  `https://www.manomano.fr/recherche/${encodeURIComponent(q)}`;

export const produits: Produit[] = [
  // ── PERÇAGE & VISSAGE ──────────────────────────────────────────────────────
  {
    slug: 'bosch-gsb-18v-55-professional',
    nom: 'Bosch GSB 18V-55 Professional',
    marqueSlug: 'bosch',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 190,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'Notre référence ⭐',
    pourQui: "Ceux qui percent régulièrement, y compris dans le béton et la pierre.",
    contreQui: "Usage deux fois par an pour monter un meuble — c'est surdimensionné.",
    description:
      "Perceuse-visseuse à percussion 18V de la gamme bleue. Mandrin métal, couple confortable, et surtout un moteur brushless qui ne chauffe pas sur les longues séries de vis.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Bosch GSB 18V-55 Professional'),
    verifie: false,
  },
  {
    slug: 'bosch-universalimpact-18v',
    nom: 'Bosch UniversalImpact 18V',
    marqueSlug: 'bosch',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 110,
    segment: 'milieu',
    qualite: 4, durabilite: 3, fiabilite: 4,
    verdict: 'Le bon compromis maison 💡',
    pourQui: "Bricoleur du dimanche qui veut quand même pouvoir percer un mur porteur.",
    contreQui: "Usage intensif : le moteur à charbon fatigue plus vite qu'un brushless.",
    description:
      "Version grand public de la percussion Bosch, sur batterie Power for All 18V partagée avec l'outillage de jardin de la marque.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Bosch UniversalImpact 18V'),
    verifie: false,
  },
  {
    slug: 'makita-dhp484',
    nom: 'Makita DHP484',
    marqueSlug: 'makita',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 210,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La plus increvable 🔧',
    pourQui: "Ceux qui ont déjà des batteries LXT, ou qui comptent en acheter.",
    contreQui: "Premier achat isolé : le ticket d'entrée batteries + chargeur pique.",
    description:
      "Perceuse à percussion brushless compacte du système LXT 18V. Format court qui passe entre deux montants, ce que peu de concurrentes savent faire.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Makita DHP484'),
    verifie: false,
  },
  {
    slug: 'ryobi-r18pd7',
    nom: 'Ryobi R18PD7',
    marqueSlug: 'ryobi',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 140,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le meilleur ticket ONE+ 👍',
    pourQui: "Ceux qui veulent bâtir un parc d'outils sur une seule batterie.",
    contreQui: "Usage professionnel quotidien.",
    description:
      "Perceuse à percussion brushless ONE+ 18V. La même batterie alimentera ensuite la scie, la ponceuse et la tondeuse — c'est tout l'intérêt.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Ryobi R18PD7'),
    verifie: false,
  },
  {
    slug: 'einhell-te-cd-18-2-li',
    nom: 'Einhell TE-CD 18/2 Li',
    marqueSlug: 'einhell',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 75,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée de gamme honnête 💸",
    pourQui: "Premier achat, budget serré, usage occasionnel.",
    contreQui: "Perçage béton répété : le couple montre vite ses limites.",
    description:
      "Perceuse-visseuse à percussion Power X-Change. Correcte pour du montage de meubles et des chevilles dans du placo ou de la brique.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Einhell TE-CD 18/2 Li'),
    verifie: false,
  },

  // ── SCIAGE ─────────────────────────────────────────────────────────────────
  {
    slug: 'bosch-gks-190',
    nom: 'Bosch GKS 190',
    marqueSlug: 'bosch',
    categorieSlug: 'sciage',
    prixIndicatif: 160,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La circulaire de référence ⭐',
    pourQui: "Découpe de panneaux, bastaings, plancher — du filaire qui ne faiblit jamais.",
    contreQui: "Ceux qui n'ont pas de prise à portée ou qui coupent en hauteur.",
    description:
      "Scie circulaire filaire 1400 W, profondeur de coupe 70 mm. Semelle rigide et guide parallèle correct : la coupe reste droite si le réglage est soigné.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Bosch GKS 190'),
    verifie: false,
  },
  {
    slug: 'bosch-pst-900-pel',
    nom: 'Bosch PST 900 PEL',
    marqueSlug: 'bosch',
    categorieSlug: 'sciage',
    prixIndicatif: 105,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'La sauteuse polyvalente 💡',
    pourQui: "Découpes courbes, plans de travail, ouvertures dans du panneau.",
    contreQui: "Coupes droites longues — prends une circulaire.",
    description:
      "Scie sauteuse filaire avec changement de lame sans outil et soufflerie qui dégage le trait de coupe. Le pendulaire réglable change vraiment la propreté du résultat.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Bosch PST 900 PEL'),
    verifie: false,
  },
  {
    slug: 'makita-dss611',
    nom: 'Makita DSS611',
    marqueSlug: 'makita',
    categorieSlug: 'sciage',
    prixIndicatif: 200,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La liberté du sans-fil 🔧',
    pourQui: "Coupes en extérieur, sur toiture, loin d'une prise.",
    contreQui: "Grosses séries de coupe : la batterie descend vite.",
    description:
      "Circulaire 18V LXT, lame 165 mm. Autonomie honnête sur batterie 5 Ah, et l'équilibre en main est meilleur que sur la plupart des concurrentes sans fil.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Makita DSS611'),
    verifie: false,
  },
  {
    slug: 'ryobi-r18cs7',
    nom: 'Ryobi R18CS7',
    marqueSlug: 'ryobi',
    categorieSlug: 'sciage',
    prixIndicatif: 155,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Bon rapport dans ONE+ 👍',
    pourQui: "Ceux déjà équipés en batteries Ryobi.",
    contreQui: "Coupe de précision répétée en atelier.",
    description:
      "Scie circulaire brushless ONE+ 18V, lame 184 mm. Profondeur suffisante pour du bastaing en une seule passe.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Ryobi R18CS7'),
    verifie: false,
  },
  {
    slug: 'einhell-te-cs-18-165',
    nom: 'Einhell TE-CS 18/165',
    marqueSlug: 'einhell',
    categorieSlug: 'sciage',
    prixIndicatif: 90,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Dépannage économique 💸',
    pourQui: "Quelques coupes par an sur du panneau ou du lambris.",
    contreQui: "Bois dur ou épais : ça peine.",
    description:
      "Circulaire Power X-Change 18V. La semelle est moins rigide que sur les modèles pro, il faut soigner le guidage.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Einhell TE-CS 18/165'),
    verifie: false,
  },

  // ── PONÇAGE & FINITION ─────────────────────────────────────────────────────
  {
    slug: 'bosch-pex-400-ae',
    nom: 'Bosch PEX 400 AE',
    marqueSlug: 'bosch',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 95,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 5,
    verdict: 'Le meilleur premier achat ⭐',
    pourQui: "Rénovation de meubles, portes, plans de travail.",
    contreQui: "Décapage agressif de parquet — il faut une ponceuse à bande.",
    description:
      "Excentrique 350 W, plateau 125 mm, aspiration intégrée. L'excentrique ne laisse pas les marques circulaires d'une rotative : c'est le bon choix par défaut.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Bosch PEX 400 AE'),
    verifie: false,
  },
  {
    slug: 'makita-bo5041',
    nom: 'Makita BO5041',
    marqueSlug: 'makita',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 165,
    segment: 'milieu',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La plus confortable sur la durée 🔧',
    pourQui: "Longues sessions de ponçage — les vibrations sont nettement mieux maîtrisées.",
    contreQui: "Usage ponctuel : le surcoût ne se justifie pas.",
    description:
      "Excentrique filaire 300 W avec poignée avant réglable. C'est le modèle qu'on garde quand on ponce plusieurs heures d'affilée.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Makita BO5041'),
    verifie: false,
  },
  {
    slug: 'ryobi-r18ros',
    nom: 'Ryobi R18ROS',
    marqueSlug: 'ryobi',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 95,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Pratique sans fil 👍',
    pourQui: "Ponçage de petites surfaces, retouches, meubles déplacés.",
    contreQui: "Grandes surfaces : le filaire reste plus confortable.",
    description:
      "Excentrique ONE+ 18V, plateau 125 mm. Sans fil, donc pas de rallonge qui traîne dans la poussière.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Ryobi R18ROS'),
    verifie: false,
  },
  {
    slug: 'einhell-te-rs-40e',
    nom: 'Einhell TE-RS 40 E',
    marqueSlug: 'einhell',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 60,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Le prix plancher 💸',
    pourQui: "Une porte à repeindre, un meuble à reprendre.",
    contreQui: "Usage régulier : le plateau s'use rapidement.",
    description:
      "Excentrique filaire d'entrée de gamme. Fait le travail sur de petites surfaces, sans prétention.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Einhell TE-RS 40 E'),
    verifie: false,
  },

  // ── JARDIN & EXTÉRIEUR ─────────────────────────────────────────────────────
  {
    slug: 'bosch-advancedrotak-36-750',
    nom: 'Bosch AdvancedRotak 36-750',
    marqueSlug: 'bosch',
    categorieSlug: 'jardin-exterieur',
    prixIndicatif: 470,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 4, fiabilite: 5,
    verdict: 'Le confort sans fil ⭐',
    pourQui: "Terrains jusqu'à 750 m², sans envie de gérer un moteur thermique.",
    contreQui: "Grands terrains ou herbe systématiquement haute et humide.",
    description:
      "Tondeuse 36V à batterie, largeur de coupe 46 cm. Plus de bidon d'essence, plus de vidange, démarrage instantané — c'est le vrai argument.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Bosch AdvancedRotak 36-750'),
    verifie: false,
  },
  {
    slug: 'makita-dur194',
    nom: 'Makita DUR194',
    marqueSlug: 'makita',
    categorieSlug: 'jardin-exterieur',
    prixIndicatif: 190,
    segment: 'milieu',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'Finitions impeccables 🔧',
    pourQui: "Bordures, pieds de mur, sous les clôtures.",
    contreQui: "Débroussaillage de ronces — il faut une machine à lame.",
    description:
      "Coupe-bordures 18V LXT à tête à fil semi-automatique. Léger, silencieux, et il partage la batterie de la perceuse Makita.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Makita DUR194'),
    verifie: false,
  },
  {
    slug: 'ryobi-ry18lmx37a',
    nom: 'Ryobi RY18LMX37A',
    marqueSlug: 'ryobi',
    categorieSlug: 'jardin-exterieur',
    prixIndicatif: 360,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Cohérent dans ONE+ 👍',
    pourQui: "Terrains moyens, propriétaires déjà équipés Ryobi.",
    contreQui: "Plus de 500 m² : prévois une seconde batterie.",
    description:
      "Tondeuse ONE+ 18V, coupe 37 cm, fonction mulching. Fonctionne sur les mêmes batteries que le reste de la gamme.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Ryobi RY18LMX37A'),
    verifie: false,
  },
  {
    slug: 'einhell-gc-em-1032',
    nom: 'Einhell GC-EM 1032',
    marqueSlug: 'einhell',
    categorieSlug: 'jardin-exterieur',
    prixIndicatif: 85,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Petit terrain, petit prix 💸',
    pourQui: "Jardins de ville jusqu'à 300 m², avec une prise à proximité.",
    contreQui: "Terrain en pente ou éloigné de la maison — le câble devient pénible.",
    description:
      "Tondeuse électrique filaire 1000 W, coupe 32 cm. Simple, légère, sans batterie à remplacer dans cinq ans.",
    marchand: 'manomano',
    urlMarchand: rechercheManoMano('Einhell GC-EM 1032'),
    verifie: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Guides d'achat
// ─────────────────────────────────────────────────────────────────────────────

export const guides: Guide[] = [
  {
    slug: 'quelle-perceuse-visseuse-choisir',
    titre: 'Quelle perceuse-visseuse choisir ?',
    description:
      "Les critères qui comptent vraiment — et ceux que les fiches produits mettent en avant pour rien.",
    categorieSlug: 'percage-vissage',
    intro:
      "C'est le premier outil qu'on achète et celui qu'on regrette le plus quand on se trompe. La bonne nouvelle : trois critères suffisent à décider, et le voltage n'en fait pas partie.",
    sections: [
      {
        titre: 'Le piège du voltage',
        contenu:
          "**Le chiffre en volts ne dit rien de la puissance.** Une 18V d'entrée de gamme sera moins performante qu'une 12V de marque pro. Ce qui compte, c'est le **couple en Newton-mètres** (vise 50 Nm minimum pour un usage polyvalent) et l'**ampérage de la batterie** en Ah, qui détermine l'autonomie et non la force.",
      },
      {
        titre: 'Percussion ou pas ?',
        contenu:
          "La percussion sert uniquement à percer les matériaux durs : béton, pierre, brique pleine. Si tu ne perces que du bois, du placo et du métal, elle est inutile et alourdit l'outil. En revanche, dès qu'il y a un mur porteur dans l'équation, elle devient indispensable — sans elle, tu brûles tes forets.",
      },
      {
        titre: 'Brushless : quand ça vaut le surcoût',
        contenu:
          "Un moteur brushless (sans charbon) chauffe moins, dure plus longtemps et consomme moins de batterie. Le surcoût tourne autour de 40 à 60 €. **Il se justifie si tu bricoles au moins une fois par mois.** Pour trois utilisations par an, le moteur à charbon tiendra largement.",
      },
      {
        titre: "Le vrai critère : l'écosystème de batteries",
        contenu:
          "C'est le point que personne ne regarde et qui coûte le plus cher à long terme. Une batterie représente 60 à 100 € pièce. Si tu comptes acheter d'autres outils sans fil dans les cinq ans, **choisis d'abord un système** (Ryobi ONE+, Makita LXT, Bosch Power for All, Einhell Power X-Change) puis l'outil dedans. Changer de système en cours de route, c'est racheter tout le parc de batteries.",
      },
      {
        titre: "Ce qu'il faut ignorer",
        contenu:
          "Le nombre de vitesses au-delà de deux, les LED d'éclairage (toutes équivalentes), les mallettes garnies d'accessoires bas de gamme, et les kits « 200 pièces » dont tu utiliseras six embouts.",
      },
    ],
  },
  {
    slug: 'scie-circulaire-ou-scie-sauteuse',
    titre: 'Scie circulaire ou scie sauteuse ?',
    description:
      "Deux outils souvent confondus qui ne font pas du tout le même travail. Comment choisir — ou savoir s'il faut les deux.",
    categorieSlug: 'sciage',
    intro:
      "La confusion coûte cher : beaucoup achètent une sauteuse en pensant couper des panneaux droits, puis passent des heures à rattraper des coupes bancales. Voici la règle simple.",
    sections: [
      {
        titre: 'La règle en une phrase',
        contenu:
          "**Circulaire = coupes droites, longues et rapides. Sauteuse = coupes courbes, découpes intérieures et travail fin.** Vouloir faire une coupe droite de deux mètres à la sauteuse, c'est possible, mais le résultat sera irrégulier quel que soit ton niveau.",
      },
      {
        titre: "Si tu ne peux en acheter qu'une",
        contenu:
          "Prends la **sauteuse** si tu fais surtout de la rénovation intérieure : découpes de plinthes, ouvertures dans un plan de travail, arrondis. Prends la **circulaire** si tu construis : terrasse, ossature, découpe de panneaux OSB ou de contreplaqué.",
      },
      {
        titre: 'Les critères qui changent le résultat',
        contenu:
          "Sur une circulaire : la **rigidité de la semelle** (une semelle qui vrille, c'est une coupe qui dévie) et la profondeur de coupe à 90°. Sur une sauteuse : le **mouvement pendulaire réglable**, qui permet d'aller vite dans le bois tendre et de ralentir pour un trait propre.",
      },
      {
        titre: 'La lame compte plus que la machine',
        contenu:
          "Une bonne lame sur une machine moyenne donne un meilleur résultat que l'inverse. Regarde le nombre de dents : **peu de dents = coupe rapide et grossière**, beaucoup de dents = coupe lente et propre. Prévois au minimum deux lames par machine, et change-les dès que la coupe force.",
      },
      {
        titre: 'Sécurité — le paragraphe à ne pas sauter',
        contenu:
          "La circulaire est l'outil le plus dangereux de cette liste, à cause du **rebond** : la lame se coince, la machine part vers l'arrière. Ne bloque jamais le carter de protection, cale toujours ta pièce, et tiens-toi hors de l'axe de la lame. Lunettes obligatoires sur les deux machines.",
      },
    ],
  },
  {
    slug: 'quelle-ponceuse-pour-quel-usage',
    titre: 'Quelle ponceuse pour quel usage ?',
    description:
      'Excentrique, vibrante, à bande, delta : chacune a un seul vrai domaine. Le guide pour ne pas se tromper.',
    categorieSlug: 'poncage-finition',
    intro:
      "Le ponçage fait 80 % du rendu final et c'est l'étape que tout le monde bâcle. Utiliser la mauvaise ponceuse laisse des marques que la peinture révélera impitoyablement.",
    sections: [
      {
        titre: 'Excentrique : le choix par défaut',
        contenu:
          "Le plateau tourne **et** oscille, ce qui empêche les marques circulaires. C'est la ponceuse polyvalente : meubles, portes, plans de travail, préparation avant peinture. Si tu n'en achètes qu'une, c'est celle-là.",
      },
      {
        titre: 'Vibrante : les angles et les grandes surfaces planes',
        contenu:
          "Plateau rectangulaire qui vibre sans tourner. Moins agressive que l'excentrique, elle atteint les angles droits — ce qu'un plateau rond ne fera jamais. Bien pour les murs enduits et les encadrements.",
      },
      {
        titre: 'À bande : le décapage lourd',
        contenu:
          "Très agressive, elle enlève beaucoup de matière très vite. Parquet, poutres, vieille peinture épaisse. **Attention : elle creuse le bois en quelques secondes d'inattention.** À réserver aux surfaces qui ont vraiment besoin d'être décapées.",
      },
      {
        titre: 'Delta : les recoins',
        contenu:
          'Petit plateau triangulaire pour les volets, les moulures, les barreaux de chaise. Un complément, jamais un outil principal.',
      },
      {
        titre: "L'aspiration : le critère qu'on regrette",
        contenu:
          "La poussière de ponçage est fine, elle s'infiltre partout et elle est nocive à l'inhalation. Une ponceuse **raccordable à un aspirateur** change complètement l'expérience — le simple bac à poussière intégré n'en capte qu'une fraction. Masque FFP2 dans tous les cas.",
      },
    ],
  },
  {
    slug: 'tondeuse-batterie-thermique-filaire',
    titre: 'Tondeuse : batterie, thermique ou filaire ?',
    description:
      'Le choix dépend presque uniquement de la surface de ton terrain. Voici les seuils.',
    categorieSlug: 'jardin-exterieur',
    intro:
      "Les trois technologies coexistent parce qu'elles répondent à des besoins différents. Le critère décisif n'est ni le prix ni la marque : c'est la surface à tondre.",
    sections: [
      {
        titre: 'Les seuils, simplement',
        contenu:
          "**Jusqu'à 300 m²** : filaire. Légère, pas chère, aucun entretien, et la rallonge reste gérable. **300 à 800 m²** : batterie, le meilleur compromis aujourd'hui, à condition d'accepter une seconde batterie au-delà de 500 m². **Plus de 800 m²** : thermique, ou autoportée si le terrain dépasse 1 500 m².",
      },
      {
        titre: "Ce que la batterie a vraiment changé",
        contenu:
          "Plus de vidange, plus de bougie, plus de carburant qui vieillit dans le bidon, démarrage immédiat, et un niveau sonore qui permet de tondre le dimanche matin sans fâcher les voisins. En contrepartie : autonomie limitée, et une batterie à remplacer au bout de 5 à 8 ans.",
      },
      {
        titre: "Le mulching, à comprendre avant d'acheter",
        contenu:
          "La tondeuse broie l'herbe finement et la laisse au sol comme engrais naturel. Plus de bac à vider, meilleure santé du gazon. **Mais** : il faut tondre plus souvent, et jamais sur herbe haute ou mouillée, sinon ça fait des paquets.",
      },
      {
        titre: 'Largeur de coupe et hauteur réglable',
        contenu:
          "Une largeur plus grande fait gagner du temps mais rend la machine plus lourde et moins maniable autour des massifs. Le **réglage centralisé de hauteur** (une seule manette au lieu de quatre roues à régler) est le petit luxe qui se remarque à chaque tonte.",
      },
    ],
  },
  {
    slug: 'premier-equipement-bricolage',
    titre: 'Premier équipement : par quoi commencer ?',
    description:
      "L'ordre d'achat qui évite de dépenser 800 € pour racheter les mêmes outils deux ans plus tard.",
    categorieSlug: 'percage-vissage',
    intro:
      "L'erreur classique est d'acheter un gros coffret « tout en un » en promotion. Deux ans plus tard, la moitié n'a jamais servi et l'autre moitié est à remplacer. Voici un ordre qui tient.",
    sections: [
      {
        titre: '1. Choisis un système de batteries, pas un outil',
        contenu:
          "C'est la décision structurante : tout le reste en découlera pendant dix ans. Regarde le catalogue complet de chaque marque avant de trancher — propose-t-elle aussi la tondeuse, le taille-haie, la ponceuse dont tu auras besoin plus tard ?",
      },
      {
        titre: '2. La perceuse-visseuse à percussion',
        contenu:
          "Elle couvre l'essentiel des besoins réels : monter, fixer, percer. Mets-y le budget, c'est celle que tu utiliseras le plus.",
      },
      {
        titre: '3. La scie sauteuse',
        contenu:
          'Le premier outil de coupe, le plus polyvalent et le moins dangereux. La circulaire viendra plus tard, quand tu auras un vrai projet de construction.',
      },
      {
        titre: '4. La ponceuse excentrique',
        contenu:
          "Dès que tu touches à de la rénovation de meuble ou de la peinture, elle devient indispensable et fait la différence entre un travail correct et un travail qui se voit.",
      },
      {
        titre: "Ce qu'il faut acheter en premier et qui ne coûte presque rien",
        contenu:
          "Avant tout outil électroportatif : des **lunettes de protection**, un **masque FFP2**, un **mètre de qualité**, un **niveau à bulle** et un **détecteur de métaux et câbles**. Ce dernier coûte une trentaine d'euros et évite de percer une canalisation ou une gaine électrique — le meilleur rapport sécurité/prix de toute la liste.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getCategorieBySlug(slug: string): Categorie | undefined {
  return categories.find(c => c.slug === slug);
}

export function getMarquesByCategorie(categorieSlug: string): Marque[] {
  return marques.filter(m => m.categorieSlugs.includes(categorieSlug));
}

export function getMarqueBySlug(slug: string): Marque | undefined {
  return marques.find(m => m.slug === slug);
}

export function getProduitsByMarque(marqueSlug: string): Produit[] {
  return produits.filter(p => p.marqueSlug === marqueSlug);
}

export function getProduitsByCategorie(categorieSlug: string): Produit[] {
  return produits.filter(p => p.categorieSlug === categorieSlug);
}

export function getProduitBySlug(slug: string): Produit | undefined {
  return produits.find(p => p.slug === slug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}

/**
 * Niveau de confiance éditoriale (0 à 1) affiché par le niveau à bulle.
 * Ce n'est pas une mesure : qualite/durabilite/fiabilite sont des poids de
 * tri interne fixés à la rédaction, jamais des résultats de test.
 */
export function niveauConfiance(p: Produit): number {
  return (p.qualite + p.durabilite + p.fiabilite) / 15;
}

export function getGuidesByCategorie(categorieSlug: string): Guide[] {
  return guides.filter(g => g.categorieSlug === categorieSlug);
}

// ─────────────────────────────────────────────────────────────────────────────
// Moteur de recommandation « Choix Express »
// ─────────────────────────────────────────────────────────────────────────────

const POIDS: Record<string, { qualite: number; durabilite: number; fiabilite: number }> = {
  qualite:    { qualite: 3, durabilite: 1, fiabilite: 1 },
  durabilite: { qualite: 1, durabilite: 3, fiabilite: 1.5 },
  equilibre:  { qualite: 1, durabilite: 1, fiabilite: 1 },
};

function scoreComposite(p: Produit, priorite: string): number {
  const w = POIDS[priorite] ?? POIDS.equilibre;
  return p.qualite * w.qualite + p.durabilite * w.durabilite + p.fiabilite * w.fiabilite;
}

export function recommanderChoixExpress(
  categorieSlug: string,
  budget: number,
  priorite: string,
): Produit | null {
  const pool = produits.filter(
    p => p.categorieSlug === categorieSlug && p.prixIndicatif <= budget,
  );
  if (pool.length === 0) return null;
  return pool.sort((a, b) => scoreComposite(b, priorite) - scoreComposite(a, priorite))[0];
}
