/**
 * Script de diagnostic des catégories/marques
 * Exécuter avec: npx tsx src/scripts/debug-categories.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables d\'environnement manquantes');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
    console.log('🔍 DIAGNOSTIC DES CATÉGORIES ET MARQUES\n');
    console.log('='.repeat(60));
    
    // 1. Catégories
    console.log('\n📁 CATÉGORIES:');
    const { data: categories } = await supabase
        .from('categories')
        .select('id, slug, name, is_active')
        .eq('is_active', true)
        .order('name');
    
    categories?.forEach(c => console.log(`   - ${c.slug} (${c.id})`));
    
    // 2. Marques
    console.log('\n🏷️ MARQUES:');
    const { data: brands } = await supabase
        .from('brands')
        .select('id, slug, name, is_active')
        .eq('is_active', true)
        .order('name');
    
    brands?.forEach(b => console.log(`   - ${b.slug} (${b.id})`));
    
    // 3. Table category_brands
    console.log('\n🔗 LIAISONS CATEGORY_BRANDS:');
    const { data: categoryBrands, error: cbError } = await supabase
        .from('category_brands')
        .select('category_id, brand_id, categories(slug), brands(slug)');
    
    if (cbError) {
        console.log('   ⚠️ Erreur ou table inexistante:', cbError.message);
    } else if (!categoryBrands || categoryBrands.length === 0) {
        console.log('   ⚠️ Table vide - aucune liaison');
    } else {
        categoryBrands.forEach((cb: any) => {
            console.log(`   - ${cb.categories?.slug} ↔ ${cb.brands?.slug}`);
        });
    }
    
    // 4. Produits par catégorie
    console.log('\n📦 PRODUITS PAR CATÉGORIE:');
    for (const cat of categories || []) {
        const { data: products, count } = await supabase
            .from('products')
            .select('id, brand_id, brands(slug)', { count: 'exact' })
            .eq('category_id', cat.id)
            .eq('is_active', true);
        
        const uniqueBrands = new Set(products?.map((p: any) => p.brands?.slug).filter(Boolean));
        console.log(`   ${cat.slug}: ${count || 0} produits, marques: [${Array.from(uniqueBrands).join(', ')}]`);
    }
    
    // 5. Types de produits
    console.log('\n📋 TYPES DE PRODUITS:');
    const { data: productTypes } = await supabase
        .from('product_types')
        .select('id, slug, category_id, brand_id, categories(slug), brands(slug)')
        .eq('is_active', true);
    
    const typesByCategory = new Map<string, string[]>();
    productTypes?.forEach((pt: any) => {
        const catSlug = pt.categories?.slug || 'unknown';
        if (!typesByCategory.has(catSlug)) {
            typesByCategory.set(catSlug, []);
        }
        typesByCategory.get(catSlug)?.push(`${pt.slug} (${pt.brands?.slug})`);
    });
    
    typesByCategory.forEach((types, cat) => {
        console.log(`   ${cat}:`);
        types.forEach(t => console.log(`      - ${t}`));
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Diagnostic terminé');
}

debug().catch(console.error);
