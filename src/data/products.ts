import type { Category, Brand, Product } from '../types/db';

// Définition des catégories avec leurs marques
export const categories: Category[] = [
    {
        slug: "high-tech",
        name: "High-Tech",
        description: "Découvrez les meilleurs produits high-tech : smartphones, ordinateurs, tablettes et accessoires.",
        icon: "💻",
        brands: [],
        productTypes: ["smartphone", "ordinateur", "tablette", "ecouteurs"]
    },
    {
        slug: "maison",
        name: "Maison",
        description: "Équipez votre maison avec les meilleurs appareils : aspirateurs, purificateurs d'air et plus.",
        icon: "🏠",
        brands: [],
        productTypes: ["aspirateur", "purificateur", "climatiseur", "chauffage"]
    },
    {
        slug: "cuisine",
        name: "Cuisine",
        description: "Les meilleurs équipements de cuisine : robots, mixeurs, machines à café et plus.",
        icon: "🍳",
        brands: [],
        productTypes: ["robot-cuisine", "mixeur", "machine-cafe", "four"]
    },
    {
        slug: "sport",
        name: "Sport",
        description: "Équipements sportifs de qualité : fitness, vélo, running et accessoires connectés.",
        icon: "⚽",
        brands: [],
        productTypes: ["velo", "tapis-course", "montre-sport", "halteres"]
    },
    {
        slug: "beaute",
        name: "Beauté",
        description: "Les meilleurs produits beauté et soins : sèche-cheveux, épilateurs et soins de la peau.",
        icon: "💄",
        brands: [],
        productTypes: ["seche-cheveux", "epilateur", "brosse-dents", "rasoir"]
    }
];

// Définition des marques par catégorie
export const brands: Brand[] = [
    // High-Tech
    { slug: "apple", name: "Apple", category: "high-tech", description: "Leader mondial des smartphones et ordinateurs premium avec l'iPhone, iPad et Mac." },
    { slug: "samsung", name: "Samsung", category: "high-tech", description: "Géant coréen de l'électronique proposant smartphones, tablettes et accessoires innovants." },
    { slug: "sony", name: "Sony", category: "high-tech", description: "Excellence japonaise en audio, écouteurs et accessoires high-tech." },
    { slug: "xiaomi", name: "Xiaomi", category: "high-tech", description: "Rapport qualité-prix imbattable pour smartphones et accessoires connectés." },

    // Maison
    { slug: "dyson", name: "Dyson", category: "maison", description: "Aspirateurs et purificateurs d'air révolutionnaires avec technologie cyclonique." },
    { slug: "philips", name: "Philips", category: "maison", description: "Large gamme d'électroménager fiable et innovant pour la maison." },
    { slug: "rowenta", name: "Rowenta", category: "maison", description: "Spécialiste français des appareils ménagers de qualité." },
    { slug: "irobot", name: "iRobot", category: "maison", description: "Leader des robots aspirateurs avec la gamme Roomba." },

    // Cuisine
    { slug: "thermomix", name: "Thermomix", category: "cuisine", description: "Le robot de cuisine multifonction par excellence." },
    { slug: "kitchenaid", name: "KitchenAid", category: "cuisine", description: "Robots pâtissiers iconiques et équipements de cuisine premium." },
    { slug: "moulinex", name: "Moulinex", category: "cuisine", description: "Électroménager de cuisine accessible et polyvalent." },
    { slug: "delonghi", name: "De'Longhi", category: "cuisine", description: "Excellence italienne pour machines à café et petits électroménagers." },

    // Sport
    { slug: "garmin", name: "Garmin", category: "sport", description: "Montres GPS et accessoires pour sportifs exigeants." },
    { slug: "decathlon", name: "Decathlon", category: "sport", description: "Équipements sportifs accessibles avec un excellent rapport qualité-prix." },
    { slug: "nike", name: "Nike", category: "sport", description: "Leader mondial des équipements et vêtements de sport." },
    { slug: "peloton", name: "Peloton", category: "sport", description: "Vélos et tapis de course connectés avec coaching interactif." },

    // Beauté
    { slug: "dyson-beaute", name: "Dyson", category: "beaute", description: "Technologies révolutionnaires pour le soin des cheveux." },
    { slug: "ghd", name: "GHD", category: "beaute", description: "Lisseurs et outils de coiffure professionnels." },
    { slug: "philips-beaute", name: "Philips", category: "beaute", description: "Large gamme de produits de soin et beauté." },
    { slug: "oral-b", name: "Oral-B", category: "beaute", description: "Leader des brosses à dents électriques et hygiène bucco-dentaire." }
];

