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
  {
    slug: 'dewalt',
    nom: 'Dewalt',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition'],
    description:
      "Marque de chantier par excellence : machines robustes, système de batteries 18V XR très large, coffrets TSTAK qui s'empilent et se transportent facilement. Le positionnement est clairement professionnel, prix compris.",
    positionnement: 'Le choix chantier, calibré pour un usage professionnel intensif',
  },
  {
    slug: 'stanley',
    nom: 'Stanley',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition'],
    description:
      "Marque grand public accessible. La gamme FatMax, plus robuste, tient un usage régulier ; le reste du catalogue vise surtout un usage occasionnel et ne prétend pas rivaliser avec les marques professionnelles sur la durée.",
    positionnement: "L'entrée de gamme sérieuse, à condition de rester sur la gamme FatMax",
  },
  {
    slug: 'facom',
    nom: 'Facom',
    categorieSlugs: ['percage-vissage', 'sciage', 'poncage-finition'],
    description:
      "Facom est d'abord un fabricant d'outillage à main et pneumatique pour ateliers et garages professionnels, pas un généraliste du bricolage. Sur ces catégories, attends-toi à des outils spécialisés (pneumatique, précision) plutôt qu'à des perceuses ou scies grand public classiques.",
    positionnement: 'Le spécialiste atelier/garage, pas le généraliste bricolage',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Produits
//
// Perçage-vissage, sciage et ponçage-finition sont alimentés par de vraies
// fiches ManoMano (export candidats-manomano.csv + candidats-einhell.csv,
// juillet 2026) : urlMarchand pointe vers une fiche produit reelle, verifie
// vaut donc true. Jardin-exterieur reste partiellement en placeholder pour
// Bosch/Makita/Ryobi (verifie: false) : ces marques n'ont pas encore ete
// fournies pour cette categorie.
//
// Quelques fiches du CSV ne collent qu'imparfaitement a leur categorie
// (meuleuse d'angle rangee en "ponçage-finition", scie-cloche montee sur
// perceuse rangee en "sciage", outil pneumatique qui suppose un compresseur,
// perceuse a colonne fixe plutot que portative). On les garde — elles sont
// reelles et vendues sous ce rayon chez ManoMano — mais chaque fiche le dit
// explicitement dans son "pourQui"/"contreQui", et leur score qualite/
// durabilite/fiabilite est volontairement bas pour qu'elles ne remportent
// jamais une recommandation Choix Express face a un outil generaliste.
// Les fiches qui n'avaient strictement aucun rapport avec leur categorie
// (caisse a outils a main, accessoire de support meuleuse en jardin, chariot
// d'etabli, banc pour scie a onglet) ont ete exclues plutot que forcees.
// `npm run check:produits` liste ce qui resterait a verifier.
// ─────────────────────────────────────────────────────────────────────────────

const rechercheManoMano = (q: string) =>
  `https://www.manomano.fr/recherche/${encodeURIComponent(q)}`;

export const produits: Produit[] = [
  // ── PERÇAGE & VISSAGE ──────────────────────────────────────────────────────
  {
    slug: 'bosch-percussion-500w-13mm',
    nom: 'Bosch Perceuse à percussion 500W 13mm',
    marqueSlug: 'bosch',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 97.11,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée de gamme Bosch 💸",
    pourQui: "Premier achat, montage de meubles, perçage occasionnel du bois et du placo.",
    contreQui: "Perçage béton répété ou usage quotidien — vise plutôt le segment au-dessus.",
    description:
      "Perceuse à percussion filaire 500 W, mandrin sans clé 13 mm, vitesse 50-300 tr/min. Basique et honnête pour un usage occasionnel.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37501174061&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'bosch-universalhammer-18v',
    nom: 'Bosch Marteau perforateur UniversalHammer 18V SDS-Plus',
    marqueSlug: 'bosch',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 184,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le bon compromis maison 💡',
    pourQui: "Perçage régulier dans le béton et la pierre, fixation de chevilles lourdes.",
    contreQui: "Si tu ne perces que du bois et du placo, la percussion SDS ne sert à rien.",
    description:
      "Marteau perforateur sans fil 18V, mandrin SDS-Plus, livré avec 2 batteries 2,5 Ah. Le format SDS encaisse mieux le béton qu'une percussion classique.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37285988546&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'bosch-gwb-12v-10',
    nom: 'Bosch GWB 12V-10 Perceuse-visseuse à percussion (2 batteries 6,0 Ah)',
    marqueSlug: 'bosch',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 347,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'Le compact costaud ⭐',
    pourQui: "Ceux qui veulent une machine 12V compacte mais avec une vraie autonomie (2x6,0 Ah).",
    contreQui: "Gros perçage béton en continu — une 18V SDS reste plus adaptée.",
    description:
      "Perceuse-visseuse à percussion 12V, fournie avec deux batteries 6,0 Ah et coffret L-Boxx. Le format 12V ne veut pas dire sous-motorisée : la capacité batterie compense largement.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37285709083&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-dhp458-lxt',
    nom: 'Makita DHP458 Perceuse à percussion 18V LXT (machine seule)',
    marqueSlug: 'makita',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 127.37,
    segment: 'moins_cher',
    qualite: 3, durabilite: 4, fiabilite: 4,
    verdict: "L'entrée dans l'écosystème LXT 💸",
    pourQui: "Ceux qui possèdent déjà des batteries LXT ou comptent investir dans le système.",
    contreQui: "Premier achat isolé : vendue machine seule, sans batterie ni chargeur.",
    description:
      "Perceuse à percussion 18V LXT vendue en solo. Le bon calcul si tu as déjà des batteries Makita ou si tu comptes construire ton parc d'outils autour de LXT.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=40227303052&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-tw007gz',
    nom: 'Makita TW007GZ Visseuse à choc 40V (760 Nm)',
    marqueSlug: 'makita',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 266.53,
    segment: 'milieu',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La puissance qui dépanne un garage 🔧',
    pourQui: "Boulonnage lourd, déblocage de vis grippées, travaux mécaniques.",
    contreQui: "Vissage courant de meubles ou de placo — 760 Nm est très surdimensionné.",
    description:
      "Visseuse à choc 40V, couple maximal 760 Nm, vendue machine seule. C'est un outil de déblocage/serrage lourd, pas une visseuse d'assemblage classique.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=38671745844&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-dhp486rt3j',
    nom: 'Makita DHP486RT3J Perceuse-visseuse à percussion 18V (2 batteries 5,0 Ah)',
    marqueSlug: 'makita',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 534,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La plus complète du lot ⭐',
    pourQui: "Usage intensif, chantiers répétés, envie de ne plus jamais changer de perceuse.",
    contreQui: "Un usage de quelques fois par an ne justifie pas cet investissement.",
    description:
      "Perceuse-visseuse à percussion brushless 18V, livrée avec 2 batteries 5,0 Ah. Le haut de la gamme LXT grand public, pensée pour tenir des années d'usage intensif.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37501206563&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-rpd500-gc',
    nom: 'Ryobi RPD500-GC Perceuse à percussion 500W',
    marqueSlug: 'ryobi',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 77.99,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Le prix plancher filaire 💸',
    pourQui: "Budget serré, perçage occasionnel du bois et du placo.",
    contreQui: "Béton ou usage fréquent — ça ne tiendra pas la distance.",
    description:
      "Perceuse à percussion filaire 500 W. Correcte pour du dépannage ponctuel, sans plus.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37490268323&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-rpd1200-k',
    nom: 'Ryobi RPD1200-K Perceuse à percussion 1200W',
    marqueSlug: 'ryobi',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 115.2,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Costaude en filaire 👍',
    pourQui: "Ceux qui préfèrent le filaire au sans-fil et perçent régulièrement.",
    contreQui: "Besoin de mobilité loin d'une prise — prends du sans-fil ONE+.",
    description:
      "Perceuse à percussion filaire 1200 W. Une puissance confortable pour qui ne veut pas gérer de batterie.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=35421894936&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-rdp102l',
    nom: 'Ryobi RDP102L Perceuse à colonne 5 vitesses 390W',
    marqueSlug: 'ryobi',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 211.21,
    segment: 'meilleur_rapport',
    qualite: 2, durabilite: 2, fiabilite: 2,
    verdict: "L'outil d'établi, pas de chantier",
    pourQui: "Perçage précis et répété de petites pièces posées sur un établi (métal, bois).",
    contreQui: "Percer un mur, une porte ou tout ce qui ne tient pas sous la colonne : impossible, elle est fixe.",
    description:
      "Perceuse à colonne stationnaire, 5 vitesses, 390 W. Ce n'est pas une perceuse portative : elle reste vissée à l'établi et ne remplace pas une perceuse-visseuse pour le bricolage courant.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=33089480265&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-d25133k',
    nom: 'Dewalt D25133K Perforateur SDS-Plus 800W (coffret)',
    marqueSlug: 'dewalt',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 138.24,
    segment: 'moins_cher',
    qualite: 3, durabilite: 4, fiabilite: 4,
    verdict: 'Le SDS filaire qui dure 💸',
    pourQui: "Perçage béton régulier sans vouloir gérer de batterie.",
    contreQui: "Besoin de mobilité totale loin d'une prise.",
    description:
      "Perforateur filaire SDS-Plus 800 W, 2,6 J de frappe, livré en coffret. Du filaire robuste, dans l'esprit chantier propre à Dewalt.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=40200181847&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dcf887p1t',
    nom: 'Dewalt DCF887P1T Visseuse à chocs 18V (1 batterie 5,0 Ah, coffret TSTAK)',
    marqueSlug: 'dewalt',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 263,
    segment: 'milieu',
    qualite: 4, durabilite: 5, fiabilite: 5,
    verdict: 'La visseuse de chantier 👍',
    pourQui: "Vissage intensif, ossature bois, fixation répétée sur chantier.",
    contreQui: "Usage domestique ponctuel — largement surdimensionnée.",
    description:
      "Visseuse à chocs brushless 18V, une batterie 5,0 Ah, coffret TSTAK empilable. Pensée pour un usage professionnel quotidien.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=42706601768&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dch253p3',
    nom: 'Dewalt DCH253P3 Perforateur 18V (3 batteries 5,0 Ah, coffret TSTAK)',
    marqueSlug: 'dewalt',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 506,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'Le perforateur pro complet ⭐',
    pourQui: "Chantiers réguliers, perçage béton intensif, besoin de ne jamais tomber en panne de batterie (3 fournies).",
    contreQui: "Usage occasionnel — l'investissement ne se justifie pas.",
    description:
      "Perforateur sans fil 18V, livré avec 3 batteries 5,0 Ah et coffret TSTAK. Le haut de gamme Dewalt pour qui perce du béton toute la semaine.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=44346198625&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-sfmcd711b',
    nom: 'Stanley FatMax SFMCD711B Perceuse à percussion 18V (machine seule)',
    marqueSlug: 'stanley',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 88,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée FatMax 💸",
    pourQui: "Premier achat, budget serré, usage occasionnel.",
    contreQui: "Vendue machine seule : il faudra batterie et chargeur en plus si tu n'es pas déjà équipé.",
    description:
      "Perceuse à percussion 18V de la gamme FatMax, vendue solo. Correcte pour du bricolage occasionnel.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37285696232&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-percussion-18v-brushless-80nm',
    nom: 'Stanley Perceuse à percussion 18V Brushless (80 Nm)',
    marqueSlug: 'stanley',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 107,
    segment: 'milieu',
    qualite: 4, durabilite: 3, fiabilite: 4,
    verdict: 'Le brushless accessible 💡',
    pourQui: "Bricoleur régulier qui veut un moteur brushless sans payer le prix des marques pro.",
    contreQui: "Usage professionnel quotidien.",
    description:
      "Perceuse à percussion 18V à moteur brushless, couple 80 Nm. Le brushless réduit l'échauffement sur les longues séries de vis, même à ce niveau de prix.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=30951424815&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-sfmcd720d2k',
    nom: 'Stanley FatMax SFMCD720D2K Perceuse-visseuse 18V (2 batteries 2,0 Ah)',
    marqueSlug: 'stanley',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 178.93,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le kit complet FatMax ⭐',
    pourQui: "Ceux qui veulent tout de suite un kit prêt à l'emploi (2 batteries incluses).",
    contreQui: "Perçage béton intensif — vise une machine SDS chez une marque pro.",
    description:
      "Perceuse-visseuse à percussion 18V FatMax, livrée avec 2 batteries 2,0 Ah. Le kit le plus complet de la gamme Stanley pour démarrer sans rien acheter en plus.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=29410187845&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-visseuse-usb',
    nom: 'Facom Visseuse électrique USB (0,9 Nm)',
    marqueSlug: 'facom',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 98.65,
    segment: 'moins_cher',
    qualite: 2, durabilite: 2, fiabilite: 3,
    verdict: 'Un outil de précision, pas de bricolage',
    pourQui: "Petit électroménager, lunettes, électronique — du vissage très léger et calibré.",
    contreQui: "Monter un meuble ou fixer une cheville : 0,9 Nm n'a aucune force pour ça.",
    description:
      "Visseuse électrique rechargeable en USB, couple maximal 0,9 Nm. C'est un outil de précision pour petites vis, pas une visseuse de bricolage général.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37501241038&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-visseuse-dynamometrique-a341mt',
    nom: 'Facom A.341MT Visseuse dynamométrique (15,75 cNm)',
    marqueSlug: 'facom',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 222.56,
    segment: 'milieu',
    qualite: 2, durabilite: 3, fiabilite: 3,
    verdict: "Un outil d'atelier calibré, pas une visseuse maison",
    pourQui: "Assemblage de précision où le couple de serrage doit être exact et répétable.",
    contreQui: "Bricolage courant : 15,75 cNm (soit 0,1575 Nm) est sans commune mesure avec une vis à bois classique.",
    description:
      "Visseuse dynamométrique calibrée, couple maximal 15,75 cNm. Un outil de contrôle qualité en atelier, pas une visseuse pour meubles ou cloisons.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=44088220974&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-ns1600fpb',
    nom: 'Facom NS.1600FPB Visseuse à choc pneumatique',
    marqueSlug: 'facom',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 256.45,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "L'outil garage, pas maison 🔧",
    pourQui: "Déblocage et serrage de roues ou de boulonnerie lourde, si tu as déjà un compresseur.",
    contreQui: "Pas de compresseur à la maison ? Cet outil est inutilisable : il fonctionne à l'air comprimé, pas sur batterie.",
    description:
      "Visseuse à choc pneumatique, alimentée par air comprimé. Un outil de garage/atelier classique chez les mécaniciens, à condition de disposer d'un compresseur.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=38089843647&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'einhell-cc-iw-9501',
    nom: 'Einhell CC-IW 950/1 Visseuse à chocs filaire (450 Nm)',
    marqueSlug: 'einhell',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 74.95,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée de gamme honnête 💸",
    pourQui: "Déblocage occasionnel de vis ou boulons grippés, sans investir dans du pneumatique.",
    contreQui: "Vissage d'assemblage courant — ce n'est pas l'usage d'une visseuse à chocs.",
    description:
      "Visseuse à chocs filaire 950 W, couple maximal 450 Nm. Alternative électrique au pneumatique pour du déblocage ponctuel.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/cle-a-chocs-1181?model_id=73713300',
    verifie: true,
  },
  {
    slug: 'einhell-te-cd-18-li-brushless',
    nom: 'Einhell TE-CD 18 Li Brushless Perceuse-visseuse 18V (solo)',
    marqueSlug: 'einhell',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 110.39,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le brushless Power X-Change 💡',
    pourQui: "Ceux qui ont déjà des batteries Power X-Change ou comptent construire leur parc autour du système.",
    contreQui: "Vendue solo, sans batterie ni chargeur.",
    description:
      "Perceuse-visseuse brushless 18V, système Power X-Change, vendue machine seule. Le moteur brushless est un vrai plus à ce niveau de prix.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-visseuse-perceuse-te-cd-18li-brushless-sans-batterie-ni-chargeur-3037708?model_id=3037708',
    verifie: true,
  },
  {
    slug: 'einhell-tp-hd-18-26-li-bl',
    nom: 'Einhell TP-HD 18/26 Li BL Marteau perforateur 18V Professional (solo)',
    marqueSlug: 'einhell',
    categorieSlug: 'percage-vissage',
    prixIndicatif: 189.95,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'La gamme Professional qui monte en gamme ⭐',
    pourQui: "Perçage béton régulier, déjà équipé en batteries Power X-Change.",
    contreQui: "Vendue solo — prévois le budget batterie et chargeur si ce n'est pas déjà le cas.",
    description:
      "Marteau perforateur sans fil SDS-Plus, gamme Professional, système Power X-Change 18V. La ligne Professional d'Einhell vise un cran au-dessus du grand public habituel de la marque.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/marteau-herocco-tp-hd-1826-li-bl-solo-einhell-69915166?model_id=73713309',
    verifie: true,
  },

  // ── SCIAGE ─────────────────────────────────────────────────────────────────
  {
    slug: 'bosch-pks-40',
    nom: 'Bosch PKS 40 Scie circulaire filaire',
    marqueSlug: 'bosch',
    categorieSlug: 'sciage',
    prixIndicatif: 81.94,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée de gamme suffisante 💸",
    pourQui: "Découpes ponctuelles de panneaux ou de bois tendre.",
    contreQui: "Découpe quotidienne ou bois dur — vise un modèle plus haut de gamme.",
    description:
      "Scie circulaire filaire d'entrée de gamme. Fait le travail sur des coupes simples et occasionnelles.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37501003068&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'bosch-scie-trepan-power-change-140',
    nom: 'Bosch Scie trépan Power Change Ø140mm',
    marqueSlug: 'bosch',
    categorieSlug: 'sciage',
    prixIndicatif: 174.34,
    segment: 'milieu',
    qualite: 2, durabilite: 3, fiabilite: 3,
    verdict: "Un accessoire de perceuse, pas une scie",
    pourQui: "Percer un trou rond net de 140 mm (passage de gaine, spot encastré) avec une perceuse existante.",
    contreQui: "Couper une planche ou un panneau : ce n'est pas une scie autonome, elle se monte sur le mandrin d'une perceuse.",
    description:
      "Scie-cloche (trépan) système Power Change, Ø140 mm. Un accessoire qui se fixe sur une perceuse pour découper des trous ronds — pas une scie à part entière.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=44346267564&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'bosch-gks-18v-57',
    nom: 'Bosch GKS 18V-57 Scie circulaire (1 batterie 5,0 Ah, coffret L-Boxx)',
    marqueSlug: 'bosch',
    categorieSlug: 'sciage',
    prixIndicatif: 385,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'La circulaire sans fil de référence ⭐',
    pourQui: "Découpe régulière de panneaux et de bastaings, sans contrainte de rallonge.",
    contreQui: "Budget serré ou usage très occasionnel — largement surdimensionnée.",
    description:
      "Scie circulaire sans fil 18V, livrée avec batterie 5,0 Ah et coffret L-Boxx. La mobilité du sans-fil sur une machine qui garde une vraie puissance de coupe.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=39338335144&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-hs7611',
    nom: 'Makita HS7611 Scie circulaire 1600W 190mm',
    marqueSlug: 'makita',
    categorieSlug: 'sciage',
    prixIndicatif: 163.48,
    segment: 'moins_cher',
    qualite: 3, durabilite: 4, fiabilite: 4,
    verdict: 'La filaire increvable 💸',
    pourQui: "Découpe régulière de panneaux, sans besoin de mobilité batterie.",
    contreQui: "Besoin de couper loin d'une prise électrique.",
    description:
      "Scie circulaire filaire 1600 W, lame 190 mm. Une valeur sûre Makita à un prix contenu, pour qui n'a pas besoin du sans-fil.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37513394451&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-mlt100n',
    nom: 'Makita MLT100N Scie sur table 1500W Ø260mm',
    marqueSlug: 'makita',
    categorieSlug: 'sciage',
    prixIndicatif: 580.05,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 4,
    verdict: "L'atelier fixe ⭐",
    pourQui: "Débit régulier de panneaux et de bois en atelier, coupes longues et précises.",
    contreQui: "Chantier mobile ou petit espace de stockage : c'est une machine fixe encombrante.",
    description:
      "Scie sur table stationnaire, 1500 W, lame Ø260 mm. Une machine d'atelier, pas un outil portatif — pense à l'espace nécessaire avant d'acheter.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=41467408559&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-rcs1400-g',
    nom: 'Ryobi RCS1400-G Scie circulaire 1400W 66mm',
    marqueSlug: 'ryobi',
    categorieSlug: 'sciage',
    prixIndicatif: 104.49,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Le prix contenu 💸',
    pourQui: "Découpes occasionnelles de panneaux ou de bois tendre.",
    contreQui: "Usage intensif ou bois dur répété.",
    description:
      "Scie circulaire filaire 1400 W, profondeur de coupe 66 mm. Correcte pour un usage occasionnel.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=24324883503&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-rcs1600-ksr',
    nom: 'Ryobi RCS1600-KSR Scie circulaire 1600W 66mm (2 guides de coupe)',
    marqueSlug: 'ryobi',
    categorieSlug: 'sciage',
    prixIndicatif: 168.43,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Bien équipée pour le prix 👍',
    pourQui: "Découpes régulières, avec deux guides de coupe fournis pour des lignes propres.",
    contreQui: "Coupe de précision répétée en atelier — vise une machine sur table.",
    description:
      "Scie circulaire filaire 1600 W, livrée avec deux guides de coupe. Un bon niveau d'équipement pour le prix.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37489842570&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-rbs250g',
    nom: 'Ryobi RBS250G Scie à ruban stationnaire 250W 228mm',
    marqueSlug: 'ryobi',
    categorieSlug: 'sciage',
    prixIndicatif: 316.88,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "L'option atelier ⭐",
    pourQui: "Découpes courbes ou de précision en atelier, notamment sur bois épais.",
    contreQui: "Chantier mobile : c'est une machine stationnaire.",
    description:
      "Scie à ruban stationnaire 250 W, largeur de passage 228 mm. Utile pour des coupes que ni la circulaire ni la sauteuse ne font aussi proprement.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37350368534&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dcs331n',
    nom: 'Dewalt DCS331N Scie sauteuse 18V (machine seule)',
    marqueSlug: 'dewalt',
    categorieSlug: 'sciage',
    prixIndicatif: 169.8,
    segment: 'moins_cher',
    qualite: 3, durabilite: 4, fiabilite: 4,
    verdict: "L'entrée chantier 💸",
    pourQui: "Ceux déjà équipés en batteries Dewalt 18V XR.",
    contreQui: "Premier achat isolé — vendue machine seule.",
    description:
      "Scie sauteuse sans fil 18V, vendue solo. Le point d'entrée dans l'écosystème Dewalt si tu as déjà des batteries XR.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=33591007731&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dcs334p1t',
    nom: 'Dewalt DCS334P1T Scie sauteuse 18V (1 batterie 5,0 Ah, coffret TSTAK)',
    marqueSlug: 'dewalt',
    categorieSlug: 'sciage',
    prixIndicatif: 319,
    segment: 'milieu',
    qualite: 4, durabilite: 5, fiabilite: 5,
    verdict: 'La sauteuse de chantier 👍',
    pourQui: "Découpes courbes répétées sur chantier, besoin de fiabilité au quotidien.",
    contreQui: "Usage domestique ponctuel — surdimensionnée pour ce cas.",
    description:
      "Scie sauteuse sans fil 18V, une batterie 5,0 Ah, coffret TSTAK. Pensée pour encaisser un usage professionnel répété.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=27941067123&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dcs365p2',
    nom: "Dewalt DCS365P2 Scie à onglet radiale 18V Ø184mm (2 batteries 5,0 Ah)",
    marqueSlug: 'dewalt',
    categorieSlug: 'sciage',
    prixIndicatif: 770.57,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: "La précision d'atelier sans fil ⭐",
    pourQui: "Coupes d'onglet précises et répétées : encadrements, plinthes, moulures.",
    contreQui: "Besoin ponctuel ou budget serré — c'est le haut de la gamme.",
    description:
      "Scie à onglet radiale sans fil 18V, lame Ø184 mm, livrée avec 2 batteries 5,0 Ah. Une machine d'atelier pour des coupes d'angle nettes et répétables, avec la mobilité du sans-fil en plus.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=41437002293&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-fme301-qs',
    nom: 'Stanley FatMax FME301-QS Scie circulaire 190mm 1650W',
    marqueSlug: 'stanley',
    categorieSlug: 'sciage',
    prixIndicatif: 120.4,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée FatMax 💸",
    pourQui: "Découpes occasionnelles de panneaux ou de bois tendre.",
    contreQui: "Usage intensif ou bois dur répété.",
    description:
      "Scie circulaire filaire 1650 W, lame 190 mm, gamme FatMax. Correcte pour un usage occasionnel à budget contenu.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=36115207181&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-scie-onglet-18v-sans-fil',
    nom: 'Stanley Scie à onglet 18V sans fil (3800 tr/min)',
    marqueSlug: 'stanley',
    categorieSlug: 'sciage',
    prixIndicatif: 330,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "L'onglet sans fil accessible ⭐",
    pourQui: "Coupes d'onglet ponctuelles pour plinthes ou moulures, sans vouloir investir dans une marque pro.",
    contreQui: "Usage professionnel quotidien — préfère une machine filaire dédiée.",
    description:
      "Scie à onglet sans fil 18V, moteur à 3800 tr/min. Une alternative sans fil pour des coupes d'angle occasionnelles.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=41234184723&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-monture-scie-metaux-603e',
    nom: 'Facom Monture de scie à métaux 300mm (aluminium) — outil manuel',
    marqueSlug: 'facom',
    categorieSlug: 'sciage',
    prixIndicatif: 112.59,
    segment: 'moins_cher',
    qualite: 2, durabilite: 3, fiabilite: 3,
    verdict: 'Un outil à main, pas électroportatif',
    pourQui: "Coupe manuelle de tubes ou profilés métalliques — aucune motorisation.",
    contreQui: "Chercher une scie électrique : celle-ci fonctionne uniquement à la force du bras.",
    description:
      "Monture de scie à métaux manuelle en aluminium, 300 mm. Un outil à main classique d'atelier, à ne pas confondre avec les scies électroportatives du reste de cette sélection.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=41911583716&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-monture-scie-metaux-603fpb',
    nom: 'Facom Monture de scie à métaux 603FPB — outil manuel',
    marqueSlug: 'facom',
    categorieSlug: 'sciage',
    prixIndicatif: 112.59,
    segment: 'milieu',
    qualite: 2, durabilite: 3, fiabilite: 3,
    verdict: 'Un outil à main, pas électroportatif',
    pourQui: "Coupe manuelle de tubes ou profilés métalliques — aucune motorisation.",
    contreQui: "Chercher une scie électrique : celle-ci fonctionne uniquement à la force du bras.",
    description:
      "Monture de scie à métaux manuelle. Même famille d'outil que la référence 603E ci-dessus, en version un peu différente.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=43262758837&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'einhell-tc-js-90',
    nom: 'Einhell TC-JS 90 Scie sauteuse pendulaire 650W',
    marqueSlug: 'einhell',
    categorieSlug: 'sciage',
    prixIndicatif: 79.95,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'entrée de gamme honnête 💸",
    pourQui: "Découpes courbes occasionnelles, petits travaux de rénovation.",
    contreQui: "Usage intensif ou bois épais — la machine peine vite.",
    description:
      "Scie sauteuse filaire 650 W, pendulaire réglable, semelle inclinable à 45°, soufflerie de dégagement des poussières. Un bon niveau d'équipement pour le prix.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-scie-sauteuse-pendulaire-tc-js-90-650-w-variateur-electronique-semelle-inclinable-45-fonction-soufflage-des-poussieres-87310886?model_id=92691763',
    verifie: true,
  },
  {
    slug: 'einhell-tp-cs-18-165-li-bl',
    nom: 'Einhell TP-CS 18/165 Li BL Scie circulaire 18V Professional (solo)',
    marqueSlug: 'einhell',
    categorieSlug: 'sciage',
    prixIndicatif: 149.95,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le brushless de la gamme Professional 💡',
    pourQui: "Ceux déjà équipés en batteries Power X-Change, qui veulent la mobilité du sans-fil.",
    contreQui: "Vendue solo — prévois batterie et chargeur si ce n'est pas déjà le cas.",
    description:
      "Scie circulaire sans fil 18V brushless, profondeur de coupe 59 mm, LED intégrée. La gamme Professional d'Einhell, un cran au-dessus du grand public habituel.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-scie-circulaire-sans-fil-tp-cs-18165-li-bl-solo-18v-brushless-coupe-59mm-led-integree-sans-batteriechargeur-87414345?model_id=92859545',
    verifie: true,
  },
  {
    slug: 'einhell-tc-sb-245-l',
    nom: 'Einhell TC-SB 245 L Scie à ruban 400W',
    marqueSlug: 'einhell',
    categorieSlug: 'sciage',
    prixIndicatif: 314.95,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "L'option atelier accessible ⭐",
    pourQui: "Découpes courbes ou de précision en atelier, budget plus mesuré qu'une marque pro.",
    contreQui: "Chantier mobile : c'est une machine stationnaire.",
    description:
      "Scie à ruban 400 W, vitesse jusqu'à 726 m/min, largeur de passage 245 mm. Une alternative plus abordable aux scies à ruban de marques professionnelles.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/scie-bande-tc-sb-245-l-52068697?model_id=90180565',
    verifie: true,
  },

  // ── PONÇAGE & FINITION ─────────────────────────────────────────────────────
  {
    slug: 'bosch-easycut-grind',
    nom: 'Bosch EasyCut&Grind Mini meuleuse',
    marqueSlug: 'bosch',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 91.1,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "Un multi-outil de découpe/meulage, pas une ponceuse",
    pourQui: "Petites découpes et ébarbages ponctuels sur du métal ou du carrelage.",
    contreQui: "Poncer du bois ou une surface à peindre : ce n'est pas sa fonction, prends une excentrique.",
    description:
      "Mini meuleuse compacte EasyCut&Grind. Utile pour de petits travaux de découpe et de meulage, à ne pas confondre avec une ponceuse pour le bois.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37489720634&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'bosch-gex-125-1-ae',
    nom: 'Bosch GEX 125-1 AE Ponceuse excentrique 250W Ø125mm',
    marqueSlug: 'bosch',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 171.26,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'La ponceuse polyvalente 👍',
    pourQui: "Rénovation de meubles, préparation avant peinture.",
    contreQui: "Décapage lourd — il faut une ponceuse à bande.",
    description:
      "Ponceuse excentrique filaire 250 W, plateau Ø125 mm. Le choix par défaut pour un ponçage sans marques circulaires.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=43515005561&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'bosch-gws12v-76',
    nom: "Bosch GWS12V-76 Meuleuse d'angle 12V Ø76mm (3,0 Ah)",
    marqueSlug: 'bosch',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 310.14,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 5,
    verdict: "La meuleuse compacte pour la finition métal",
    pourQui: "Ébarbage, tronçonnage léger et travaux de finition sur métal, en complément d'une ponceuse bois.",
    contreQui: "Poncer du bois ou une surface à peindre : ce n'est pas une ponceuse, c'est une meuleuse d'angle.",
    description:
      "Meuleuse d'angle sans fil 12V, disque Ø76 mm, avec batterie 3,0 Ah. Un bon complément pour la finition métal, mais elle ne remplace pas une ponceuse pour le bois.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=44157324630&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-dbo180z',
    nom: 'Makita DBO180Z Ponceuse excentrique 18V LXT Ø125mm (solo)',
    marqueSlug: 'makita',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 115.65,
    segment: 'moins_cher',
    qualite: 3, durabilite: 4, fiabilite: 4,
    verdict: "L'entrée dans l'écosystème LXT 💸",
    pourQui: "Ceux qui possèdent déjà des batteries LXT.",
    contreQui: "Premier achat isolé : vendue machine seule.",
    description:
      "Ponceuse excentrique sans fil 18V LXT, plateau Ø125 mm, vendue solo. Sans fil, donc pas de rallonge qui traîne dans la poussière — à condition d'avoir déjà des batteries.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=43782105828&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-dga519z',
    nom: "Makita DGA519Z Meuleuse d'angle 18V LXT Ø125mm (solo)",
    marqueSlug: 'makita',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 204.14,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "Le complément finition métal 💡",
    pourQui: "Ébarbage et tronçonnage léger sur métal, en complément d'une ponceuse bois.",
    contreQui: "Poncer du bois : ce n'est pas sa fonction.",
    description:
      "Meuleuse d'angle sans fil 18V LXT, disque Ø125 mm, vendue solo. Un complément pour la finition métal plutôt qu'une ponceuse à proprement parler.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37501041561&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'makita-dga517rfj',
    nom: "Makita DGA517RFJ Meuleuse d'angle 18V LXT Ø125mm (2 batteries 3,0 Ah)",
    marqueSlug: 'makita',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 374.52,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: "Le kit finition métal complet ⭐",
    pourQui: "Usage régulier d'ébarbage ou de tronçonnage métal, avec deux batteries pour ne jamais s'arrêter.",
    contreQui: "Poncer du bois : ce n'est pas sa fonction, prends une excentrique.",
    description:
      "Meuleuse d'angle sans fil 18V LXT, disque Ø125 mm, livrée avec 2 batteries 3,0 Ah. Le haut de gamme Makita pour la finition métal, pas pour le ponçage bois.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=41024636092&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-ros300',
    nom: 'Ryobi ROS300 Ponceuse excentrique 300W Ø125mm (pack)',
    marqueSlug: 'ryobi',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 72.36,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Le prix plancher 💸',
    pourQui: "Une porte à repeindre, un meuble à reprendre.",
    contreQui: "Usage régulier — le moteur montre vite ses limites.",
    description:
      "Ponceuse excentrique filaire 300 W, plateau Ø125 mm, vendue en pack. Fait le travail sur de petites surfaces.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=35652814447&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-eag2000g',
    nom: "Ryobi EAG2000G Meuleuse d'angle 2000W Ø230mm",
    marqueSlug: 'ryobi',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 115.61,
    segment: 'milieu',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'La grosse meuleuse filaire',
    pourQui: "Tronçonnage et ébarbage de métal ou de matériaux durs, gros disque 230 mm.",
    contreQui: "Poncer du bois : aucun rapport, c'est une meuleuse.",
    description:
      "Meuleuse d'angle filaire 2000 W, disque Ø230 mm. Un outil de meulage/tronçonnage puissant, pas une ponceuse.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37489798510&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'ryobi-eag2000rs',
    nom: "Ryobi EAG2000RS Meuleuse d'angle 2000W Ø230mm",
    marqueSlug: 'ryobi',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 129.99,
    segment: 'meilleur_rapport',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'La grosse meuleuse filaire, version affinée',
    pourQui: "Tronçonnage et ébarbage de métal ou de matériaux durs, gros disque 230 mm.",
    contreQui: "Poncer du bois : aucun rapport, c'est une meuleuse.",
    description:
      "Meuleuse d'angle filaire 2000 W, disque Ø230 mm, variante de l'EAG2000G ci-dessus. Un outil de meulage/tronçonnage, pas une ponceuse.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=34519636165&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dwe4203',
    nom: "Dewalt DWE4203 Meuleuse d'angle 1010W Ø125mm",
    marqueSlug: 'dewalt',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 116.11,
    segment: 'moins_cher',
    qualite: 3, durabilite: 4, fiabilite: 4,
    verdict: "L'entrée chantier pour la finition métal 💸",
    pourQui: "Ébarbage et tronçonnage léger, budget contenu.",
    contreQui: "Poncer du bois : ce n'est pas une ponceuse.",
    description:
      "Meuleuse d'angle filaire 1010 W, disque Ø125 mm. Correcte pour de la finition métal occasionnelle.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=43294641125&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dcg406nt',
    nom: "Dewalt DCG406NT Meuleuse d'angle 18V Ø125mm (solo)",
    marqueSlug: 'dewalt',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 195.67,
    segment: 'milieu',
    qualite: 4, durabilite: 5, fiabilite: 5,
    verdict: 'Le sans-fil chantier 👍',
    pourQui: "Ébarbage et tronçonnage régulier sur chantier, déjà équipé en batteries Dewalt.",
    contreQui: "Poncer du bois : ce n'est pas sa fonction. Vendue solo en plus.",
    description:
      "Meuleuse d'angle sans fil 18V, disque Ø125 mm, interrupteur à palette, vendue machine seule. Pensée pour un usage professionnel répété.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37500973687&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'dewalt-dcg405h2t-qw',
    nom: "Dewalt DCG405H2T-QW Meuleuse d'angle 18V Ø125mm (2 batteries 5,0 Ah)",
    marqueSlug: 'dewalt',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 421.72,
    segment: 'meilleur_rapport',
    qualite: 5, durabilite: 5, fiabilite: 5,
    verdict: 'Le kit finition métal le plus complet ⭐',
    pourQui: "Usage professionnel intensif d'ébarbage ou de tronçonnage, kit complet avec 2 batteries.",
    contreQui: "Poncer du bois ou usage occasionnel — largement surdimensionnée.",
    description:
      "Meuleuse d'angle sans fil 18V, disque Ø125 mm, livrée avec 2 batteries 5,0 Ah. Le haut de gamme Dewalt pour la finition métal.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=35434435780&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-meuleuse-850w-125mm',
    nom: "Stanley Meuleuse d'angle 850W Ø125mm (avec mallette)",
    marqueSlug: 'stanley',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 74.9,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Le prix plancher pour la finition métal 💸',
    pourQui: "Ébarbage occasionnel, budget très serré.",
    contreQui: "Poncer du bois : ce n'est pas sa fonction.",
    description:
      "Meuleuse d'angle filaire 850 W, disque Ø125 mm, livrée en mallette. Fait le travail sur de petits travaux occasionnels de finition métal.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=30867610523&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-touret-meuler-330w',
    nom: 'Stanley Meuleuse-polisseuse sur touret Ø150mm 330W',
    marqueSlug: 'stanley',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 149,
    segment: 'milieu',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: "L'outil d'établi pour affûter et polir",
    pourQui: "Affûtage d'outils, polissage, posé fixe sur un établi.",
    contreQui: "Ponçage mobile de bois ou de meubles : c'est une machine fixe, pas portative.",
    description:
      "Touret à meuler/polir stationnaire, Ø150 mm, base en fonte, 330 W. Un outil d'établi pour affûter et polir, pas une ponceuse portative.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=37730719623&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'stanley-sfmcg400m2k-qw',
    nom: "Stanley SFMCG400M2K-QW Meuleuse d'angle 18V (2 batteries 4,0 Ah)",
    marqueSlug: 'stanley',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 228,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le kit sans fil complet ⭐',
    pourQui: "Ébarbage régulier sans vouloir tirer de rallonge, kit complet avec 2 batteries.",
    contreQui: "Poncer du bois : ce n'est pas sa fonction.",
    description:
      "Meuleuse d'angle sans fil 18V, livrée avec 2 batteries 4,0 Ah. Le haut de gamme Stanley pour la finition métal.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=34337940861&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-meuleuse-droite-v345fpb',
    nom: 'Facom V.345FPB Meuleuse droite pneumatique 20 000 tr/min',
    marqueSlug: 'facom',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 106.42,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Un outil de garage, pas de maison',
    pourQui: "Ébavurage et finition de précision en atelier, si tu as déjà un compresseur.",
    contreQui: "Pas de compresseur ? Cette machine fonctionne à l'air comprimé, elle est inutilisable sans.",
    description:
      "Meuleuse droite pneumatique, 20 000 tr/min. Un outil d'atelier classique chez les mécaniciens, à condition de disposer d'air comprimé.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=38678521014&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-ponceuse-pneumatique-bande',
    nom: 'Facom Ponceuse pneumatique à bande 10×330mm',
    marqueSlug: 'facom',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 178.13,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "La vraie ponceuse de la gamme Facom 👍",
    pourQui: "Ponçage de précision en atelier, si tu as déjà un compresseur.",
    contreQui: "Pas de compresseur à la maison — cette ponceuse ne fonctionne qu'à l'air comprimé.",
    description:
      "Ponceuse à bande pneumatique 10×330 mm, vitesse 16 000 tr/min. Contrairement aux meuleuses de cette sélection, c'est une vraie ponceuse — mais elle suppose un compresseur d'atelier.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=42679458877&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'facom-meuleuse-angle-pneumatique',
    nom: "Facom Meuleuse d'angle pneumatique 18 000 tr/min",
    marqueSlug: 'facom',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 204.64,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: "L'outil de garage haut de gamme",
    pourQui: "Ébarbage et tronçonnage de précision en atelier, si tu as déjà un compresseur.",
    contreQui: "Poncer du bois, ou ne pas avoir de compresseur : dans les deux cas, ce n'est pas l'outil.",
    description:
      "Meuleuse d'angle pneumatique, 18 000 tr/min. Le haut de la gamme Facom pour la finition métal en atelier équipé d'air comprimé.",
    marchand: 'manomano',
    urlMarchand: 'https://www.awin1.com/pclick.php?p=26277739869&a=3007871&m=17547',
    verifie: true,
  },
  {
    slug: 'einhell-te-os-18-113-3x',
    nom: 'Einhell TE-OS 18/113 3X Li Ponceuse vibrante 18V (solo, 3 plateaux)',
    marqueSlug: 'einhell',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 77.95,
    segment: 'moins_cher',
    qualite: 3, durabilite: 3, fiabilite: 3,
    verdict: 'Le sans-fil polyvalent 💸',
    pourQui: "Ponçage de finition avec plusieurs formes de plateaux, angles compris.",
    contreQui: "Décapage lourd — une ponceuse à bande fera ça bien plus vite.",
    description:
      "Ponceuse vibrante sans fil, livrée avec 3 plateaux interchangeables, système Power X-Change. Vendue solo, sans batterie ni chargeur.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-ponceuse-vibrante-sans-fil-avec-3-plateaux-interchangeables-te-os-18113-3x-li-solo-power-x-change-18-v-circuit-doscillation-de-18-mm-livre-sans-batterie-ni-chargeur-84642171?model_id=89716179',
    verifie: true,
  },
  {
    slug: 'einhell-te-rs-18-li-kit',
    nom: 'Einhell TE-RS 18 Li Kit Ponceuse excentrique 18V (1 batterie 4,0 Ah)',
    marqueSlug: 'einhell',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 112.13,
    segment: 'milieu',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le kit prêt à poncer 💡',
    pourQui: "Rénovation de meubles, préparation avant peinture, sans rien acheter en plus (batterie incluse).",
    contreQui: "Décapage lourd — il faut une ponceuse à bande.",
    description:
      "Ponceuse excentrique sans fil 18V, livrée avec une batterie 4,0 Ah. Le kit est complet, contrairement à beaucoup de références sans fil vendues solo.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/ponceuse-excentrique-1195?model_id=87179309',
    verifie: true,
  },
  {
    slug: 'einhell-tp-ag-18-125-ce-q-li-kit',
    nom: "Einhell TP-AG 18/125 CE Q Li Kit Meuleuse d'angle 18V Professional (1 batterie 4,0 Ah)",
    marqueSlug: 'einhell',
    categorieSlug: 'poncage-finition',
    prixIndicatif: 187.4,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 4, fiabilite: 4,
    verdict: 'Le kit finition métal Professional ⭐',
    pourQui: "Ébarbage et tronçonnage régulier, kit complet avec batterie fournie.",
    contreQui: "Poncer du bois : ce n'est pas sa fonction, prends plutôt la TE-RS 18 Li ci-dessus.",
    description:
      "Meuleuse d'angle sans fil 18V, gamme Professional, disque Ø125 mm, livrée avec une batterie 4,0 Ah. Un complément pour la finition métal, pas une ponceuse.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-professional-meuleuse-dangle-sans-fil-tp-ag-18125-ce-q-li-kit-1x-40-ah-84367605?model_id=89413849',
    verifie: true,
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
    slug: 'einhell-ruban-magnetique-robot-tondeuse',
    nom: 'Einhell Ruban magnétique pour robot-tondeuse (lot de 4×5m) — accessoire',
    marqueSlug: 'einhell',
    categorieSlug: 'jardin-exterieur',
    prixIndicatif: 76.21,
    segment: 'milieu',
    qualite: 1, durabilite: 2, fiabilite: 2,
    verdict: "Un accessoire, pas un outil de jardin en soi",
    pourQui: "Ceux qui possèdent déjà un robot-tondeuse Freelexo et doivent délimiter une nouvelle zone.",
    contreQui: "Chercher un outil de jardin autonome : ce n'est qu'un ruban de délimitation, inutile sans robot-tondeuse compatible.",
    description:
      "Ruban magnétique de délimitation pour robot-tondeuse, lot de 4×5 m avec crochets. Un accessoire complémentaire, pas un outil de jardinage à part entière.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-ruban-magnetique-pour-robot-tondeuse-lot-de-4-x-5-m-delimitation-de-zone-pour-freelexo-cam-20-crochets-inclus-72307169?model_id=76188403',
    verifie: true,
  },
  {
    slug: 'einhell-picobella-nettoyeur',
    nom: 'Einhell Picobella Nettoyeur multi-surfaces sans fil 18V (solo)',
    marqueSlug: 'einhell',
    categorieSlug: 'jardin-exterieur',
    prixIndicatif: 119.95,
    segment: 'meilleur_rapport',
    qualite: 4, durabilite: 3, fiabilite: 3,
    verdict: "L'entretien terrasse et mobilier extérieur ⭐",
    pourQui: "Nettoyage de terrasse, mobilier de jardin, surfaces extérieures sans jet haute pression.",
    contreQui: "Tondre ou tailler — ce n'est pas sa fonction, c'est un nettoyeur, pas un outil de coupe.",
    description:
      "Nettoyeur multi-surfaces sans fil 18V, livré avec une brosse. Vendu solo, sans batterie ni chargeur. Complète l'entretien extérieur là où tondeuse et coupe-bordures ne font rien.",
    marchand: 'manomano',
    urlMarchand: 'https://www.manomano.fr/p/einhell-nettoyeur-sans-fil-picobella-3424200-17787611?model_id=17785613',
    verifie: true,
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

export const SEGMENT_LABEL: Record<Produit['segment'], string> = {
  meilleur_rapport: 'Premium',
  milieu: 'Équilibre',
  moins_cher: 'Budget',
};

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

/**
 * Temps de lecture estimé à partir du vrai contenu du guide (≈ 200 mots/min),
 * jamais un chiffre inventé : voir la règle d'honnêteté du contenu dans CLAUDE.md.
 */
export function tempsLectureGuide(guide: Guide): number {
  const texte = guide.intro + ' ' + guide.sections.map((s) => s.contenu).join(' ');
  const mots = texte.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 200));
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
