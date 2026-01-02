/**
 * Script d'import de tous les produits dans Supabase (V2 - avec catégorie)
 * Les catégories, types de produits et marques doivent déjà exister
 * Exécuter avec: npx tsx src/scripts/import-products-v2.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement depuis .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables d\'environnement manquantes: SUPABASE_URL et SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY');
    console.log('   Vérifiez votre fichier .env');
    process.exit(1);
}

console.log('🔌 Connexion à Supabase:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping des positions
const POSITION_MAP: Record<string, string> = {
    'best': 'best-value',
    'middle': 'middle-ground', 
    'budget': 'budget'
};

// Structure des données par type de produit
interface ProductData {
    type: string;       // slug du type de produit
    category: string;   // slug de la catégorie (pour différencier si même type existe dans plusieurs catégories)
    brand: string;      // slug de la marque
    name: string;
    position: string;
    summary: string;
    verdict: string;
    indicators: { quality: number; price: number; durability: number; reliability: number };
    recommended_for: string[];
    not_recommended_for: string[];
}

// Tous les produits à importer
const productsData: ProductData[] = [
// ========================================
// SPORT & BIEN-ÊTRE — MONTRES CONNECTÉES
// ========================================

// Garmin
{ type: "montres", category: "sport-bien-etre", brand: "garmin", name: "Garmin Forerunner 255", position: "best", summary: "Montre GPS très complète orientée sport et performance.", verdict: "Le meilleur choix pour les sportifs réguliers et exigeants.", indicators: { quality: 5, price: 3, durability: 5, reliability: 5 }, recommended_for: ["running", "sport intensif"], not_recommended_for: ["usage lifestyle simple"] },
{ type: "montres", category: "sport-bien-etre", brand: "garmin", name: "Garmin Venu Sq", position: "middle", summary: "Montre connectée équilibrée avec suivi santé et sport.", verdict: "Bon compromis entre sport et quotidien.", indicators: { quality: 4, price: 4, durability: 4, reliability: 4 }, recommended_for: ["sport modéré", "usage quotidien"], not_recommended_for: ["sport avancé"] },
{ type: "montres", category: "sport-bien-etre", brand: "garmin", name: "Garmin Vívosmart 5", position: "budget", summary: "Bracelet connecté discret axé santé.", verdict: "Idéal pour suivre l'essentiel à petit prix.", indicators: { quality: 3, price: 5, durability: 3, reliability: 4 }, recommended_for: ["santé", "débutants"], not_recommended_for: ["GPS", "sport intensif"] },

// Fitbit
{ type: "montres", category: "sport-bien-etre", brand: "fitbit", name: "Fitbit Sense 2", position: "best", summary: "Montre santé avancée avec suivi du stress et du sommeil.", verdict: "Parfaite pour le bien-être et la santé.", indicators: { quality: 5, price: 3, durability: 4, reliability: 4 }, recommended_for: ["santé", "bien-être"], not_recommended_for: ["sport très avancé"] },
{ type: "montres", category: "sport-bien-etre", brand: "fitbit", name: "Fitbit Versa 4", position: "middle", summary: "Montre connectée polyvalente et simple à utiliser.", verdict: "Bon équilibre sport léger / santé.", indicators: { quality: 4, price: 4, durability: 4, reliability: 4 }, recommended_for: ["usage quotidien", "sport modéré"], not_recommended_for: ["GPS précis"] },
{ type: "montres", category: "sport-bien-etre", brand: "fitbit", name: "Fitbit Charge 6", position: "budget", summary: "Bracelet connecté avec GPS intégré.", verdict: "Très complet pour son prix.", indicators: { quality: 4, price: 5, durability: 3, reliability: 4 }, recommended_for: ["petits budgets", "running occasionnel"], not_recommended_for: ["grand écran"] },

// Xiaomi
{ type: "montres", category: "sport-bien-etre", brand: "xiaomi", name: "Xiaomi Watch S1", position: "best", summary: "Montre élégante avec nombreuses fonctions sport et santé.", verdict: "Excellent rapport fonctionnalités/prix.", indicators: { quality: 4, price: 4, durability: 4, reliability: 4 }, recommended_for: ["sport", "quotidien"], not_recommended_for: ["applications avancées"] },
{ type: "montres", category: "sport-bien-etre", brand: "xiaomi", name: "Xiaomi Redmi Watch 4", position: "middle", summary: "Montre connectée complète et abordable.", verdict: "Très bon compromis pour débuter.", indicators: { quality: 4, price: 5, durability: 3, reliability: 4 }, recommended_for: ["débutants", "budget maîtrisé"], not_recommended_for: ["sport intensif"] },
{ type: "montres", category: "sport-bien-etre", brand: "xiaomi", name: "Xiaomi Mi Band 8", position: "budget", summary: "Bracelet connecté simple et efficace.", verdict: "Imbattable à petit prix.", indicators: { quality: 3, price: 5, durability: 3, reliability: 4 }, recommended_for: ["petits budgets"], not_recommended_for: ["montre classique"] },

];

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

async function importProducts() {
    console.log('🚀 Début de l\'import des produits...\n');
    console.log(`   Total de produits à importer: ${productsData.length}\n`);
    
    // 1. Récupérer toutes les catégories
    console.log('📁 Récupération des catégories...');
    const { data: categories, error: catErr } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true);
    
    if (catErr || !categories || categories.length === 0) {
        console.error('❌ Aucune catégorie trouvée:', catErr?.message);
        return;
    }
    console.log(`   ✓ ${categories.length} catégorie(s) trouvée(s)`);
    
    // Créer un map des catégories par slug
    const categoryMap = new Map<string, string>();
    categories.forEach(c => {
        categoryMap.set(c.slug, c.id);
        console.log(`   - ${c.slug} (${c.id})`);
    });
    
    // 2. Récupérer tous les types de produits
    console.log('\n📦 Récupération des types de produits...');
    const { data: productTypes, error: typeErr } = await supabase
        .from('product_types')
        .select('*')
        .eq('is_active', true);
    
    if (typeErr || !productTypes) {
        console.error('❌ Erreur récupération types:', typeErr?.message);
        return;
    }
    
    // Clé composite: "typeSlug:categoryId" pour permettre même type dans différentes catégories
    const typeMap = new Map<string, { id: string; category_id: string }>();
    productTypes.forEach(pt => {
        const key = `${pt.slug}:${pt.category_id}`;
        typeMap.set(key, { id: pt.id, category_id: pt.category_id });
        console.log(`   ✓ Type trouvé: ${pt.slug} (catégorie: ${pt.category_id})`);
    });
    
    // 3. Récupérer toutes les marques
    console.log('\n🏷️ Récupération des marques...');
    const { data: brands, error: brandErr } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true);
    
    if (brandErr || !brands) {
        console.error('❌ Erreur récupération marques:', brandErr?.message);
        return;
    }
    
    const brandMap = new Map<string, string>();
    brands.forEach(b => {
        brandMap.set(b.slug, b.id);
        console.log(`   ✓ Marque trouvée: ${b.slug} (${b.id})`);
    });
    
    // 4. Créer les produits
    console.log('\n🛒 Création des produits...');
    let productCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const missingTypes = new Set<string>();
    const missingBrands = new Set<string>();
    const missingCategories = new Set<string>();
    
    for (const product of productsData) {
        // Récupérer l'ID de la catégorie
        const categoryId = categoryMap.get(product.category);
        
        if (!categoryId) {
            if (!missingCategories.has(product.category)) {
                console.error(`   ❌ Catégorie "${product.category}" non trouvée`);
                missingCategories.add(product.category);
            }
            errorCount++;
            continue;
        }
        
        // Chercher le type par slug + catégorie
        const typeKey = `${product.type}:${categoryId}`;
        const typeInfo = typeMap.get(typeKey);
        const brandId = brandMap.get(product.brand);
        
        if (!typeInfo) {
            const errorKey = `${product.type}@${product.category}`;
            if (!missingTypes.has(errorKey)) {
                console.error(`   ❌ Type "${product.type}" non trouvé dans la catégorie "${product.category}"`);
                missingTypes.add(errorKey);
            }
            errorCount++;
            continue;
        }
        
        if (!brandId) {
            if (!missingBrands.has(product.brand)) {
                console.error(`   ❌ Marque "${product.brand}" non trouvée`);
                missingBrands.add(product.brand);
            }
            errorCount++;
            continue;
        }
        
        const productSlug = generateSlug(product.name);
        
        // Vérifier si le produit existe déjà
        const { data: existingProduct } = await supabase
            .from('products')
            .select('id')
            .eq('slug', productSlug)
            .single();
        
        if (existingProduct) {
            console.log(`   ⏭️ Existant: ${product.name}`);
            skippedCount++;
            continue;
        }
        
        // Créer le lien Amazon fictif
        const amazonUrl = `https://www.amazon.fr/dp/ASIN_A_MODIFIER?tag=trouvetoutcon-21`;
        
        const { error: productError } = await supabase
            .from('products')
            .insert({
                slug: productSlug,
                name: product.name,
                summary: product.summary,
                verdict: product.verdict,
                amazon_url: amazonUrl,
                asin: null,
                image_url: null,
                image_alt: null,
                price_display: null,
                position: POSITION_MAP[product.position] || 'middle-ground',
                rating_quality: product.indicators.quality.toFixed(1),
                rating_price: product.indicators.price.toFixed(1),
                rating_durability: product.indicators.durability.toFixed(1),
                rating_reliability: product.indicators.reliability.toFixed(1),
                recommended_for: product.recommended_for,
                not_recommended_for: product.not_recommended_for,
                category_id: categoryId,
                brand_id: brandId,
                product_type_id: typeInfo.id,
                is_active: true,
                is_featured: false,
                display_order: 0,
                views_count: 0,
                clicks_count: 0
            });
        
        if (productError) {
            console.error(`   ❌ Erreur: ${product.name} - ${productError.message}`);
            errorCount++;
        } else {
            console.log(`   ✓ Créé: ${product.name}`);
            productCount++;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 RÉSUMÉ DE L\'IMPORT');
    console.log('='.repeat(50));
    console.log(`   Produits créés: ${productCount}`);
    console.log(`   Produits ignorés (existants): ${skippedCount}`);
    console.log(`   Erreurs: ${errorCount}`);
    
    if (missingCategories.size > 0) {
        console.log(`\n   ⚠️ Catégories manquantes: ${Array.from(missingCategories).join(', ')}`);
    }
    if (missingTypes.size > 0) {
        console.log(`   ⚠️ Types manquants: ${Array.from(missingTypes).join(', ')}`);
    }
    if (missingBrands.size > 0) {
        console.log(`   ⚠️ Marques manquantes: ${Array.from(missingBrands).join(', ')}`);
    }
    
    console.log('\n✅ Import terminé !');
    console.log('\n⚠️ N\'oubliez pas de modifier les liens Amazon fictifs dans l\'admin !');
}

importProducts().catch(console.error);
