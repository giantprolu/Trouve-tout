/**
 * Structure hiérarchique des données
 * Catégorie → Marques → Types de produits → Produits (via Amazon API)
 */

// Types pour la structure hiérarchique
export interface ProductType {
    slug: string;
    name: string;
    icon: string;
    description: string;
    amazonKeywords: string; // Mots-clés pour la recherche Amazon
}

export interface Brand {
    slug: string;
    name: string;
    logo?: string;
    description: string;
    productTypes: ProductType[];
}

export interface Category {
    slug: string;
    name: string;
    icon: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    brands: Brand[];
}

// ==========================================
// DÉFINITION DES CATÉGORIES ET HIÉRARCHIE
// ==========================================

export const categories: Category[] = [
    // ===== HIGH-TECH =====
    {
        slug: "high-tech",
        name: "High-Tech",
        icon: "💻",
        description: "Découvrez les meilleurs produits high-tech : smartphones, ordinateurs, tablettes et accessoires.",
        metaTitle: "High-Tech - Meilleurs Smartphones, PC & Accessoires | Trouve-Tout",
        metaDescription: "Comparatif des meilleurs produits high-tech. Smartphones, ordinateurs, tablettes, écouteurs. Trouvez le meilleur rapport qualité-prix.",
        brands: [
            {
                slug: "apple",
                name: "Apple",
                description: "Leader mondial des smartphones et ordinateurs premium avec l'iPhone, iPad et Mac.",
                productTypes: [
                    { slug: "smartphone", name: "Smartphones", icon: "📱", description: "iPhone - Les smartphones les plus populaires au monde", amazonKeywords: "Apple iPhone" },
                    { slug: "ordinateur", name: "Ordinateurs", icon: "💻", description: "MacBook - Ordinateurs portables premium", amazonKeywords: "Apple MacBook" },
                    { slug: "tablette", name: "Tablettes", icon: "📲", description: "iPad - Tablettes polyvalentes et puissantes", amazonKeywords: "Apple iPad" },
                    { slug: "ecouteurs", name: "Écouteurs", icon: "🎧", description: "AirPods - Écouteurs sans fil iconiques", amazonKeywords: "Apple AirPods" },
                    { slug: "montre-connectee", name: "Montres", icon: "⌚", description: "Apple Watch - La montre connectée de référence", amazonKeywords: "Apple Watch" }
                ]
            },
            {
                slug: "samsung",
                name: "Samsung",
                description: "Géant coréen de l'électronique proposant smartphones, tablettes et accessoires innovants.",
                productTypes: [
                    { slug: "smartphone", name: "Smartphones", icon: "📱", description: "Galaxy S & Z - Smartphones Android haut de gamme", amazonKeywords: "Samsung Galaxy smartphone" },
                    { slug: "tablette", name: "Tablettes", icon: "📲", description: "Galaxy Tab - Tablettes Android performantes", amazonKeywords: "Samsung Galaxy Tab" },
                    { slug: "ecouteurs", name: "Écouteurs", icon: "🎧", description: "Galaxy Buds - Écouteurs true wireless", amazonKeywords: "Samsung Galaxy Buds" },
                    { slug: "montre-connectee", name: "Montres", icon: "⌚", description: "Galaxy Watch - Montres connectées Wear OS", amazonKeywords: "Samsung Galaxy Watch" }
                ]
            },
            {
                slug: "sony",
                name: "Sony",
                description: "Excellence japonaise en audio, écouteurs et accessoires high-tech.",
                productTypes: [
                    { slug: "ecouteurs", name: "Casques Audio", icon: "🎧", description: "WH-1000XM - Référence de la réduction de bruit", amazonKeywords: "Sony WH-1000XM casque" },
                    { slug: "ecouteurs-intra", name: "Écouteurs Intra", icon: "🎵", description: "WF-1000XM - Écouteurs true wireless premium", amazonKeywords: "Sony WF-1000XM écouteurs" },
                    { slug: "enceinte", name: "Enceintes", icon: "🔊", description: "Enceintes Bluetooth portables", amazonKeywords: "Sony enceinte bluetooth" }
                ]
            },
            {
                slug: "xiaomi",
                name: "Xiaomi",
                description: "Rapport qualité-prix imbattable pour smartphones et accessoires connectés.",
                productTypes: [
                    { slug: "smartphone", name: "Smartphones", icon: "📱", description: "Xiaomi & Redmi - Smartphones accessibles", amazonKeywords: "Xiaomi smartphone" },
                    { slug: "ecouteurs", name: "Écouteurs", icon: "🎧", description: "Écouteurs Bluetooth abordables", amazonKeywords: "Xiaomi écouteurs bluetooth" },
                    { slug: "montre-connectee", name: "Montres", icon: "⌚", description: "Montres connectées petit budget", amazonKeywords: "Xiaomi montre connectée" },
                    { slug: "trottinette", name: "Trottinettes", icon: "🛴", description: "Trottinettes électriques", amazonKeywords: "Xiaomi trottinette électrique" }
                ]
            }
        ]
    },

    // ===== MAISON =====
    {
        slug: "maison",
        name: "Maison",
        icon: "🏠",
        description: "Équipez votre maison avec les meilleurs appareils : aspirateurs, purificateurs d'air et plus.",
        metaTitle: "Maison - Meilleurs Aspirateurs & Électroménager | Trouve-Tout",
        metaDescription: "Comparatif des meilleurs équipements maison. Aspirateurs, robots, purificateurs d'air. Trouvez le produit idéal pour votre intérieur.",
        brands: [
            {
                slug: "dyson",
                name: "Dyson",
                description: "Aspirateurs et purificateurs d'air révolutionnaires avec technologie cyclonique.",
                productTypes: [
                    { slug: "aspirateur-balai", name: "Aspirateurs Balai", icon: "🧹", description: "V15, V12, V8 - Aspirateurs sans fil puissants", amazonKeywords: "Dyson aspirateur balai sans fil" },
                    { slug: "purificateur", name: "Purificateurs", icon: "🌬️", description: "Purificateurs et ventilateurs", amazonKeywords: "Dyson purificateur air" },
                    { slug: "seche-cheveux", name: "Sèche-cheveux", icon: "💇", description: "Supersonic - Sèche-cheveux premium", amazonKeywords: "Dyson Supersonic" }
                ]
            },
            {
                slug: "irobot",
                name: "iRobot",
                description: "Leader des robots aspirateurs avec la gamme Roomba.",
                productTypes: [
                    { slug: "aspirateur-robot", name: "Robots Aspirateurs", icon: "🤖", description: "Roomba - Robots aspirateurs intelligents", amazonKeywords: "iRobot Roomba" },
                    { slug: "robot-laveur", name: "Robots Laveurs", icon: "💧", description: "Braava - Robots laveurs de sol", amazonKeywords: "iRobot Braava" }
                ]
            },
            {
                slug: "rowenta",
                name: "Rowenta",
                description: "Spécialiste français des appareils ménagers de qualité.",
                productTypes: [
                    { slug: "aspirateur-balai", name: "Aspirateurs Balai", icon: "🧹", description: "X-Force Flex - Aspirateurs puissants", amazonKeywords: "Rowenta X-Force aspirateur" },
                    { slug: "fer-repasser", name: "Fers à Repasser", icon: "👔", description: "Fers et centrales vapeur", amazonKeywords: "Rowenta fer à repasser" },
                    { slug: "ventilateur", name: "Ventilateurs", icon: "🌀", description: "Ventilateurs et climatiseurs", amazonKeywords: "Rowenta ventilateur" }
                ]
            },
            {
                slug: "philips",
                name: "Philips",
                description: "Large gamme d'électroménager fiable et innovant pour la maison.",
                productTypes: [
                    { slug: "purificateur", name: "Purificateurs", icon: "🌬️", description: "Purificateurs d'air connectés", amazonKeywords: "Philips purificateur air" },
                    { slug: "aspirateur", name: "Aspirateurs", icon: "🧹", description: "Aspirateurs traîneaux et balais", amazonKeywords: "Philips aspirateur" },
                    { slug: "eclairage", name: "Éclairage", icon: "💡", description: "Philips Hue - Éclairage connecté", amazonKeywords: "Philips Hue ampoule" }
                ]
            }
        ]
    },

    // ===== CUISINE =====
    {
        slug: "cuisine",
        name: "Cuisine",
        icon: "🍳",
        description: "Les meilleurs équipements de cuisine : robots, mixeurs, machines à café et plus.",
        metaTitle: "Cuisine - Meilleurs Robots & Électroménager | Trouve-Tout",
        metaDescription: "Comparatif des meilleurs équipements cuisine. Robots multifonctions, machines à café, mixeurs. Cuisinez comme un chef !",
        brands: [
            {
                slug: "thermomix",
                name: "Thermomix",
                description: "Le robot de cuisine multifonction par excellence.",
                productTypes: [
                    { slug: "robot-cuisine", name: "Robots Cuisine", icon: "🤖", description: "TM6 - Le robot cuiseur ultime", amazonKeywords: "Thermomix TM6" }
                ]
            },
            {
                slug: "kitchenaid",
                name: "KitchenAid",
                description: "Robots pâtissiers iconiques et équipements de cuisine premium.",
                productTypes: [
                    { slug: "robot-patissier", name: "Robots Pâtissiers", icon: "🎂", description: "Artisan - Robots pâtissiers iconiques", amazonKeywords: "KitchenAid Artisan robot" },
                    { slug: "mixeur", name: "Blenders", icon: "🥤", description: "Blenders professionnels", amazonKeywords: "KitchenAid blender" },
                    { slug: "accessoires", name: "Accessoires", icon: "🔧", description: "Accessoires pour robots", amazonKeywords: "KitchenAid accessoire" }
                ]
            },
            {
                slug: "moulinex",
                name: "Moulinex",
                description: "Électroménager de cuisine accessible et polyvalent.",
                productTypes: [
                    { slug: "robot-cuisine", name: "Robots Cuiseurs", icon: "🤖", description: "Companion - Robots cuiseurs connectés", amazonKeywords: "Moulinex Companion" },
                    { slug: "friteuse", name: "Friteuses", icon: "🍟", description: "Easy Fry - Friteuses sans huile", amazonKeywords: "Moulinex Easy Fry friteuse" },
                    { slug: "mixeur", name: "Blenders", icon: "🥤", description: "Blenders et mixeurs", amazonKeywords: "Moulinex blender" }
                ]
            },
            {
                slug: "delonghi",
                name: "De'Longhi",
                description: "Excellence italienne pour machines à café et petits électroménagers.",
                productTypes: [
                    { slug: "machine-cafe-auto", name: "Machines Auto", icon: "☕", description: "Machines à café automatiques avec broyeur", amazonKeywords: "Delonghi machine café automatique" },
                    { slug: "machine-cafe-manuelle", name: "Machines Manuelles", icon: "☕", description: "Machines expresso manuelles", amazonKeywords: "Delonghi machine expresso" },
                    { slug: "bouilloire", name: "Bouilloires", icon: "🫖", description: "Bouilloires design", amazonKeywords: "Delonghi bouilloire" }
                ]
            },
            {
                slug: "philips-cuisine",
                name: "Philips",
                description: "Airfryers innovants et équipements de cuisine intelligents.",
                productTypes: [
                    { slug: "airfryer", name: "Airfryers", icon: "🍟", description: "Friteuses sans huile RapidAir", amazonKeywords: "Philips Airfryer" }
                ]
            }
        ]
    },

    // ===== SPORT =====
    {
        slug: "sport",
        name: "Sport",
        icon: "⚽",
        description: "Équipements sportifs de qualité : fitness, vélo, running et accessoires connectés.",
        metaTitle: "Sport - Meilleurs Équipements & Montres GPS | Trouve-Tout",
        metaDescription: "Comparatif des meilleurs équipements sportifs. Montres GPS, vélos, tapis de course. Atteignez vos objectifs !",
        brands: [
            {
                slug: "garmin",
                name: "Garmin",
                description: "Montres GPS et accessoires pour sportifs exigeants.",
                productTypes: [
                    { slug: "montre-running", name: "Montres Running", icon: "🏃", description: "Forerunner - Montres GPS pour coureurs", amazonKeywords: "Garmin Forerunner montre" },
                    { slug: "montre-outdoor", name: "Montres Outdoor", icon: "🏔️", description: "Fenix - Montres GPS multisports", amazonKeywords: "Garmin Fenix" },
                    { slug: "compteur-velo", name: "Compteurs Vélo", icon: "🚴", description: "Edge - Compteurs GPS vélo", amazonKeywords: "Garmin Edge compteur" }
                ]
            },
            {
                slug: "polar",
                name: "Polar",
                description: "Spécialiste finlandais des montres et capteurs cardio.",
                productTypes: [
                    { slug: "montre-sport", name: "Montres Sport", icon: "⌚", description: "Vantage & Grit X - Montres multisports", amazonKeywords: "Polar montre sport" },
                    { slug: "capteur-cardio", name: "Capteurs Cardio", icon: "❤️", description: "Ceintures cardio précises", amazonKeywords: "Polar ceinture cardio" }
                ]
            },
            {
                slug: "decathlon",
                name: "Decathlon",
                description: "Équipements sportifs accessibles avec un excellent rapport qualité-prix.",
                productTypes: [
                    { slug: "velo-electrique", name: "Vélos Électriques", icon: "🚲", description: "Vélos électriques accessibles", amazonKeywords: "vélo électrique" },
                    { slug: "tapis-course", name: "Tapis de Course", icon: "🏃", description: "Tapis de course pour la maison", amazonKeywords: "tapis de course pliable" },
                    { slug: "velo-appartement", name: "Vélos d'Appartement", icon: "🚴", description: "Vélos d'appartement", amazonKeywords: "vélo appartement" }
                ]
            },
            {
                slug: "nike",
                name: "Nike",
                description: "Leader mondial des équipements et vêtements de sport.",
                productTypes: [
                    { slug: "chaussures-running", name: "Chaussures Running", icon: "👟", description: "Chaussures de course performantes", amazonKeywords: "Nike chaussures running" },
                    { slug: "chaussures-training", name: "Chaussures Training", icon: "💪", description: "Chaussures de musculation", amazonKeywords: "Nike chaussures training" }
                ]
            }
        ]
    },

    // ===== BEAUTÉ =====
    {
        slug: "beaute",
        name: "Beauté",
        icon: "💄",
        description: "Les meilleurs produits beauté et soins : sèche-cheveux, épilateurs et soins de la peau.",
        metaTitle: "Beauté - Meilleurs Appareils de Soin | Trouve-Tout",
        metaDescription: "Comparatif des meilleurs appareils beauté. Sèche-cheveux, lisseurs, épilateurs. Prenez soin de vous avec les meilleurs produits.",
        brands: [
            {
                slug: "dyson-beaute",
                name: "Dyson",
                description: "Technologies révolutionnaires pour le soin des cheveux.",
                productTypes: [
                    { slug: "seche-cheveux", name: "Sèche-cheveux", icon: "💇", description: "Supersonic - Sèche-cheveux intelligent", amazonKeywords: "Dyson Supersonic" },
                    { slug: "coiffeur", name: "Coiffeurs", icon: "💁", description: "Airwrap - Coiffeur multifonction", amazonKeywords: "Dyson Airwrap" },
                    { slug: "lisseur", name: "Lisseurs", icon: "✨", description: "Corrale - Lisseur sans fil", amazonKeywords: "Dyson Corrale" }
                ]
            },
            {
                slug: "ghd",
                name: "GHD",
                description: "Lisseurs et outils de coiffure professionnels.",
                productTypes: [
                    { slug: "lisseur", name: "Lisseurs", icon: "✨", description: "Platinum+ & Gold - Lisseurs professionnels", amazonKeywords: "GHD lisseur" },
                    { slug: "boucleur", name: "Boucleurs", icon: "🌀", description: "Boucleurs et fers à boucler", amazonKeywords: "GHD boucleur" },
                    { slug: "seche-cheveux", name: "Sèche-cheveux", icon: "💇", description: "Helios - Sèche-cheveux professionnel", amazonKeywords: "GHD Helios" }
                ]
            },
            {
                slug: "philips-beaute",
                name: "Philips",
                description: "Large gamme de produits de soin et beauté.",
                productTypes: [
                    { slug: "epilateur", name: "Épilateurs", icon: "✨", description: "Satinelle & Lumea IPL", amazonKeywords: "Philips épilateur Lumea" },
                    { slug: "tondeuse", name: "Tondeuses", icon: "💈", description: "Tondeuses barbe et cheveux", amazonKeywords: "Philips tondeuse barbe" },
                    { slug: "brosse-nettoyante", name: "Brosses Visage", icon: "🧴", description: "Brosses nettoyantes visage", amazonKeywords: "Philips brosse visage" }
                ]
            },
            {
                slug: "oral-b",
                name: "Oral-B",
                description: "Leader des brosses à dents électriques et hygiène bucco-dentaire.",
                productTypes: [
                    { slug: "brosse-dents-io", name: "Brosses iO", icon: "🦷", description: "iO Series - Brosses à dents avec IA", amazonKeywords: "Oral-B iO brosse dents" },
                    { slug: "brosse-dents-pro", name: "Brosses Pro", icon: "🦷", description: "Pro Series - Brosses à dents classiques", amazonKeywords: "Oral-B Pro brosse dents" },
                    { slug: "hydropulseur", name: "Hydropulseurs", icon: "💧", description: "Jets dentaires", amazonKeywords: "Oral-B hydropulseur" }
                ]
            }
        ]
    }
];

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