// Produits par catégorie, marque et type
export const products: Product[] = [
    // ===== HIGH-TECH =====
    // Apple - Smartphones
    {
        id: "1",
        name: "iPhone 15 Pro Max",
        description: "Le smartphone le plus puissant d'Apple avec puce A17 Pro et titane.",
        price: 1479,
        image_url: "/images/products/iphone-15-pro-max.jpg",
        category: "high-tech",
        brand: "apple",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 5,
        product_type: "smartphone",
        tier: "best-value"
    },
    {
        id: "2",
        name: "iPhone 15",
        description: "L'iPhone accessible avec Dynamic Island et USB-C.",
        price: 969,
        image_url: "/images/products/iphone-15.jpg",
        category: "high-tech",
        brand: "apple",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 5,
        product_type: "smartphone",
        tier: "mid-range"
    },
    {
        id: "3",
        name: "iPhone SE (3ème génération)",
        description: "L'iPhone le plus abordable avec puce A15 Bionic.",
        price: 529,
        image_url: "/images/products/iphone-se.jpg",
        category: "high-tech",
        brand: "apple",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 5,
        product_type: "smartphone",
        tier: "budget"
    },

    // Samsung - Smartphones
    {
        id: "4",
        name: "Samsung Galaxy S24 Ultra",
        description: "Le flagship Samsung avec S Pen intégré et IA Galaxy AI.",
        price: 1469,
        image_url: "/images/products/galaxy-s24-ultra.jpg",
        category: "high-tech",
        brand: "samsung",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 4,
        service_rating: 4,
        product_type: "smartphone",
        tier: "best-value"
    },
    {
        id: "5",
        name: "Samsung Galaxy S24",
        description: "Smartphone premium compact avec écran Dynamic AMOLED.",
        price: 899,
        image_url: "/images/products/galaxy-s24.jpg",
        category: "high-tech",
        brand: "samsung",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "smartphone",
        tier: "mid-range"
    },
    {
        id: "6",
        name: "Samsung Galaxy A54",
        description: "Excellent rapport qualité-prix avec écran 120Hz.",
        price: 449,
        image_url: "/images/products/galaxy-a54.jpg",
        category: "high-tech",
        brand: "samsung",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "smartphone",
        tier: "budget"
    },

    // Sony - Écouteurs
    {
        id: "7",
        name: "Sony WH-1000XM5",
        description: "Le casque à réduction de bruit le plus performant du marché.",
        price: 379,
        image_url: "/images/products/sony-wh1000xm5.jpg",
        category: "high-tech",
        brand: "sony",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 4,
        product_type: "ecouteurs",
        tier: "best-value"
    },
    {
        id: "8",
        name: "Sony WF-1000XM5",
        description: "Écouteurs true wireless avec ANC exceptionnelle.",
        price: 299,
        image_url: "/images/products/sony-wf1000xm5.jpg",
        category: "high-tech",
        brand: "sony",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "ecouteurs",
        tier: "mid-range"
    },
    {
        id: "9",
        name: "Sony WH-CH720N",
        description: "Casque léger avec réduction de bruit à prix accessible.",
        price: 149,
        image_url: "/images/products/sony-ch720n.jpg",
        category: "high-tech",
        brand: "sony",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "ecouteurs",
        tier: "budget"
    },

    // Xiaomi - Smartphones
    {
        id: "10",
        name: "Xiaomi 14 Ultra",
        description: "Flagship avec optiques Leica et performances extrêmes.",
        price: 1299,
        image_url: "/images/products/xiaomi-14-ultra.jpg",
        category: "high-tech",
        brand: "xiaomi",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 3,
        product_type: "smartphone",
        tier: "best-value"
    },
    {
        id: "11",
        name: "Xiaomi 14",
        description: "Compact et puissant avec Snapdragon 8 Gen 3.",
        price: 799,
        image_url: "/images/products/xiaomi-14.jpg",
        category: "high-tech",
        brand: "xiaomi",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 3,
        product_type: "smartphone",
        tier: "mid-range"
    },
    {
        id: "12",
        name: "Xiaomi Redmi Note 13 Pro",
        description: "Le roi du rapport qualité-prix avec écran AMOLED 120Hz.",
        price: 299,
        image_url: "/images/products/redmi-note-13-pro.jpg",
        category: "high-tech",
        brand: "xiaomi",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 5,
        durability_rating: 3,
        service_rating: 3,
        product_type: "smartphone",
        tier: "budget"
    },

    // ===== MAISON =====
    // Dyson - Aspirateurs
    {
        id: "13",
        name: "Dyson V15 Detect",
        description: "Aspirateur balai avec laser de détection des poussières.",
        price: 699,
        image_url: "/images/products/dyson-v15.jpg",
        category: "maison",
        brand: "dyson",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "best-value"
    },
    {
        id: "14",
        name: "Dyson V12 Detect Slim",
        description: "Version compacte et légère avec détection laser.",
        price: 549,
        image_url: "/images/products/dyson-v12.jpg",
        category: "maison",
        brand: "dyson",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "mid-range"
    },
    {
        id: "15",
        name: "Dyson V8 Origin",
        description: "L'aspirateur Dyson le plus accessible.",
        price: 349,
        image_url: "/images/products/dyson-v8.jpg",
        category: "maison",
        brand: "dyson",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "budget"
    },

    // iRobot - Aspirateurs robots
    {
        id: "16",
        name: "iRobot Roomba j9+",
        description: "Robot aspirateur intelligent avec vidage automatique.",
        price: 899,
        image_url: "/images/products/roomba-j9.jpg",
        category: "maison",
        brand: "irobot",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 4,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "best-value"
    },
    {
        id: "17",
        name: "iRobot Roomba i5+",
        description: "Robot aspirateur efficace avec base de vidage.",
        price: 549,
        image_url: "/images/products/roomba-i5.jpg",
        category: "maison",
        brand: "irobot",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "mid-range"
    },
    {
        id: "18",
        name: "iRobot Roomba Combo Essential",
        description: "Robot aspirateur et laveur abordable.",
        price: 299,
        image_url: "/images/products/roomba-essential.jpg",
        category: "maison",
        brand: "irobot",
        created_at: new Date().toISOString(),
        quality_rating: 3,
        price_rating: 4,
        durability_rating: 3,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "budget"
    },

    // Philips - Purificateurs
    {
        id: "19",
        name: "Philips AC4236/10",
        description: "Purificateur d'air premium pour grandes pièces.",
        price: 549,
        image_url: "/images/products/philips-ac4236.jpg",
        category: "maison",
        brand: "philips",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 4,
        product_type: "purificateur",
        tier: "best-value"
    },
    {
        id: "20",
        name: "Philips AC2889/10",
        description: "Purificateur connecté avec app smartphone.",
        price: 399,
        image_url: "/images/products/philips-ac2889.jpg",
        category: "maison",
        brand: "philips",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "purificateur",
        tier: "mid-range"
    },
    {
        id: "21",
        name: "Philips AC0830/10",
        description: "Purificateur compact et silencieux.",
        price: 199,
        image_url: "/images/products/philips-ac0830.jpg",
        category: "maison",
        brand: "philips",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "purificateur",
        tier: "budget"
    },

    // Rowenta - Aspirateurs
    {
        id: "22",
        name: "Rowenta X-Force Flex 14.60",
        description: "Aspirateur balai ultra-puissant sans fil.",
        price: 549,
        image_url: "/images/products/rowenta-xforce.jpg",
        category: "maison",
        brand: "rowenta",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "best-value"
    },
    {
        id: "23",
        name: "Rowenta X-Force Flex 11.60",
        description: "Bon rapport qualité-prix avec tube flexible.",
        price: 399,
        image_url: "/images/products/rowenta-xforce11.jpg",
        category: "maison",
        brand: "rowenta",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "mid-range"
    },
    {
        id: "24",
        name: "Rowenta Air Force Serenity",
        description: "Aspirateur balai léger et maniable.",
        price: 199,
        image_url: "/images/products/rowenta-serenity.jpg",
        category: "maison",
        brand: "rowenta",
        created_at: new Date().toISOString(),
        quality_rating: 3,
        price_rating: 5,
        durability_rating: 3,
        service_rating: 4,
        product_type: "aspirateur",
        tier: "budget"
    },

    // ===== CUISINE =====
    // Thermomix - Robots cuisine
    {
        id: "25",
        name: "Thermomix TM6",
        description: "Le robot de cuisine multifonction le plus complet.",
        price: 1499,
        image_url: "/images/products/thermomix-tm6.jpg",
        category: "cuisine",
        brand: "thermomix",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 1,
        durability_rating: 5,
        service_rating: 5,
        product_type: "robot-cuisine",
        tier: "best-value"
    },

    // KitchenAid - Robots pâtissiers
    {
        id: "26",
        name: "KitchenAid Artisan 5KSM175",
        description: "Robot pâtissier iconique et polyvalent.",
        price: 649,
        image_url: "/images/products/kitchenaid-artisan.jpg",
        category: "cuisine",
        brand: "kitchenaid",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 5,
        product_type: "robot-cuisine",
        tier: "best-value"
    },
    {
        id: "27",
        name: "KitchenAid Classic 5K45SS",
        description: "Robot pâtissier entrée de gamme fiable.",
        price: 449,
        image_url: "/images/products/kitchenaid-classic.jpg",
        category: "cuisine",
        brand: "kitchenaid",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 5,
        product_type: "robot-cuisine",
        tier: "mid-range"
    },
    {
        id: "28",
        name: "KitchenAid Mini 5KSM3311",
        description: "Version compacte pour petites cuisines.",
        price: 349,
        image_url: "/images/products/kitchenaid-mini.jpg",
        category: "cuisine",
        brand: "kitchenaid",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 5,
        service_rating: 5,
        product_type: "robot-cuisine",
        tier: "budget"
    },

    // Moulinex - Robots cuisine
    {
        id: "29",
        name: "Moulinex Companion XL",
        description: "Robot cuiseur multifonction grand format.",
        price: 799,
        image_url: "/images/products/moulinex-companion-xl.jpg",
        category: "cuisine",
        brand: "moulinex",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "robot-cuisine",
        tier: "best-value"
    },
    {
        id: "30",
        name: "Moulinex Companion",
        description: "Robot cuiseur connecté et polyvalent.",
        price: 599,
        image_url: "/images/products/moulinex-companion.jpg",
        category: "cuisine",
        brand: "moulinex",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "robot-cuisine",
        tier: "mid-range"
    },
    {
        id: "31",
        name: "Moulinex ClickChef",
        description: "Robot cuiseur compact et accessible.",
        price: 349,
        image_url: "/images/products/moulinex-clickchef.jpg",
        category: "cuisine",
        brand: "moulinex",
        created_at: new Date().toISOString(),
        quality_rating: 3,
        price_rating: 5,
        durability_rating: 3,
        service_rating: 4,
        product_type: "robot-cuisine",
        tier: "budget"
    },

    // De'Longhi - Machines à café
    {
        id: "32",
        name: "De'Longhi Eletta Explore",
        description: "Machine à café automatique avec écran tactile.",
        price: 899,
        image_url: "/images/products/delonghi-eletta.jpg",
        category: "cuisine",
        brand: "delonghi",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 4,
        product_type: "machine-cafe",
        tier: "best-value"
    },
    {
        id: "33",
        name: "De'Longhi Magnifica Evo",
        description: "Machine à café automatique compacte.",
        price: 499,
        image_url: "/images/products/delonghi-magnifica.jpg",
        category: "cuisine",
        brand: "delonghi",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "machine-cafe",
        tier: "mid-range"
    },
    {
        id: "34",
        name: "De'Longhi Dedica EC685",
        description: "Machine expresso manuelle compacte.",
        price: 199,
        image_url: "/images/products/delonghi-dedica.jpg",
        category: "cuisine",
        brand: "delonghi",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "machine-cafe",
        tier: "budget"
    },

    // ===== SPORT =====
    // Garmin - Montres sport
    {
        id: "35",
        name: "Garmin Fenix 8",
        description: "Montre GPS multisports haut de gamme.",
        price: 999,
        image_url: "/images/products/garmin-fenix8.jpg",
        category: "sport",
        brand: "garmin",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 4,
        product_type: "montre-sport",
        tier: "best-value"
    },
    {
        id: "36",
        name: "Garmin Forerunner 265",
        description: "Montre GPS running avec écran AMOLED.",
        price: 449,
        image_url: "/images/products/garmin-forerunner265.jpg",
        category: "sport",
        brand: "garmin",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 4,
        product_type: "montre-sport",
        tier: "mid-range"
    },
    {
        id: "37",
        name: "Garmin Forerunner 55",
        description: "Montre GPS running accessible et complète.",
        price: 199,
        image_url: "/images/products/garmin-forerunner55.jpg",
        category: "sport",
        brand: "garmin",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "montre-sport",
        tier: "budget"
    },

    // Decathlon - Vélos
    {
        id: "38",
        name: "Rockrider E-EXPL 700",
        description: "VTT électrique polyvalent et performant.",
        price: 2499,
        image_url: "/images/products/rockrider-expl700.jpg",
        category: "sport",
        brand: "decathlon",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 5,
        product_type: "velo",
        tier: "best-value"
    },
    {
        id: "39",
        name: "Riverside 500E",
        description: "Vélo électrique urbain confortable.",
        price: 1299,
        image_url: "/images/products/riverside-500e.jpg",
        category: "sport",
        brand: "decathlon",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 5,
        product_type: "velo",
        tier: "mid-range"
    },
    {
        id: "40",
        name: "Elops 120E",
        description: "Vélo électrique ville entrée de gamme.",
        price: 799,
        image_url: "/images/products/elops-120e.jpg",
        category: "sport",
        brand: "decathlon",
        created_at: new Date().toISOString(),
        quality_rating: 3,
        price_rating: 5,
        durability_rating: 3,
        service_rating: 5,
        product_type: "velo",
        tier: "budget"
    },

    // Nike - Équipements
    {
        id: "41",
        name: "Nike Air Zoom Pegasus 41",
        description: "Chaussure running polyvalente et confortable.",
        price: 139,
        image_url: "/images/products/nike-pegasus41.jpg",
        category: "sport",
        brand: "nike",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "chaussures",
        tier: "best-value"
    },
    {
        id: "42",
        name: "Nike React Infinity Run 4",
        description: "Chaussure running avec amorti maximal.",
        price: 169,
        image_url: "/images/products/nike-react-infinity.jpg",
        category: "sport",
        brand: "nike",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "chaussures",
        tier: "mid-range"
    },
    {
        id: "43",
        name: "Nike Revolution 7",
        description: "Chaussure running abordable et fiable.",
        price: 69,
        image_url: "/images/products/nike-revolution7.jpg",
        category: "sport",
        brand: "nike",
        created_at: new Date().toISOString(),
        quality_rating: 3,
        price_rating: 5,
        durability_rating: 3,
        service_rating: 4,
        product_type: "chaussures",
        tier: "budget"
    },

    // Peloton - Vélos
    {
        id: "44",
        name: "Peloton Bike+",
        description: "Vélo connecté premium avec écran rotatif.",
        price: 2495,
        image_url: "/images/products/peloton-bikeplus.jpg",
        category: "sport",
        brand: "peloton",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 1,
        durability_rating: 5,
        service_rating: 4,
        product_type: "velo",
        tier: "best-value"
    },
    {
        id: "45",
        name: "Peloton Bike",
        description: "Vélo connecté avec coaching interactif.",
        price: 1445,
        image_url: "/images/products/peloton-bike.jpg",
        category: "sport",
        brand: "peloton",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 4,
        product_type: "velo",
        tier: "mid-range"
    },

    // ===== BEAUTÉ =====
    // Dyson Beauté
    {
        id: "46",
        name: "Dyson Airwrap Complete Long",
        description: "Coiffeur multifonction révolutionnaire.",
        price: 549,
        image_url: "/images/products/dyson-airwrap.jpg",
        category: "beaute",
        brand: "dyson-beaute",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 1,
        durability_rating: 5,
        service_rating: 4,
        product_type: "seche-cheveux",
        tier: "best-value"
    },
    {
        id: "47",
        name: "Dyson Supersonic",
        description: "Sèche-cheveux intelligent et puissant.",
        price: 449,
        image_url: "/images/products/dyson-supersonic.jpg",
        category: "beaute",
        brand: "dyson-beaute",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 4,
        product_type: "seche-cheveux",
        tier: "mid-range"
    },

    // GHD
    {
        id: "48",
        name: "GHD Platinum+ Styler",
        description: "Lisseur intelligent avec prédiction des besoins.",
        price: 279,
        image_url: "/images/products/ghd-platinum.jpg",
        category: "beaute",
        brand: "ghd",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 5,
        service_rating: 5,
        product_type: "lisseur",
        tier: "best-value"
    },
    {
        id: "49",
        name: "GHD Gold Styler",
        description: "Lisseur professionnel polyvalent.",
        price: 219,
        image_url: "/images/products/ghd-gold.jpg",
        category: "beaute",
        brand: "ghd",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 3,
        durability_rating: 5,
        service_rating: 5,
        product_type: "lisseur",
        tier: "mid-range"
    },
    {
        id: "50",
        name: "GHD Original Styler",
        description: "Lisseur classique et fiable.",
        price: 149,
        image_url: "/images/products/ghd-original.jpg",
        category: "beaute",
        brand: "ghd",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 5,
        service_rating: 5,
        product_type: "lisseur",
        tier: "budget"
    },

    // Philips Beauté
    {
        id: "51",
        name: "Philips Lumea Prestige IPL",
        description: "Épilateur à lumière pulsée premium.",
        price: 549,
        image_url: "/images/products/philips-lumea.jpg",
        category: "beaute",
        brand: "philips-beaute",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 2,
        durability_rating: 4,
        service_rating: 4,
        product_type: "epilateur",
        tier: "best-value"
    },
    {
        id: "52",
        name: "Philips Satinelle Prestige",
        description: "Épilateur électrique polyvalent.",
        price: 149,
        image_url: "/images/products/philips-satinelle.jpg",
        category: "beaute",
        brand: "philips-beaute",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 4,
        durability_rating: 4,
        service_rating: 4,
        product_type: "epilateur",
        tier: "mid-range"
    },
    {
        id: "53",
        name: "Philips Satinelle Essential",
        description: "Épilateur d'entrée de gamme efficace.",
        price: 49,
        image_url: "/images/products/philips-satinelle-essential.jpg",
        category: "beaute",
        brand: "philips-beaute",
        created_at: new Date().toISOString(),
        quality_rating: 3,
        price_rating: 5,
        durability_rating: 3,
        service_rating: 4,
        product_type: "epilateur",
        tier: "budget"
    },

    // Oral-B
    {
        id: "54",
        name: "Oral-B iO Series 10",
        description: "Brosse à dents électrique avec IA.",
        price: 449,
        image_url: "/images/products/oralb-io10.jpg",
        category: "beaute",
        brand: "oral-b",
        created_at: new Date().toISOString(),
        quality_rating: 5,
        price_rating: 1,
        durability_rating: 4,
        service_rating: 4,
        product_type: "brosse-dents",
        tier: "best-value"
    },
    {
        id: "55",
        name: "Oral-B iO Series 6",
        description: "Brosse à dents électrique connectée.",
        price: 199,
        image_url: "/images/products/oralb-io6.jpg",
        category: "beaute",
        brand: "oral-b",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 3,
        durability_rating: 4,
        service_rating: 4,
        product_type: "brosse-dents",
        tier: "mid-range"
    },
    {
        id: "56",
        name: "Oral-B Pro 3",
        description: "Brosse à dents électrique accessible.",
        price: 69,
        image_url: "/images/products/oralb-pro3.jpg",
        category: "beaute",
        brand: "oral-b",
        created_at: new Date().toISOString(),
        quality_rating: 4,
        price_rating: 5,
        durability_rating: 4,
        service_rating: 4,
        product_type: "brosse-dents",
        tier: "budget"
    }
];

