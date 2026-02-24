const categories = [
  {
    slug: "high-tech",
    nom: "High-Tech",
    emoji: "📱",
    sousTitre: "Smartphones",
    description: "Les meilleurs smartphones comparés par rapport qualité/prix, durabilité et fiabilité."
  },
  {
    slug: "maison",
    nom: "Maison",
    emoji: "🏠",
    sousTitre: "Aspirateurs sans fil",
    description: "Aspirateurs sans fil : puissance, autonomie et rapport qualité/prix décortiqués."
  },
  {
    slug: "cuisine",
    nom: "Cuisine",
    emoji: "🍳",
    sousTitre: "Friteuses à air",
    description: "Friteuses à air : capacité, praticité et facilité de nettoyage comparées."
  },
  {
    slug: "sport",
    nom: "Sport",
    emoji: "🏃",
    sousTitre: "Montres connectées",
    description: "Montres connectées sport : précision GPS, autonomie et fonctionnalités santé."
  },
  {
    slug: "beaute",
    nom: "Beauté",
    emoji: "✨",
    sousTitre: "Épilation & lissage",
    description: "Épilateurs et lisseurs : efficacité, douceur et longévité passés au crible."
  }
];
const marques = [
  // High-Tech
  { slug: "apple", nom: "Apple", categorieSlug: "high-tech", description: "La référence iOS, écosystème fermé mais performances hors pair et suivi logiciel long." },
  { slug: "samsung", nom: "Samsung", categorieSlug: "high-tech", description: "Le plus grand choix Android, des entrées de gamme solides aux flagships ultra-puissants." },
  { slug: "google", nom: "Google", categorieSlug: "high-tech", description: "Maître de la photo computationnelle et des mises à jour Android garanties 7 ans." },
  { slug: "xiaomi", nom: "Xiaomi", categorieSlug: "high-tech", description: "Rapport qualité/prix imbattable, autonomie excellente, MIUI un peu touffue." },
  // Maison
  { slug: "dyson", nom: "Dyson", categorieSlug: "maison", description: "La référence aspiration sans fil, filtration HEPA, design premium, prix élevé." },
  { slug: "irobot", nom: "iRobot", categorieSlug: "maison", description: "Pionnier du robot aspirateur, navigation intelligente et app intuitive." },
  { slug: "miele", nom: "Miele", categorieSlug: "maison", description: "Durabilité légendaire, SAV irréprochable, filtration médicale. Conçu pour durer 20 ans." },
  { slug: "rowenta", nom: "Rowenta", categorieSlug: "maison", description: "Marque française accessible, bon rapport qualité/prix, SAV disponible." },
  // Cuisine
  { slug: "ninja", nom: "Ninja", categorieSlug: "cuisine", description: "Innovation constante, doubles zones de cuisson, qualité build premium." },
  { slug: "philips", nom: "Philips", categorieSlug: "cuisine", description: "Inventeur de la friteuse à air, fiable, paniers antiadhésifs faciles à nettoyer." },
  { slug: "cosori", nom: "Cosori", categorieSlug: "cuisine", description: "Excellent rapport qualité/prix, grand choix de tailles, app connectée disponible." },
  { slug: "tefal", nom: "Tefal", categorieSlug: "cuisine", description: "Marque de confiance française, pièces disponibles partout, SAV réactif." },
  // Sport
  { slug: "garmin", nom: "Garmin", categorieSlug: "sport", description: "La référence sport sérieux : GPS ultra-précis, autonomie record, données complètes." },
  { slug: "apple-watch", nom: "Apple Watch", categorieSlug: "sport", description: "Meilleure détection santé du marché, intégration iOS parfaite, autonomie limitée." },
  { slug: "samsung-watch", nom: "Samsung Watch", categorieSlug: "sport", description: "Bel écran AMOLED, bon suivi santé Android, compatible tous smartphones Samsung." },
  { slug: "polar", nom: "Polar", categorieSlug: "sport", description: "Expert cardio et endurance, capteurs précis, suivi récupération sérieux." },
  // Beauté
  { slug: "braun", nom: "Braun", categorieSlug: "beaute", description: "Épilateurs référence : efficacité maximale, nombreux accessoires, durabilité." },
  { slug: "philips-lumea", nom: "Philips Lumea", categorieSlug: "beaute", description: "Leader IPL maison, résultats durables en 8 semaines, 5 intensités." },
  { slug: "remington", nom: "Remington", categorieSlug: "beaute", description: "Bon rapport qualité/prix sur lisseurs et épilation lumière pulsée." },
  { slug: "rowenta-beaute", nom: "Rowenta Beauté", categorieSlug: "beaute", description: "Lisseurs fiables, plaque céramique, disponibles chez tous les revendeurs." }
];
const produits = [
  // ── HIGH-TECH : Apple ─────────────────────────────────────────────────────
  {
    slug: "iphone-16-pro-max",
    nom: "iPhone 16 Pro Max",
    marqueSlug: "apple",
    categorieSlug: "high-tech",
    prix: 1329,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Créateurs de contenu, professionnels, fans de l’écosystème Apple.",
    contreQui: "Petit budget ou utilisateurs Android convaincus.",
    description: "Puce A18 Pro, capteur 48 Mpx, 5x zoom optique, titanium. Le meilleur iPhone jamais produit.",
    lienAmazon: "https://www.amazon.fr/s?k=iPhone+16+Pro+Max&tag=trouvetout-21"
  },
  {
    slug: "iphone-15",
    nom: "iPhone 15",
    marqueSlug: "apple",
    categorieSlug: "high-tech",
    prix: 799,
    segment: "milieu",
    qualite: 4,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Meilleur rapport qualité/prix Apple 💡",
    pourQui: "Utilisateurs Apple cherchant un équilibre prix/performance.",
    contreQui: "Ceux qui veulent le zoom téléphoto ou la puce A18.",
    description: "Dynamic Island, USB-C, puce A16 Bionic. Parfait équilibre dans la gamme Apple.",
    lienAmazon: "https://www.amazon.fr/s?k=iPhone+15&tag=trouvetout-21"
  },
  {
    slug: "iphone-se-3",
    nom: "iPhone SE (3ème gen)",
    marqueSlug: "apple",
    categorieSlug: "high-tech",
    prix: 529,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 4,
    fiabilite: 5,
    verdict: "L’option économique Apple 💸",
    pourQui: "Budget serré mais attaché à iOS et Touch ID.",
    contreQui: "Ceux qui veulent un grand écran ou Face ID.",
    description: 'Puce A15 Bionic dans un format compact 4,7". Le plus abordable pour entrer dans l’écosystème Apple.',
    lienAmazon: "https://www.amazon.fr/s?k=iPhone+SE+2022&tag=trouvetout-21"
  },
  // ── HIGH-TECH : Samsung ──────────────────────────────────────────────────
  {
    slug: "samsung-galaxy-s25-ultra",
    nom: "Samsung Galaxy S25 Ultra",
    marqueSlug: "samsung",
    categorieSlug: "high-tech",
    prix: 1299,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Power users Android, fans de S Pen, photographes exigeants.",
    contreQui: "Ceux qui veulent un format compact ou un budget maîtrisé.",
    description: 'Snapdragon 8 Elite, S Pen intégré, zoom 200x, écran 6,9" QHD+. Le roi Android.',
    lienAmazon: "https://www.amazon.fr/s?k=Samsung+Galaxy+S25+Ultra&tag=trouvetout-21"
  },
  {
    slug: "samsung-galaxy-a55",
    nom: "Samsung Galaxy A55 5G",
    marqueSlug: "samsung",
    categorieSlug: "high-tech",
    prix: 449,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Samsung 💡",
    pourQui: "Utilisateurs cherchant un bon Android milieu de gamme durable.",
    contreQui: "Utilisateurs voulant des performances photo ultra-premium.",
    description: "Exynos 1480, 5 ans de mises à jour, verre Gorilla Glass Victus+, 50 Mpx. Solide.",
    lienAmazon: "https://www.amazon.fr/s?k=Samsung+Galaxy+A55&tag=trouvetout-21"
  },
  {
    slug: "samsung-galaxy-a15",
    nom: "Samsung Galaxy A15 5G",
    marqueSlug: "samsung",
    categorieSlug: "high-tech",
    prix: 189,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Samsung 💸",
    pourQui: "Premier smartphone ou usage basique avec budget très serré.",
    contreQui: "Utilisateurs gourmands en performance ou en photo.",
    description: "Écran AMOLED 90 Hz, 5G, batterie 5000 mAh. L’essentiel sans fioritures à moins de 200 €.",
    lienAmazon: "https://www.amazon.fr/s?k=Samsung+Galaxy+A15+5G&tag=trouvetout-21"
  },
  // ── HIGH-TECH : Google ───────────────────────────────────────────────────
  {
    slug: "google-pixel-9-pro",
    nom: "Google Pixel 9 Pro",
    marqueSlug: "google",
    categorieSlug: "high-tech",
    prix: 1099,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Fans de photo IA et d’Android pur avec 7 ans de mises à jour.",
    contreQui: "Utilisateurs hors écosystème Google ou voulant un zoom 10x.",
    description: "Tensor G4, photo computationnelle IA de référence, 7 ans de mises à jour. Photo nocturne imbattable.",
    lienAmazon: "https://www.amazon.fr/s?k=Google+Pixel+9+Pro&tag=trouvetout-21"
  },
  {
    slug: "google-pixel-9",
    nom: "Google Pixel 9",
    marqueSlug: "google",
    categorieSlug: "high-tech",
    prix: 799,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Google 💡",
    pourQui: "Utilisateurs cherchant la meilleure photo Android sans dépenser 1000 €.",
    contreQui: "Ceux qui veulent le téléphoto ou l’écran 120 Hz du Pro.",
    description: "Même Tensor G4 que le Pro, photo excellente, 7 ans de mises à jour. Un vrai premium accessible.",
    lienAmazon: "https://www.amazon.fr/s?k=Google+Pixel+9&tag=trouvetout-21"
  },
  {
    slug: "google-pixel-8a",
    nom: "Google Pixel 8a",
    marqueSlug: "google",
    categorieSlug: "high-tech",
    prix: 549,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "L’option économique Google 💸",
    pourQui: "Utilisateurs voulant des fonctions IA Google et bonne photo à prix contenu.",
    contreQui: "Ceux qui veulent le meilleur écran ou la charge rapide.",
    description: "Tensor G3, 120 Hz, IP67, 7 ans de mises à jour. Le meilleur milieu de gamme Android.",
    lienAmazon: "https://www.amazon.fr/s?k=Google+Pixel+8a&tag=trouvetout-21"
  },
  // ── HIGH-TECH : Xiaomi ───────────────────────────────────────────────────
  {
    slug: "xiaomi-14t-pro",
    nom: "Xiaomi 14T Pro",
    marqueSlug: "xiaomi",
    categorieSlug: "high-tech",
    prix: 799,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 3,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Chercheurs du meilleur rapport puissance/prix Android.",
    contreQui: "Utilisateurs sensibles aux logiciels additionnels (MIUI/HyperOS).",
    description: "Dimensity 9300+, Leica optics, 144 Hz AMOLED, 144W de charge. Formidable pour le prix.",
    lienAmazon: "https://www.amazon.fr/s?k=Xiaomi+14T+Pro&tag=trouvetout-21"
  },
  {
    slug: "xiaomi-redmi-note-13-pro-plus",
    nom: "Redmi Note 13 Pro+",
    marqueSlug: "xiaomi",
    categorieSlug: "high-tech",
    prix: 349,
    segment: "milieu",
    qualite: 4,
    durabilite: 3,
    fiabilite: 3,
    verdict: "Meilleur rapport qualité/prix Xiaomi 💡",
    pourQui: "Utilisateurs cherchant une bonne photo et une belle batterie sous 350 €.",
    contreQui: "Utilisateurs voulant des mises à jour longues garanties.",
    description: "Dimensity 1200 Ultra, 200 Mpx, IP68, 120W. Un monstre de fiche technique à petit prix.",
    lienAmazon: "https://www.amazon.fr/s?k=Redmi+Note+13+Pro+Plus&tag=trouvetout-21"
  },
  {
    slug: "xiaomi-redmi-13c",
    nom: "Redmi 13C",
    marqueSlug: "xiaomi",
    categorieSlug: "high-tech",
    prix: 139,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Xiaomi 💸",
    pourQui: "Premier smartphone ou usage basique minimum.",
    contreQui: "Utilisateurs cherchant performances, photo ou 5G.",
    description: "MediaTek Helio G85, 50 Mpx, 5000 mAh. L’entrée de gamme honnête sous 140 €.",
    lienAmazon: "https://www.amazon.fr/s?k=Redmi+13C&tag=trouvetout-21"
  },
  // ── MAISON : Dyson ────────────────────────────────────────────────────────
  {
    slug: "dyson-v15-detect-absolute",
    nom: "Dyson V15 Detect Absolute",
    marqueSlug: "dyson",
    categorieSlug: "maison",
    prix: 699,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Personnes allergiques, maisons avec animaux, parquets et moquettes.",
    contreQui: "Petit budget ou petits appartements sans besoins d’aspiration intensive.",
    description: "Laser Detect, capteur de particules en temps réel, filtre HEPA, 60 min autonomie. Le summum Dyson.",
    lienAmazon: "https://www.amazon.fr/s?k=Dyson+V15+Detect+Absolute&tag=trouvetout-21"
  },
  {
    slug: "dyson-v12-detect-slim",
    nom: "Dyson V12 Detect Slim",
    marqueSlug: "dyson",
    categorieSlug: "maison",
    prix: 549,
    segment: "milieu",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Dyson 💡",
    pourQui: "Appartements et maisons de taille moyenne cherchant le meilleur Dyson accessible.",
    contreQui: "Très grandes surfaces ou moquettes épaisses (préférer V15).",
    description: "Laser Detect, 60 min, filtre HEPA, plus léger que le V15. Excellent compromis.",
    lienAmazon: "https://www.amazon.fr/s?k=Dyson+V12+Detect+Slim&tag=trouvetout-21"
  },
  {
    slug: "dyson-v8-absolute",
    nom: "Dyson V8 Absolute",
    marqueSlug: "dyson",
    categorieSlug: "maison",
    prix: 349,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "L’option économique Dyson 💸",
    pourQui: "Petits espaces cherchant la qualité Dyson sans le prix premium.",
    contreQui: "Grandes surfaces ou utilisation intensive (autonomie 40 min seulement).",
    description: "40 min d’autonomie, filtre HEPA, 2 modes aspiration. L’entrée dans l’univers Dyson.",
    lienAmazon: "https://www.amazon.fr/s?k=Dyson+V8+Absolute&tag=trouvetout-21"
  },
  // ── MAISON : iRobot ───────────────────────────────────────────────────────
  {
    slug: "irobot-roomba-j9-plus",
    nom: "iRobot Roomba j9+",
    marqueSlug: "irobot",
    categorieSlug: "maison",
    prix: 799,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Personnes voulant un robot entièrement autonome avec vidage auto.",
    contreQui: "Petits espaces ou budget limité.",
    description: "Mapping 3D, vidage automatique, évitement d’obstacles, 75 dB. L’aspirateur robot le plus autonome.",
    lienAmazon: "https://www.amazon.fr/s?k=iRobot+Roomba+j9%2B&tag=trouvetout-21"
  },
  {
    slug: "irobot-roomba-i5-plus",
    nom: "iRobot Roomba i5+",
    marqueSlug: "irobot",
    categorieSlug: "maison",
    prix: 399,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix iRobot 💡",
    pourQui: "Utilisateurs cherchant un robot fiable avec vidage auto abordable.",
    contreQui: "Maisons avec nombreux obstacles ou moquettes épaisses.",
    description: "Navigation Imprint, vidage automatique, compatible Alexa/Google. La valeur sûre iRobot.",
    lienAmazon: "https://www.amazon.fr/s?k=iRobot+Roomba+i5%2B&tag=trouvetout-21"
  },
  {
    slug: "irobot-roomba-e5",
    nom: "iRobot Roomba e5",
    marqueSlug: "irobot",
    categorieSlug: "maison",
    prix: 249,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 4,
    verdict: "L’option économique iRobot 💸",
    pourQui: "Budgets serrés voulant un robot aspirateur de marque fiable.",
    contreQui: "Grands espaces ou ceux qui veulent du mapping et de l’autonomie.",
    description: "Aspiration 5x, brosse anti-enchevêtrement, WiFi. L’entrée de gamme iRobot honnête.",
    lienAmazon: "https://www.amazon.fr/s?k=iRobot+Roomba+e5&tag=trouvetout-21"
  },
  // ── MAISON : Miele ────────────────────────────────────────────────────────
  {
    slug: "miele-triflex-hx2-pro",
    nom: "Miele Triflex HX2 Pro",
    marqueSlug: "miele",
    categorieSlug: "maison",
    prix: 599,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Ceux qui cherchent l’appareil qui durera 15–20 ans avec le meilleur SAV.",
    contreQui: "Budget serré (Miele c’est cher mais pour très longtemps).",
    description: "Moteur Vortex 25 000 tr/min, filtre HEPA AirClean, batterie interchangeable. La durabilité Miele.",
    lienAmazon: "https://www.amazon.fr/s?k=Miele+Triflex+HX2+Pro&tag=trouvetout-21"
  },
  {
    slug: "miele-triflex-hx1",
    nom: "Miele Triflex HX1",
    marqueSlug: "miele",
    categorieSlug: "maison",
    prix: 399,
    segment: "milieu",
    qualite: 4,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Meilleur rapport qualité/prix Miele 💡",
    pourQui: "Utilisateurs voulant la fiabilité Miele sans payer le prix du Pro.",
    contreQui: "Ceux qui veulent le filtre HEPA AirClean Pro ou la puissance maximale.",
    description: "Même moteur que le HX2, sans le filtre Premium. La meilleure entrée dans l’univers Miele sans fil.",
    lienAmazon: "https://www.amazon.fr/s?k=Miele+Triflex+HX1&tag=trouvetout-21"
  },
  {
    slug: "miele-classic-c1-allergy",
    nom: "Miele Classic C1 Allergy",
    marqueSlug: "miele",
    categorieSlug: "maison",
    prix: 249,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 5,
    fiabilite: 5,
    verdict: "L’option économique Miele 💸",
    pourQui: "Allergiques cherchant un aspirateur filaire fiable pour longtemps.",
    contreQui: "Ceux qui veulent un sans-fil ou un robot.",
    description: "Filaire, filtre AirClean, 890 W, compatible sacs Miele. La robustesse Miele accessible.",
    lienAmazon: "https://www.amazon.fr/s?k=Miele+Classic+C1+Allergy&tag=trouvetout-21"
  },
  // ── MAISON : Rowenta ──────────────────────────────────────────────────────
  {
    slug: "rowenta-x-force-14-60",
    nom: "Rowenta X-Force 14.60",
    marqueSlug: "rowenta",
    categorieSlug: "maison",
    prix: 449,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Familles cherchant un bon sans-fil Rowenta puissant à prix raisonnable.",
    contreQui: "Allergiques stricts (filtration inférieure à Dyson ou Miele).",
    description: "185 AW, brosse Flex, 50 min, bac 0,9L. Le meilleur Rowenta sans fil sur tous les sols.",
    lienAmazon: "https://www.amazon.fr/s?k=Rowenta+X-Force+14.60&tag=trouvetout-21"
  },
  {
    slug: "rowenta-x-force-8-60",
    nom: "Rowenta X-Force 8.60",
    marqueSlug: "rowenta",
    categorieSlug: "maison",
    prix: 249,
    segment: "milieu",
    qualite: 3,
    durabilite: 3,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Rowenta 💡",
    pourQui: "Appartements de taille moyenne cherchant un Rowenta abordable.",
    contreQui: "Grandes maisons ou utilisation quotidienne intensive.",
    description: "130 AW, 45 min, brosse motorisée. Le juste milieu dans la gamme Rowenta.",
    lienAmazon: "https://www.amazon.fr/s?k=Rowenta+X-Force+8.60&tag=trouvetout-21"
  },
  {
    slug: "rowenta-x-pert-6-60",
    nom: "Rowenta X-Pert 6.60",
    marqueSlug: "rowenta",
    categorieSlug: "maison",
    prix: 149,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Rowenta 💸",
    pourQui: "Petits espaces, budget serré, usage occasionnel.",
    contreQui: "Utilisation quotidienne ou grandes surfaces.",
    description: "75 AW, 45 min, léger. L’entrée de gamme sans-fil Rowenta pour les petits espaces.",
    lienAmazon: "https://www.amazon.fr/s?k=Rowenta+X-Pert+6.60&tag=trouvetout-21"
  },
  // ── CUISINE : Ninja ───────────────────────────────────────────────────────
  {
    slug: "ninja-foodi-af400eu",
    nom: "Ninja Foodi Dual Zone AF400EU",
    marqueSlug: "ninja",
    categorieSlug: "cuisine",
    prix: 249,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Familles 4+ personnes voulant cuire deux plats simultanément.",
    contreQui: "Personnes seules ou couples (trop grand).",
    description: "2 zones de cuisson indépendantes, 9,5 L total, 6 modes. Révolutionne la cuisine quotidienne.",
    lienAmazon: "https://www.amazon.fr/s?k=Ninja+AF400EU+Dual+Zone&tag=trouvetout-21"
  },
  {
    slug: "ninja-speedi-sf301eu",
    nom: "Ninja Speedi SF301EU",
    marqueSlug: "ninja",
    categorieSlug: "cuisine",
    prix: 199,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Ninja 💡",
    pourQui: "2–3 personnes cherchant cuisson rapide et vapeur intégrée.",
    contreQui: "Grandes familles (capacité 5,7 L).",
    description: "Cuisson rapide 15 min, vapeur + air chaud, 12 modes, bac antiadhésif. Polyvalent et rapide.",
    lienAmazon: "https://www.amazon.fr/s?k=Ninja+Speedi+SF301EU&tag=trouvetout-21"
  },
  {
    slug: "ninja-air-fryer-af101eu",
    nom: "Ninja Air Fryer AF101EU",
    marqueSlug: "ninja",
    categorieSlug: "cuisine",
    prix: 89,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "L’option économique Ninja 💸",
    pourQui: "1–2 personnes cherchant leur première friteuse à air de qualité.",
    contreQui: "Familles ou adeptes de la double cuisson.",
    description: "3,8 L, 4 modes, plateau dégraissant, lavable lave-vaisselle. Le meilleur rapport qualité/prix absolu.",
    lienAmazon: "https://www.amazon.fr/s?k=Ninja+AF101+Air+Fryer&tag=trouvetout-21"
  },
  // ── CUISINE : Philips ─────────────────────────────────────────────────────
  {
    slug: "philips-airfryer-xxl-hd9870",
    nom: "Philips Airfryer XXL HD9870",
    marqueSlug: "philips",
    categorieSlug: "cuisine",
    prix: 299,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Familles 4–6 personnes, connecté app, cuissons variées.",
    contreQui: "Budgets serrés ou espaces cuisine limités (grande friteuse).",
    description: "7,2 L, connecté, technologie Fat Removal, 5 accessoires inclus. La référence Philips.",
    lienAmazon: "https://www.amazon.fr/s?k=Philips+Airfryer+XXL+HD9870&tag=trouvetout-21"
  },
  {
    slug: "philips-airfryer-xl-hd9250",
    nom: "Philips Airfryer XL HD9250",
    marqueSlug: "philips",
    categorieSlug: "cuisine",
    prix: 149,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Philips 💡",
    pourQui: "2–4 personnes cherchant la fiabilité Philips sans les options connectées.",
    contreQui: "Grandes familles ou utilisateurs voulant la connectivité.",
    description: "6,2 L, Rapid Air, panier antiadhésif lavable. Le classique Philips incontournable.",
    lienAmazon: "https://www.amazon.fr/s?k=Philips+Airfryer+XL+HD9250&tag=trouvetout-21"
  },
  {
    slug: "philips-airfryer-compact-hd9252",
    nom: "Philips Airfryer Compact HD9252",
    marqueSlug: "philips",
    categorieSlug: "cuisine",
    prix: 79,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 4,
    fiabilite: 4,
    verdict: "L’option économique Philips 💸",
    pourQui: "1–2 personnes voulant débuter avec la friteuse à air sans dépenser.",
    contreQui: "Familles ou amateurs de grandes quantités.",
    description: "4,1 L, technologie Rapid Air, manettes analogiques. Simple, fiable, abordable.",
    lienAmazon: "https://www.amazon.fr/s?k=Philips+Airfryer+HD9252&tag=trouvetout-21"
  },
  // ── CUISINE : Cosori ──────────────────────────────────────────────────────
  {
    slug: "cosori-dual-blaze-6-4l",
    nom: "Cosori Dual Blaze 6.4L",
    marqueSlug: "cosori",
    categorieSlug: "cuisine",
    prix: 179,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "2–4 personnes cherchant un grand modèle connecté abordable.",
    contreQui: "Ceux qui préfèrent les marques européennes ou sans app.",
    description: "Chauffage dual (haut + bas), 6,4 L, Wi-Fi, 100 recettes app. Excellent rapport qualité/prix.",
    lienAmazon: "https://www.amazon.fr/s?k=Cosori+Dual+Blaze+6.4L&tag=trouvetout-21"
  },
  {
    slug: "cosori-pro-le-5-5l",
    nom: "Cosori Pro LE 5.5L",
    marqueSlug: "cosori",
    categorieSlug: "cuisine",
    prix: 119,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Cosori 💡",
    pourQui: "2–3 personnes cherchant une friteuse connectée fiable sous 120 €.",
    contreQui: "Grandes familles ou ceux qui veulent la double chauffe.",
    description: "5,5 L, connecté, 9 fonctions, antiadhésif lavable. Le choix idéal qualité/prix Cosori.",
    lienAmazon: "https://www.amazon.fr/s?k=Cosori+Pro+LE+5.5L&tag=trouvetout-21"
  },
  {
    slug: "cosori-mini-3-8l",
    nom: "Cosori Mini 3.8L",
    marqueSlug: "cosori",
    categorieSlug: "cuisine",
    prix: 69,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 4,
    verdict: "L’option économique Cosori 💸",
    pourQui: "1–2 personnes cherchant une friteuse à air compacte à prix mini.",
    contreQui: "Familles ou grosses quantités.",
    description: "3,8 L, compact, 5 fonctions, panier antiadhésif. Parfait pour démarrer.",
    lienAmazon: "https://www.amazon.fr/s?k=Cosori+Mini+3.8L&tag=trouvetout-21"
  },
  // ── CUISINE : Tefal ───────────────────────────────────────────────────────
  {
    slug: "tefal-easy-fry-oven-grill-ey505",
    nom: "Tefal Easy Fry Oven & Grill EY505",
    marqueSlug: "tefal",
    categorieSlug: "cuisine",
    prix: 219,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Polyvalents cherchant friteuse + mini-four + grill en un.",
    contreQui: "Ceux qui veulent juste une friteuse simple sans l’encombrement.",
    description: "11 L, 9 modes dont grill, convection, déhydrateur. Multi-fonctions made in Tefal.",
    lienAmazon: "https://www.amazon.fr/s?k=Tefal+Easy+Fry+Oven+Grill+EY505&tag=trouvetout-21"
  },
  {
    slug: "tefal-easy-fry-xxl-ey701",
    nom: "Tefal Easy Fry XXL EY701",
    marqueSlug: "tefal",
    categorieSlug: "cuisine",
    prix: 149,
    segment: "milieu",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "Meilleur rapport qualité/prix Tefal 💡",
    pourQui: "Familles françaises cherchant une grande friteuse à air de confiance.",
    contreQui: "Ceux qui cherchent la meilleure qualité ou la connectivité.",
    description: "6,5 L, 8 modes, double panier. La solution familiale Tefal à prix correct.",
    lienAmazon: "https://www.amazon.fr/s?k=Tefal+Easy+Fry+XXL+EY701&tag=trouvetout-21"
  },
  {
    slug: "tefal-easy-fry-essential-ey130",
    nom: "Tefal Easy Fry Essential EY130",
    marqueSlug: "tefal",
    categorieSlug: "cuisine",
    prix: 69,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Tefal 💸",
    pourQui: "Budget très serré voulant une friteuse à air de marque connue.",
    contreQui: "Grandes familles ou utilisateurs fréquents.",
    description: "4,2 L, 8 modes, manette simple. L’entrée de gamme Tefal sans surprise.",
    lienAmazon: "https://www.amazon.fr/s?k=Tefal+Easy+Fry+Essential+EY130&tag=trouvetout-21"
  },
  // ── SPORT : Garmin ────────────────────────────────────────────────────────
  {
    slug: "garmin-fenix-8-solar",
    nom: "Garmin Fenix 8 Solar",
    marqueSlug: "garmin",
    categorieSlug: "sport",
    prix: 1049,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Triathlètes, alpinistes, ultra-runners, professionnels de l’endurance.",
    contreQui: "Utilisateurs occasionnels ou budgets limités.",
    description: "GPS multi-bandes, charge solaire, 29 jours autonomie, haut-parleur, saphir. La montre sport ultime.",
    lienAmazon: "https://www.amazon.fr/s?k=Garmin+Fenix+8+Solar&tag=trouvetout-21"
  },
  {
    slug: "garmin-forerunner-965",
    nom: "Garmin Forerunner 965",
    marqueSlug: "garmin",
    categorieSlug: "sport",
    prix: 599,
    segment: "milieu",
    qualite: 5,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Meilleur rapport qualité/prix Garmin 💡",
    pourQui: "Runners et triathlètes semi-pros cherchant le GPS le plus précis.",
    contreQui: "Utilisateurs voulant la montre la plus légère ou le design le plus sobre.",
    description: "AMOLED, GPS multi-bandes, 31 jours GPS saver, VO2max, charge rapide. Le parfait Garmin running.",
    lienAmazon: "https://www.amazon.fr/s?k=Garmin+Forerunner+965&tag=trouvetout-21"
  },
  {
    slug: "garmin-vivoactive-5",
    nom: "Garmin Vivoactive 5",
    marqueSlug: "garmin",
    categorieSlug: "sport",
    prix: 269,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "L’option économique Garmin 💸",
    pourQui: "Sportifs du dimanche cherchant le suivi Garmin fiable sans le budget Fenix.",
    contreQui: "Athlètes sérieux (GPS basique) ou fans de style minimaliste.",
    description: "AMOLED, 11 jours, 30 sports, Garmin Pay, suivi santé. L’entrée de gamme sérieuse Garmin.",
    lienAmazon: "https://www.amazon.fr/s?k=Garmin+Vivoactive+5&tag=trouvetout-21"
  },
  // ── SPORT : Apple Watch ───────────────────────────────────────────────────
  {
    slug: "apple-watch-ultra-2",
    nom: "Apple Watch Ultra 2",
    marqueSlug: "apple-watch",
    categorieSlug: "sport",
    prix: 849,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 5,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Adeptes iOS voulant la montre Apple la plus sportive et robuste.",
    contreQui: "Utilisateurs Android ou cherchant une autonomie > 72h.",
    description: "Titane, saphir, GPS dual-fréquence, 60h autonomie, plongée certifiée. Apple au maximum.",
    lienAmazon: "https://www.amazon.fr/s?k=Apple+Watch+Ultra+2&tag=trouvetout-21"
  },
  {
    slug: "apple-watch-series-10",
    nom: "Apple Watch Series 10",
    marqueSlug: "apple-watch",
    categorieSlug: "sport",
    prix: 449,
    segment: "milieu",
    qualite: 5,
    durabilite: 4,
    fiabilite: 5,
    verdict: "Meilleur rapport qualité/prix Apple Watch 💡",
    pourQui: "Utilisateurs iOS cherchant la meilleure montre santé connectée.",
    contreQui: "Android ou ceux qui veulent plus de 2 jours d’autonomie.",
    description: "Plus fin jamais, charge rapide, apnée du sommeil, ECG. L’Apple Watch de référence.",
    lienAmazon: "https://www.amazon.fr/s?k=Apple+Watch+Series+10&tag=trouvetout-21"
  },
  {
    slug: "apple-watch-se-2",
    nom: "Apple Watch SE 2",
    marqueSlug: "apple-watch",
    categorieSlug: "sport",
    prix: 279,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 4,
    fiabilite: 5,
    verdict: "L’option économique Apple Watch 💸",
    pourQui: "Utilisateurs iOS cherchant l’entrée dans l’univers Apple Watch.",
    contreQui: "Ceux qui veulent l’ECG, Always-On ou la détection apnée.",
    description: "puce S8, chute + crash detection, SOS urgence, 18h. L’essentiel Apple Watch à prix accessible.",
    lienAmazon: "https://www.amazon.fr/s?k=Apple+Watch+SE+2&tag=trouvetout-21"
  },
  // ── SPORT : Samsung Watch ─────────────────────────────────────────────────
  {
    slug: "samsung-galaxy-watch-ultra",
    nom: "Samsung Galaxy Watch Ultra",
    marqueSlug: "samsung-watch",
    categorieSlug: "sport",
    prix: 699,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Sportifs Android cherchant une montre robuste haut de gamme.",
    contreQui: "Utilisateurs iPhone ou cherchant l’autonomie record.",
    description: "Titane, AMOLED, 60h, GPS double fréquence, analyse avancée course. Le premium Samsung sport.",
    lienAmazon: "https://www.amazon.fr/s?k=Samsung+Galaxy+Watch+Ultra&tag=trouvetout-21"
  },
  {
    slug: "samsung-galaxy-watch-7",
    nom: "Samsung Galaxy Watch 7",
    marqueSlug: "samsung-watch",
    categorieSlug: "sport",
    prix: 299,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Samsung Watch 💡",
    pourQui: "Utilisateurs Android Samsung cherchant suivi santé complet et beau design.",
    contreQui: "Utilisateurs iPhone ou cherchant l’autonomie Garmin.",
    description: "Exynos W1000, analyse avancée sommeil, GPT santé, 40h. Le meilleur rapport Samsung Watch.",
    lienAmazon: "https://www.amazon.fr/s?k=Samsung+Galaxy+Watch+7&tag=trouvetout-21"
  },
  {
    slug: "samsung-galaxy-watch-fe",
    nom: "Samsung Galaxy Watch FE",
    marqueSlug: "samsung-watch",
    categorieSlug: "sport",
    prix: 199,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Samsung Watch 💸",
    pourQui: "Budgets limités voulant une smartwatch Android accessible.",
    contreQui: "Sportifs sérieux ou ceux voulant le dernier Wear OS.",
    description: "AMOLED, suivi sommeil, GPS, NFC. L’entrée Samsung Watch de confiance.",
    lienAmazon: "https://www.amazon.fr/s?k=Samsung+Galaxy+Watch+FE&tag=trouvetout-21"
  },
  // ── SPORT : Polar ─────────────────────────────────────────────────────────
  {
    slug: "polar-grit-x2-pro",
    nom: "Polar Grit X2 Pro",
    marqueSlug: "polar",
    categorieSlug: "sport",
    prix: 499,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 5,
    fiabilite: 5,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Traileurs et grimpeurs cherchant précision cardio et robustesse.",
    contreQui: "Ceux qui veulent un écran AMOLED ou une intégration smartphone poussée.",
    description: "Saphir, GPS multi-GNSS, Nightly Recharge, analyse récup avancée. La référence endurance Polar.",
    lienAmazon: "https://www.amazon.fr/s?k=Polar+Grit+X2+Pro&tag=trouvetout-21"
  },
  {
    slug: "polar-vantage-v3",
    nom: "Polar Vantage V3",
    marqueSlug: "polar",
    categorieSlug: "sport",
    prix: 399,
    segment: "milieu",
    qualite: 4,
    durabilite: 5,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Polar 💡",
    pourQui: "Triathlètes et runners cherchant capteurs cardio ultra-précis et récupération.",
    contreQui: "Utilisateurs voulant le meilleur GPS ou un design ultra moderne.",
    description: "Optique + électrique, GPS, 140h, 30+ sports. Capteurs cardio parmi les meilleurs du marché.",
    lienAmazon: "https://www.amazon.fr/s?k=Polar+Vantage+V3&tag=trouvetout-21"
  },
  {
    slug: "polar-ignite-3",
    nom: "Polar Ignite 3",
    marqueSlug: "polar",
    categorieSlug: "sport",
    prix: 199,
    segment: "moins_cher",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "L’option économique Polar 💸",
    pourQui: "Sportifs débutants cherchant le suivi cardio Polar à prix accessible.",
    contreQui: "Athlètes avancés (GPS moins précis).",
    description: "AMOLED, 5 jours, GPS, Polar Sleep Plus. L’entrée de gamme Polar complète.",
    lienAmazon: "https://www.amazon.fr/s?k=Polar+Ignite+3&tag=trouvetout-21"
  },
  // ── BEAUTÉ : Braun ────────────────────────────────────────────────────────
  {
    slug: "braun-silk-epil-9-flex",
    nom: "Braun Silk-épil 9 Flex",
    marqueSlug: "braun",
    categorieSlug: "beaute",
    prix: 229,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Personnes cherchant la meilleure épilation durable à la maison.",
    contreQui: "Peau très sensible ou ceux préférant l’épilation lumière pulsée.",
    description: "40 pinces Flex, tête pivotante 360°, 8 accessoires, usage humide/sec. L’épilateur référence.",
    lienAmazon: "https://www.amazon.fr/s?k=Braun+Silk-epil+9+Flex&tag=trouvetout-21"
  },
  {
    slug: "braun-silk-epil-5-flex",
    nom: "Braun Silk-épil 5 Flex",
    marqueSlug: "braun",
    categorieSlug: "beaute",
    prix: 119,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Braun 💡",
    pourQui: "Utilisatrices cherchant un Braun efficace sans le prix du modèle 9.",
    contreQui: "Peaux très sensibles ou celles qui veulent la tête pivotante.",
    description: "40 pinces, tête pivotante 90°, usage humide/sec. Excellent compromis dans la gamme Braun.",
    lienAmazon: "https://www.amazon.fr/s?k=Braun+Silk-epil+5+Flex&tag=trouvetout-21"
  },
  {
    slug: "braun-silk-epil-3",
    nom: "Braun Silk-épil 3",
    marqueSlug: "braun",
    categorieSlug: "beaute",
    prix: 69,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Braun 💸",
    pourQui: "Débutantes en épilation ou budget très serré.",
    contreQui: "Peaux sensibles (moins de pinces) ou zones difficiles.",
    description: "20 pinces, 2 vitesses, usage sec. L’entrée de gamme Braun fiable.",
    lienAmazon: "https://www.amazon.fr/s?k=Braun+Silk-epil+3&tag=trouvetout-21"
  },
  // ── BEAUTÉ : Philips Lumea ────────────────────────────────────────────────
  {
    slug: "philips-lumea-prestige-bri956",
    nom: "Philips Lumea Prestige BRI956",
    marqueSlug: "philips-lumea",
    categorieSlug: "beaute",
    prix: 499,
    segment: "meilleur_rapport",
    qualite: 5,
    durabilite: 4,
    fiabilite: 5,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Personnes voulant des résultats durables équivalents salon à la maison.",
    contreQui: "Peaux très foncées ou poils très clairs (IPL inefficace), et budgets serrés.",
    description: "4 accessoires, 5 intensités, app SkinSense, 250 000 flashs. La meilleure IPL maison.",
    lienAmazon: "https://www.amazon.fr/s?k=Philips+Lumea+Prestige+BRI956&tag=trouvetout-21"
  },
  {
    slug: "philips-satinelle-advanced-hp6579",
    nom: "Philips Satinelle Advanced HP6579",
    marqueSlug: "philips-lumea",
    categorieSlug: "beaute",
    prix: 149,
    segment: "milieu",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Philips Lumea 💡",
    pourQui: "Utilisatrices cherchant un épilateur électrique Philips efficace.",
    contreQui: "Celles qui veulent l’IPL ou les zones difficiles (pas de tête pivotante).",
    description: "MicroGrip 32 pinces, 2 vitesses, massage, usage sec/humide. Fiable et abordable.",
    lienAmazon: "https://www.amazon.fr/s?k=Philips+Satinelle+Advanced+HP6579&tag=trouvetout-21"
  },
  {
    slug: "philips-satinelle-essential-hp6401",
    nom: "Philips Satinelle Essential HP6401",
    marqueSlug: "philips-lumea",
    categorieSlug: "beaute",
    prix: 59,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Philips 💸",
    pourQui: "Débutantes voulant tester l’épilation électrique sans risque financier.",
    contreQui: "Peaux sensibles ou utilisatrices régulières (moins de pinces).",
    description: "20 pinces, usage sec, cordon. La porte d’entrée Philips en épilation.",
    lienAmazon: "https://www.amazon.fr/s?k=Philips+Satinelle+Essential+HP6401&tag=trouvetout-21"
  },
  // ── BEAUTÉ : Remington ────────────────────────────────────────────────────
  {
    slug: "remington-ilight-ultra-ipl6780",
    nom: "Remington iLIGHT Ultra IPL6780",
    marqueSlug: "remington",
    categorieSlug: "beaute",
    prix: 299,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Personnes cherchant une IPL abordable avec résultats visibles en 3 semaines.",
    contreQui: "Peaux très foncées ou poils clairs, et ceux voulant le meilleur du marché.",
    description: "300 000 flashs, 5 intensités, usage visage et corps, sac inclus. Bonne alternative abordable IPL.",
    lienAmazon: "https://www.amazon.fr/s?k=Remington+iLIGHT+Ultra&tag=trouvetout-21"
  },
  {
    slug: "remington-smooth-silky-ipl4000",
    nom: "Remington Smooth & Silky IPL4000",
    marqueSlug: "remington",
    categorieSlug: "beaute",
    prix: 149,
    segment: "milieu",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "Meilleur rapport qualité/prix Remington 💡",
    pourQui: "Budget moyen cherchant à tester l’IPL sans engagement financier fort.",
    contreQui: "Personnes cherchant des résultats professionnels rapides.",
    description: "100 000 flashs, 3 intensités, sabots corps et visage. IPL accessible pour commencer.",
    lienAmazon: "https://www.amazon.fr/s?k=Remington+Smooth+Silky+IPL4000&tag=trouvetout-21"
  },
  {
    slug: "remington-smooth-silky-ipl3000",
    nom: "Remington Smooth & Silky IPL3000",
    marqueSlug: "remington",
    categorieSlug: "beaute",
    prix: 89,
    segment: "moins_cher",
    qualite: 3,
    durabilite: 3,
    fiabilite: 3,
    verdict: "L’option économique Remington 💸",
    pourQui: "Petits budgets voulant tester l’IPL à moindre coût.",
    contreQui: "Utilisatrices exigeantes ou zones difficiles.",
    description: "75 000 flashs, 3 intensités. L’IPL d’entrée de gamme Remington.",
    lienAmazon: "https://www.amazon.fr/s?k=Remington+Smooth+Silky+IPL3000&tag=trouvetout-21"
  },
  // ── BEAUTÉ : Rowenta Beauté ───────────────────────────────────────────────
  {
    slug: "rowenta-liss-curl-premium-sf7461",
    nom: "Rowenta Liss & Curl Premium SF7461",
    marqueSlug: "rowenta-beaute",
    categorieSlug: "beaute",
    prix: 199,
    segment: "meilleur_rapport",
    qualite: 4,
    durabilite: 4,
    fiabilite: 4,
    verdict: "Notre choix n°1 ⭐",
    pourQui: "Personnes voulant lisseur + boucleur tout-en-un de qualité.",
    contreQui: "Celles qui préfèrent un outil dédié uniquement au lissage.",
    description: "Plaque kératine 230°C, auto-curl, Anion, chauffe 30s. 2-en-1 polyvalent Rowenta.",
    lienAmazon: "https://www.amazon.fr/s?k=Rowenta+Liss+Curl+Premium+SF7461&tag=trouvetout-21"
  },
  {
    slug: "rowenta-liss-style-sf3710",
    nom: "Rowenta Liss & Style SF3710",
    marqueSlug: "rowenta-beaute",
    categorieSlug: "beaute",
    prix: 119,
    segment: "milieu",
    qualite: 3,
    durabilite: 3,
    fiabilite: 4,
    verdict: "Meilleur rapport qualité/prix Rowenta Beauté 💡",
    pourQui: "Usage quotidien cherchant un lisseur fiable et accessible.",
    contreQui: "Cheveux très épais ou résistants (température max 200°C).",
    description: "Céramique, 5 températures, 200°C, fermeture magnétique. Le lisseur Rowenta fiable du quotidien.",
    lienAmazon: "https://www.amazon.fr/s?k=Rowenta+Liss+Style+SF3710&tag=trouvetout-21"
  },
  {
    slug: "rowenta-express-style-sf1110",
    nom: "Rowenta Express Style SF1110",
    marqueSlug: "rowenta-beaute",
    categorieSlug: "beaute",
    prix: 29,
    segment: "moins_cher",
    qualite: 2,
    durabilite: 2,
    fiabilite: 3,
    verdict: "L’option économique Rowenta 💸",
    pourQui: "Usage très occasionnel ou voyage, budget ultra serré.",
    contreQui: "Usage quotidien ou cheveux épais/frisés.",
    description: "Céramique, 180°C fixe, compact. Le dépannage Rowenta à moins de 30 €.",
    lienAmazon: "https://www.amazon.fr/s?k=Rowenta+Express+Style+SF1110&tag=trouvetout-21"
  }
];
const guides = [
  {
    slug: "quel-smartphone-choisir",
    titre: "Quel smartphone choisir en 2025 ?",
    description: "Notre guide complet pour choisir le bon smartphone selon votre budget et vos usages.",
    categorieSlug: "high-tech",
    intro: "Le marché des smartphones est saturé. Entre Apple, Samsung, Google et Xiaomi, impossible de s’y retrouver sans guide. On décrypte pour vous les critères qui comptent vraiment.",
    sections: [
      { titre: "Les 3 critères vraiment importants", contenu: "**L’autonomie** est souvent sacrifiée dans les modèles premium — vérifiez la capacité batterie et la charge rapide. **Le suivi logiciel** détermine combien d’années votre téléphone restera sécurisé (Google = 7 ans, Apple = 5-6 ans, Samsung = 4 ans). **La photo** : privilégiez les scores DxO ou les tests réels, pas les mégapixels." },
      { titre: "Moins de 200 €", contenu: "À ce prix : Samsung Galaxy A15 5G ou Xiaomi Redmi 13C. Attendez-vous à des performances basiques, une photo correcte et une durabilité modérée. Parfait comme premier téléphone ou pour usage minimal." },
      { titre: "200 € – 500 €", contenu: "La zone la plus intéressante. Google Pixel 8a pour la meilleure photo de la gamme, Samsung Galaxy A55 pour la durabilité et les mises à jour longues." },
      { titre: "Plus de 500 €", contenu: "iPhone 16 Pro Max ou Samsung Galaxy S25 Ultra pour le meilleur absolu. Google Pixel 9 Pro pour la photo IA. Xiaomi 14T Pro pour le meilleur rapport performance/prix premium." }
    ]
  },
  {
    slug: "quel-aspirateur-sans-fil-choisir",
    titre: "Quel aspirateur sans fil choisir en 2025 ?",
    description: "Guide d’achat complet : Dyson, Miele, iRobot ou Rowenta — lequel pour vous ?",
    categorieSlug: "maison",
    intro: "Aspirateur sans fil ou robot aspirateur ? Dyson ou Miele ? On vous aide à choisir selon votre type de logement et vos besoins réels.",
    sections: [
      { titre: "Sans fil vs robot : lequel choisir ?", contenu: "**Sans fil** si vous avez différentes surfaces (moquette + parquet) et des recoins. **Robot** si vous voulez déléguer l’entretien quotidien. Les deux sont complémentaires pour une maison optimale." },
      { titre: "Moins de 200 €", contenu: "Rowenta X-Pert 6.60 ou iRobot Roomba e5. Pour usage occasionnel ou petits espaces. Durabilité inférieure aux modèles premium." },
      { titre: "200 € – 500 €", contenu: "Miele Triflex HX1 pour la durabilité légendaire, Dyson V8 pour l’aspiration, ou iRobot Roomba i5+ pour le robot avec vidage auto." },
      { titre: "Plus de 500 €", contenu: "Dyson V15 Detect pour la puissance et la détection laser, Miele Triflex HX2 Pro pour la fiabilité 20 ans, iRobot j9+ pour l’autonomie robot maximale." }
    ]
  },
  {
    slug: "quelle-friteuse-a-air-choisir",
    titre: "Quelle friteuse à air choisir en 2025 ?",
    description: "Ninja, Philips, Cosori ou Tefal ? Le guide pour choisir la bonne friteuse à air selon votre budget.",
    categorieSlug: "cuisine",
    intro: "La friteuse à air a envahi les cuisines françaises. Mais toutes ne se valent pas. Capacité, facilité de nettoyage, connectivité : voici ce qui différencie vraiment les modèles.",
    sections: [
      { titre: "Quelle capacité choisir ?", contenu: "Moins de 4 L pour 1-2 personnes. Entre 4 et 6 L pour 2-4 personnes. Plus de 6 L pour les familles ou la cuisson en grande quantité. Les modèles double zone (Ninja) permettent de cuire deux plats simultanément." },
      { titre: "Moins de 100 €", contenu: "Ninja AF101, Philips HD9252 ou Cosori Mini 3.8L. Fiables et efficaces pour débuter." },
      { titre: "100 € – 200 €", contenu: "Cosori Pro LE 5.5L connecté ou Philips XL HD9250. Excellent pour les familles de 2-4 personnes." },
      { titre: "Plus de 200 €", contenu: "Ninja Dual Zone AF400 pour cuire deux plats simultanément, Philips XXL HD9870 pour la famille nombreuse connectée." }
    ]
  },
  {
    slug: "quelle-montre-connectee-choisir",
    titre: "Quelle montre connectée choisir pour le sport en 2025 ?",
    description: "Garmin, Apple Watch, Samsung ou Polar ? On compare les meilleures montres sport du marché.",
    categorieSlug: "sport",
    intro: "Choisir sa montre connectée sport dépend avant tout de votre smartphone (iOS ou Android) et de votre niveau sportif. Voici comment démêler l’offre.",
    sections: [
      { titre: "iOS ou Android : le premier critère", contenu: "L’Apple Watch ne fonctionne qu’avec l’iPhone. Garmin et Polar sont compatibles iOS et Android. Samsung Watch fonctionne mieux avec Samsung. Ce critère alone peut trancher votre choix." },
      { titre: "Sportif débutant", contenu: "Garmin Vivoactive 5, Apple Watch SE 2 ou Polar Ignite 3. Ces modèles couvrent tous les sports du quotidien avec suivi santé complet." },
      { titre: "Sportif régulier", contenu: "Garmin Forerunner 965, Apple Watch Series 10 ou Polar Vantage V3. GPS précis, suivi récupération, longue autonomie." },
      { titre: "Sportif expert/compétition", contenu: "Garmin Fenix 8 Solar ou Polar Grit X2 Pro pour l’endurance. Apple Watch Ultra 2 pour les adeptes iOS." }
    ]
  },
  {
    slug: "quel-epilateur-choisir",
    titre: "Quel épilateur choisir en 2025 ?",
    description: "Électrique, IPL ou lisseur ? Braun, Philips Lumea ou Remington — notre guide complet.",
    categorieSlug: "beaute",
    intro: "Épilation électrique, lumière pulsée (IPL) ou lisseur capillaire ? Les besoins varient. On vous aide à choisir selon votre type de peau, vos zones à traiter et votre budget.",
    sections: [
      { titre: "Électrique vs IPL : quelle différence ?", contenu: "**Épilateur électrique** : résultats immédiats, poils fins repoussent en 2-4 semaines. **IPL** : résultats progressifs sur 8 semaines mais durables plusieurs mois. L’IPL est inefficace sur peau foncée et poils clairs." },
      { titre: "Moins de 100 €", contenu: "Braun Silk-épil 3 ou Philips Satinelle Essential. Bien pour commencer, 20 pinces, usage sec." },
      { titre: "100 € – 250 €", contenu: "Braun Silk-épil 5 Flex ou 9 Flex pour l’électrique. Remington IPL4000 pour commencer l’IPL sans budget pro." },
      { titre: "Plus de 250 €", contenu: "Philips Lumea Prestige BRI956 pour les meilleurs résultats IPL à domicile. Braun Silk-épil 9 Flex pour l’épilation électrique haut de gamme." }
    ]
  }
];
function getCategorieBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
function getMarquesByCategorie(categorieSlug) {
  return marques.filter((m) => m.categorieSlug === categorieSlug);
}
function getMarqueBySlug(slug) {
  return marques.find((m) => m.slug === slug);
}
function getProduitsByMarque(marqueSlug) {
  return produits.filter((p) => p.marqueSlug === marqueSlug);
}
function getProduitBySlug(slug) {
  return produits.find((p) => p.slug === slug);
}
function getGuideBySlug(slug) {
  return guides.find((g) => g.slug === slug);
}
function getGuidesByCategorie(categorieSlug) {
  return guides.filter((g) => g.categorieSlug === categorieSlug);
}
function scoreComposite(p, priorite) {
  const qualScore = (p.qualite + p.durabilite + p.fiabilite) / 3;
  if (priorite === "qualite") return qualScore;
  if (priorite === "prix") return 5 - p.prix / 2e3 * 5;
  return qualScore * 0.6 + (5 - p.prix / 2e3 * 5) * 0.4;
}
function recommanderChoixExpress(categorieSlug, budget, priorite) {
  const pool = produits.filter(
    (p) => p.categorieSlug === categorieSlug && p.prix <= budget
  );
  if (pool.length === 0) return null;
  return pool.sort((a, b) => scoreComposite(b, priorite) - scoreComposite(a, priorite))[0];
}
const CATEGORIE_WEIGHTS = {
  enfant: { "cuisine": 2, "sport": 2, "maison": 1, "high-tech": 0.5, "beaute": 0 },
  ado: { "high-tech": 3, "sport": 2, "beaute": 1.5, "cuisine": 0.5, "maison": 0 },
  adulte: { "high-tech": 2, "maison": 2, "cuisine": 2, "sport": 2, "beaute": 2 },
  senior: { "maison": 3, "cuisine": 3, "sport": 1, "high-tech": 0.5, "beaute": 1 }
};
const TECH_WEIGHTS = {
  debutant: { "high-tech": 0.3, "maison": 1.5, "cuisine": 1.5, "sport": 1, "beaute": 1.5 },
  moyen: { "high-tech": 1, "maison": 1, "cuisine": 1, "sport": 1, "beaute": 1 },
  expert: { "high-tech": 2, "maison": 1, "cuisine": 1, "sport": 1.5, "beaute": 1 }
};
function recommanderCadeau(profile) {
  const { age, budget, niveauTech } = profile;
  const catW = CATEGORIE_WEIGHTS[age] ?? CATEGORIE_WEIGHTS.adulte;
  const techW = TECH_WEIGHTS[niveauTech] ?? TECH_WEIGHTS.moyen;
  const scored = produits.filter((p) => p.prix <= budget).map((p) => ({
    produit: p,
    score: scoreComposite(p, "equilibre") * (catW[p.categorieSlug] ?? 1) * (techW[p.categorieSlug] ?? 1)
  })).sort((a, b) => b.score - a.score);
  const seen = /* @__PURE__ */ new Set();
  const results = [];
  for (const { produit } of scored) {
    if (!seen.has(produit.categorieSlug)) {
      seen.add(produit.categorieSlug);
      results.push(produit);
    }
    if (results.length >= 3) break;
  }
  return results;
}

export { getCategorieBySlug as a, guides as b, getMarquesByCategorie as c, getGuidesByCategorie as d, getProduitsByMarque as e, categories as f, getGuideBySlug as g, recommanderChoixExpress as h, getMarqueBySlug as i, getProduitBySlug as j, marques as m, produits as p, recommanderCadeau as r };