/**
 * Récupère une catégorie par son slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.slug === slug);
}

/**
 * Récupère toutes les marques d'une catégorie
 */
export function getBrandsByCategory(categorySlug: string): Brand[] {
    const category = getCategoryBySlug(categorySlug);
    return category?.brands || [];
}

/**
 * Récupère une marque par son slug dans une catégorie
 */
export function getBrandBySlug(categorySlug: string, brandSlug: string): Brand | undefined {
    const brands = getBrandsByCategory(categorySlug);
    return brands.find(b => b.slug === brandSlug);
}

/**
 * Récupère un type de produit par son slug
 */
export function getProductTypeBySlug(
    categorySlug: string, 
    brandSlug: string, 
    productTypeSlug: string
): ProductType | undefined {
    const brand = getBrandBySlug(categorySlug, brandSlug);
    return brand?.productTypes.find(pt => pt.slug === productTypeSlug);
}

/**
 * Génère le breadcrumb pour une page
 */
export function generateBreadcrumb(
    categorySlug?: string,
    brandSlug?: string,
    productTypeSlug?: string
): { name: string; href: string }[] {
    const breadcrumb: { name: string; href: string }[] = [
        { name: "Accueil", href: "/" }
    ];
    
    if (categorySlug) {
        const category = getCategoryBySlug(categorySlug);
        if (category) {
            breadcrumb.push({ name: category.name, href: `/categories/${categorySlug}` });
        }
        
        if (brandSlug) {
            const brand = getBrandBySlug(categorySlug, brandSlug);
            if (brand) {
                breadcrumb.push({ name: brand.name, href: `/categories/${categorySlug}/${brandSlug}` });
            }
            
            if (productTypeSlug) {
                const productType = getProductTypeBySlug(categorySlug, brandSlug, productTypeSlug);
                if (productType) {
                    breadcrumb.push({ 
                        name: productType.name, 
                        href: `/categories/${categorySlug}/${brandSlug}/${productTypeSlug}` 
                    });
                }
            }
        }
    }
    
    return breadcrumb;
}

