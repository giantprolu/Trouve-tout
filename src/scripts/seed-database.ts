/**
 * Script de seed pour Supabase
 * Importe les données provisoires dans la base de données
 * 
 * Exécuter avec: npx tsx src/scripts/seed-database.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger le fichier .env
dotenv.config();

// Configuration Supabase directe (pour script standalone)
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''; // Utiliser la clé service pour bypass RLS

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Variables SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requises dans le fichier .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ============================================
// DONNÉES À IMPORTER
// ============================================

const categories = [
    { slug: 'high-tech', name: 'High-Tech', icon: '💻', description: 'Smartphones, ordinateurs, accessoires tech', display_order: 1 },
    { slug: 'maison', name: 'Maison', icon: '🏠', description: 'Mobilier, décoration, électroménager', display_order: 2 },
    { slug: 'cuisine', name: 'Cuisine', icon: '🍳', description: 'Ustensiles, électroménager cuisine, accessoires', display_order: 3 },
    { slug: 'sport', name: 'Sport', icon: '⚽', description: 'Équipements sportifs, fitness, outdoor', display_order: 4 },
    { slug: 'beaute', name: 'Beauté', icon: '💄', description: 'Cosmétiques, soins, accessoires beauté', display_order: 5 },
];

const brands = [
    // High-Tech
    { slug: 'apple', name: 'Apple', description: 'Produits Apple' },
    { slug: 'samsung', name: 'Samsung', description: 'Produits Samsung' },
    { slug: 'sony', name: 'Sony', description: 'Produits Sony' },
    { slug: 'bose', name: 'Bose', description: 'Audio Bose' },
    { slug: 'logitech', name: 'Logitech', description: 'Périphériques Logitech' },
    // Maison
    { slug: 'dyson', name: 'Dyson', description: 'Aspirateurs et purificateurs' },
    { slug: 'philips', name: 'Philips', description: 'Électroménager Philips' },
    { slug: 'ikea', name: 'IKEA', description: 'Mobilier IKEA' },
    // Cuisine
    { slug: 'tefal', name: 'Tefal', description: 'Ustensiles Tefal' },
    { slug: 'kitchenaid', name: 'KitchenAid', description: 'Électroménager KitchenAid' },
    { slug: 'moulinex', name: 'Moulinex', description: 'Électroménager Moulinex' },
    // Sport
    { slug: 'nike', name: 'Nike', description: 'Équipements Nike' },
    { slug: 'adidas', name: 'Adidas', description: 'Équipements Adidas' },
    { slug: 'decathlon', name: 'Decathlon', description: 'Équipements Decathlon' },
    // Beauté
    { slug: 'loreal', name: "L'Oréal", description: 'Cosmétiques L\'Oréal' },
    { slug: 'ghd', name: 'GHD', description: 'Lisseurs et sèche-cheveux' },
    { slug: 'babyliss', name: 'BaByliss', description: 'Coiffure BaByliss' },
];

// ============================================
// FONCTIONS DE SEED
// ============================================

async function seedCategories() {
    console.log('📁 Insertion des catégories...');
    
    const { data, error } = await supabase
        .from('categories')
        .upsert(categories.map(c => ({ ...c, is_active: true })), { onConflict: 'slug' })
        .select();
    
    if (error) {
        console.error('Erreur catégories:', error);
        return {};
    }
    
    console.log(`✅ ${data?.length || 0} catégories insérées`);
    return Object.fromEntries((data || []).map(c => [c.slug, c.id]));
}

async function seedBrands() {
    console.log('🏷️ Insertion des marques...');
    
    const { data, error } = await supabase
        .from('brands')
        .upsert(brands.map(b => ({ ...b, is_active: true })), { onConflict: 'slug' })
        .select();
    
    if (error) {
        console.error('Erreur marques:', error);
        return {};
    }
    
    console.log(`✅ ${data?.length || 0} marques insérées`);
    return Object.fromEntries((data || []).map(b => [b.slug, b.id]));
}

async function seedProductTypes(categoryIds: Record<string, string>, brandIds: Record<string, string>) {
    console.log('📦 Insertion des types de produits...');
    
    const productTypes = [
        // High-Tech - Apple
        { slug: 'iphone', name: 'iPhone', icon: '📱', category_id: categoryIds['high-tech'], brand_id: brandIds['apple'] },
        { slug: 'macbook', name: 'MacBook', icon: '💻', category_id: categoryIds['high-tech'], brand_id: brandIds['apple'] },
        { slug: 'airpods', name: 'AirPods', icon: '🎧', category_id: categoryIds['high-tech'], brand_id: brandIds['apple'] },
        { slug: 'ipad', name: 'iPad', icon: '📱', category_id: categoryIds['high-tech'], brand_id: brandIds['apple'] },
        // High-Tech - Samsung
        { slug: 'galaxy', name: 'Galaxy', icon: '📱', category_id: categoryIds['high-tech'], brand_id: brandIds['samsung'] },
        { slug: 'galaxy-buds', name: 'Galaxy Buds', icon: '🎧', category_id: categoryIds['high-tech'], brand_id: brandIds['samsung'] },
        // High-Tech - Sony
        { slug: 'casque-sony', name: 'Casques', icon: '🎧', category_id: categoryIds['high-tech'], brand_id: brandIds['sony'] },
        // High-Tech - Bose
        { slug: 'casque-bose', name: 'Casques', icon: '🎧', category_id: categoryIds['high-tech'], brand_id: brandIds['bose'] },
        // Cuisine - Philips
        { slug: 'airfryer', name: 'Airfryer', icon: '🍟', category_id: categoryIds['cuisine'], brand_id: brandIds['philips'] },
        // Cuisine - Tefal
        { slug: 'poele', name: 'Poêles', icon: '🍳', category_id: categoryIds['cuisine'], brand_id: brandIds['tefal'] },
        { slug: 'casserole', name: 'Casseroles', icon: '🥘', category_id: categoryIds['cuisine'], brand_id: brandIds['tefal'] },
        // Cuisine - KitchenAid
        { slug: 'robot-patissier', name: 'Robot Pâtissier', icon: '🍰', category_id: categoryIds['cuisine'], brand_id: brandIds['kitchenaid'] },
        // Maison - Dyson
        { slug: 'aspirateur', name: 'Aspirateurs', icon: '🧹', category_id: categoryIds['maison'], brand_id: brandIds['dyson'] },
        { slug: 'purificateur', name: 'Purificateurs', icon: '💨', category_id: categoryIds['maison'], brand_id: brandIds['dyson'] },
        // Sport - Nike
        { slug: 'running', name: 'Chaussures Running', icon: '👟', category_id: categoryIds['sport'], brand_id: brandIds['nike'] },
        // Sport - Decathlon
        { slug: 'velo', name: 'Vélos', icon: '🚴', category_id: categoryIds['sport'], brand_id: brandIds['decathlon'] },
        // Beauté - GHD
        { slug: 'lisseur', name: 'Lisseurs', icon: '💇', category_id: categoryIds['beaute'], brand_id: brandIds['ghd'] },
        // Beauté - BaByliss
        { slug: 'seche-cheveux', name: 'Sèche-cheveux', icon: '💨', category_id: categoryIds['beaute'], brand_id: brandIds['babyliss'] },
    ];
    
    const validTypes = productTypes.filter(pt => pt.category_id && pt.brand_id);
    const result: Record<string, string> = {};
    let insertedCount = 0;
    
    // Insérer un par un pour gérer les doublons
    for (const pt of validTypes) {
        // Vérifier si existe déjà (même catégorie, marque et slug)
        const { data: existing } = await supabase
            .from('product_types')
            .select('id, slug')
            .eq('category_id', pt.category_id)
            .eq('brand_id', pt.brand_id)
            .eq('slug', pt.slug)
            .single();
        
        if (existing) {
            result[pt.slug] = existing.id;
            continue;
        }
        
        // Insérer
        const { data, error } = await supabase
            .from('product_types')
            .insert({ ...pt, is_active: true })
            .select()
            .single();
        
        if (error) {
            console.error(`Erreur insertion ${pt.slug}:`, error.message);
        } else if (data) {
            result[pt.slug] = data.id;
            insertedCount++;
        }
    }
    
    console.log(`✅ ${insertedCount} types de produits insérés (${Object.keys(result).length} total)`);
    return result;
}

async function seedProducts(
    categoryIds: Record<string, string>,
    brandIds: Record<string, string>,
    productTypeIds: Record<string, string>
) {
    console.log('🛍️ Insertion des produits...');
    
    const products = [
        // iPhone
        {
            slug: 'iphone-15-pro-max',
            name: 'iPhone 15 Pro Max',
            summary: 'Le smartphone le plus avancé d\'Apple avec puce A17 Pro et Action Button',
            verdict: 'Le meilleur iPhone pour les power users',
            amazon_url: 'https://www.amazon.fr/dp/B0CHXQT1XZ?tag=trouvetoutcon-21',
            position: 'best-value',
            rating_quality: 5, rating_price: 3, rating_durability: 5, rating_reliability: 5,
            recommended_for: ['Photographes', 'Gamers', 'Professionnels'],
            not_recommended_for: ['Petits budgets'],
            category_id: categoryIds['high-tech'],
            brand_id: brandIds['apple'],
            product_type_id: productTypeIds['iphone']
        },
        {
            slug: 'iphone-15',
            name: 'iPhone 15',
            summary: 'L\'iPhone standard avec Dynamic Island et USB-C',
            verdict: 'Le meilleur équilibre pour la plupart des utilisateurs',
            amazon_url: 'https://www.amazon.fr/dp/B0CHXQT2XZ?tag=trouvetoutcon-21',
            position: 'middle-ground',
            rating_quality: 4.5, rating_price: 4, rating_durability: 5, rating_reliability: 5,
            recommended_for: ['Grand public', 'Premier iPhone'],
            not_recommended_for: ['Gamers intensifs'],
            category_id: categoryIds['high-tech'],
            brand_id: brandIds['apple'],
            product_type_id: productTypeIds['iphone']
        },
        {
            slug: 'iphone-se',
            name: 'iPhone SE (3ème génération)',
            summary: 'L\'iPhone compact et abordable avec puce A15',
            verdict: 'Parfait pour ceux qui veulent iOS sans se ruiner',
            amazon_url: 'https://www.amazon.fr/dp/B09V4KGMXP?tag=trouvetoutcon-21',
            position: 'budget',
            rating_quality: 4, rating_price: 5, rating_durability: 4, rating_reliability: 5,
            recommended_for: ['Petits budgets', 'Fans des petits formats'],
            not_recommended_for: ['Amateurs de grands écrans'],
            category_id: categoryIds['high-tech'],
            brand_id: brandIds['apple'],
            product_type_id: productTypeIds['iphone']
        },
        // AirPods
        {
            slug: 'airpods-pro-2',
            name: 'AirPods Pro 2',
            summary: 'Écouteurs avec réduction de bruit active et audio spatial',
            verdict: 'Les meilleurs écouteurs pour l\'écosystème Apple',
            amazon_url: 'https://www.amazon.fr/dp/B0BDHWDR12?tag=trouvetoutcon-21',
            position: 'best-value',
            rating_quality: 5, rating_price: 4, rating_durability: 4, rating_reliability: 5,
            recommended_for: ['Utilisateurs Apple', 'Voyageurs'],
            not_recommended_for: ['Audiophiles puristes'],
            category_id: categoryIds['high-tech'],
            brand_id: brandIds['apple'],
            product_type_id: productTypeIds['airpods']
        },
        {
            slug: 'airpods-3',
            name: 'AirPods 3',
            summary: 'Écouteurs sans réduction de bruit avec audio spatial',
            amazon_url: 'https://www.amazon.fr/dp/B09JQMJHXY?tag=trouvetoutcon-21',
            position: 'middle-ground',
            rating_quality: 4, rating_price: 4, rating_durability: 4, rating_reliability: 5,
            recommended_for: ['Usage quotidien'],
            not_recommended_for: ['Environnements bruyants'],
            category_id: categoryIds['high-tech'],
            brand_id: brandIds['apple'],
            product_type_id: productTypeIds['airpods']
        },
        {
            slug: 'airpods-2',
            name: 'AirPods 2',
            summary: 'Les écouteurs classiques Apple à prix accessible',
            amazon_url: 'https://www.amazon.fr/dp/B07PXGQC1Q?tag=trouvetoutcon-21',
            position: 'budget',
            rating_quality: 3.5, rating_price: 5, rating_durability: 4, rating_reliability: 5,
            recommended_for: ['Premier achat', 'Petits budgets'],
            not_recommended_for: ['Exigeants en audio'],
            category_id: categoryIds['high-tech'],
            brand_id: brandIds['apple'],
            product_type_id: productTypeIds['airpods']
        },
        // Philips Airfryer
        {
            slug: 'philips-airfryer-xxl',
            name: 'Philips Airfryer XXL Premium',
            summary: '13 modes de cuisson, technologie RapidAir, jusqu\'à 90% de matières grasses en moins',
            verdict: 'L\'airfryer le plus polyvalent du marché',
            amazon_url: 'https://www.amazon.fr/dp/B0CWP7M17B?tag=trouvetoutcon-21',
            position: 'best-value',
            rating_quality: 5, rating_price: 4, rating_durability: 5, rating_reliability: 5,
            recommended_for: ['Familles', 'Cuisiniers pressés'],
            not_recommended_for: ['Petites cuisines'],
            category_id: categoryIds['cuisine'],
            brand_id: brandIds['philips'],
            product_type_id: productTypeIds['airfryer']
        },
        {
            slug: 'philips-airfryer-essential',
            name: 'Philips Airfryer Essential',
            summary: 'Compact et efficace pour 2-3 personnes',
            amazon_url: 'https://www.amazon.fr/dp/B08DRDYSN3?tag=trouvetoutcon-21',
            position: 'middle-ground',
            rating_quality: 4, rating_price: 5, rating_durability: 4, rating_reliability: 5,
            recommended_for: ['Couples', 'Petits espaces'],
            not_recommended_for: ['Grandes familles'],
            category_id: categoryIds['cuisine'],
            brand_id: brandIds['philips'],
            product_type_id: productTypeIds['airfryer']
        },
        {
            slug: 'philips-airfryer-compact',
            name: 'Philips Airfryer Compact',
            summary: 'L\'entrée de gamme Philips pour découvrir l\'air frying',
            amazon_url: 'https://www.amazon.fr/dp/B07WSLQMQG?tag=trouvetoutcon-21',
            position: 'budget',
            rating_quality: 3.5, rating_price: 5, rating_durability: 4, rating_reliability: 4,
            recommended_for: ['Débutants', 'Petits budgets'],
            not_recommended_for: ['Usages intensifs'],
            category_id: categoryIds['cuisine'],
            brand_id: brandIds['philips'],
            product_type_id: productTypeIds['airfryer']
        },
        // Dyson Aspirateurs
        {
            slug: 'dyson-v15-detect',
            name: 'Dyson V15 Detect',
            summary: 'Aspirateur sans fil avec laser révélateur de poussière',
            verdict: 'Le nec plus ultra des aspirateurs balais',
            amazon_url: 'https://www.amazon.fr/dp/B091G5LMVG?tag=trouvetoutcon-21',
            position: 'best-value',
            rating_quality: 5, rating_price: 3, rating_durability: 5, rating_reliability: 5,
            recommended_for: ['Maniaques du ménage', 'Allergiques'],
            not_recommended_for: ['Petits budgets'],
            category_id: categoryIds['maison'],
            brand_id: brandIds['dyson'],
            product_type_id: productTypeIds['aspirateur']
        },
        {
            slug: 'dyson-v12-slim',
            name: 'Dyson V12 Detect Slim',
            summary: 'Léger et maniable avec détection intelligente',
            amazon_url: 'https://www.amazon.fr/dp/B09R4R9PX1?tag=trouvetoutcon-21',
            position: 'middle-ground',
            rating_quality: 4.5, rating_price: 4, rating_durability: 5, rating_reliability: 5,
            recommended_for: ['Appartements', 'Personnes âgées'],
            not_recommended_for: ['Grandes maisons'],
            category_id: categoryIds['maison'],
            brand_id: brandIds['dyson'],
            product_type_id: productTypeIds['aspirateur']
        },
        {
            slug: 'dyson-v8',
            name: 'Dyson V8',
            summary: 'L\'aspirateur Dyson accessible avec les technologies essentielles',
            amazon_url: 'https://www.amazon.fr/dp/B08B5Q2VQD?tag=trouvetoutcon-21',
            position: 'budget',
            rating_quality: 4, rating_price: 5, rating_durability: 4, rating_reliability: 5,
            recommended_for: ['Premier Dyson', 'Petits espaces'],
            not_recommended_for: ['Sols très sales'],
            category_id: categoryIds['maison'],
            brand_id: brandIds['dyson'],
            product_type_id: productTypeIds['aspirateur']
        },
    ];
    
    const validProducts = products.filter(p => p.category_id && p.brand_id && p.product_type_id);
    
    let insertedCount = 0;
    let skippedCount = 0;
    
    for (const product of validProducts) {
        // Vérifier si le produit existe déjà
        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('slug', product.slug)
            .single();
        
        if (existing) {
            skippedCount++;
            continue;
        }
        
        // Insérer le produit
        const { error } = await supabase
            .from('products')
            .insert({ ...product, is_active: true });
        
        if (error) {
            console.error(`Erreur produit ${product.slug}:`, error.message);
        } else {
            insertedCount++;
        }
    }
    
    console.log(`✅ ${insertedCount} produits insérés, ${skippedCount} déjà existants`);
}

// ============================================
// EXÉCUTION
// ============================================

async function main() {
    console.log('🚀 Démarrage du seed...\n');
    
    try {
        const categoryIds = await seedCategories();
        const brandIds = await seedBrands();
        const productTypeIds = await seedProductTypes(categoryIds, brandIds);
        await seedProducts(categoryIds, brandIds, productTypeIds);
        
        console.log('\n✅ Seed terminé avec succès !');
    } catch (error) {
        console.error('\n❌ Erreur lors du seed:', error);
        process.exit(1);
    }
}

main();