// Fonctions utilitaires
export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.slug === slug);
}

export function getBrandsByCategory(categorySlug: string): Brand[] {
    return brands.filter(b => b.category === categorySlug);
}

export function getBrandBySlug(slug: string): Brand | undefined {
    return brands.find(b => b.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
    return products.filter(p => p.category === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
    return products.filter(p => p.brand === brandSlug);
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByTier(tier: 'budget' | 'mid-range' | 'best-value'): Product[] {
    return products.filter(p => p.tier === tier);
}

export function getProductsByCategoryAndBrand(categorySlug: string, brandSlug: string): Product[] {
    return products.filter(p => p.category === categorySlug && p.brand === brandSlug);
}

// Fonction pour obtenir les étoiles en emoji
export function getRatingStars(rating: number): string {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Fonction pour obtenir le prix en emoji
export function getPriceEmoji(rating: number): string {
    return '💸'.repeat(rating);
}

// Fonction pour formater le prix
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

// Fonction pour obtenir le label du tier
export function getTierLabel(tier: string): { label: string; color: string } {
    switch (tier) {
        case 'best-value':
            return { label: 'Meilleur rapport qualité/prix', color: 'bg-green-500' };
        case 'mid-range':
            return { label: 'Milieu de gamme', color: 'bg-blue-500' };
        case 'budget':
            return { label: 'Budget / Entrée de gamme', color: 'bg-orange-500' };
        default:
            return { label: tier, color: 'bg-gray-500' };
    }
}