/**
 * Génère les métadonnées SEO pour une page
 */
export function generateSeoMeta(
    categorySlug?: string,
    brandSlug?: string,
    productTypeSlug?: string
): { title: string; description: string } {
    if (productTypeSlug && brandSlug && categorySlug) {
        const brand = getBrandBySlug(categorySlug, brandSlug);
        const productType = getProductTypeBySlug(categorySlug, brandSlug, productTypeSlug);
        return {
            title: `${brand?.name} ${productType?.name} - Meilleurs Produits 2026 | Trouve-Tout`,
            description: `Découvrez les meilleurs ${productType?.name.toLowerCase()} ${brand?.name}. Comparatif, avis et meilleurs prix. ${productType?.description}`
        };
    }
    
    if (brandSlug && categorySlug) {
        const brand = getBrandBySlug(categorySlug, brandSlug);
        const category = getCategoryBySlug(categorySlug);
        return {
            title: `${brand?.name} - Tous les Produits ${category?.name} | Trouve-Tout`,
            description: `${brand?.description} Découvrez tous les produits ${brand?.name} avec nos avis et comparatifs.`
        };
    }
    
    if (categorySlug) {
        const category = getCategoryBySlug(categorySlug);
        return {
            title: category?.metaTitle || `${category?.name} | Trouve-Tout`,
            description: category?.metaDescription || category?.description || ''
        };
    }
    
    return {
        title: "Trouve-Tout | Trouvez le meilleur produit pour vous",
        description: "Trouve-Tout vous aide à trouver les meilleurs produits selon vos besoins. Comparatifs, avis et recommandations personnalisées."
    };
}

// Tiers pour le filtrage des produits
export type ProductTier = 'best-rated' | 'best-value' | 'budget-friendly';

export const tierLabels: Record<ProductTier, { label: string; color: string; description: string }> = {
    'best-rated': { 
        label: '⭐ Meilleure Note', 
        color: 'bg-yellow-500',
        description: 'Les produits les mieux notés par les acheteurs'
    },
    'best-value': { 
        label: '🏆 Meilleur Rapport Q/P', 
        color: 'bg-green-500',
        description: 'Le meilleur compromis qualité-prix'
    },
    'budget-friendly': { 
        label: '💰 Moins Cher Fiable', 
        color: 'bg-blue-500',
        description: 'Prix bas mais fiable (note ≥ 4/5)'
    }
};
