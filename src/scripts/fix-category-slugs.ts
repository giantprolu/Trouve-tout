/**
 * Script de correction des slugs des catégories
 * Remplace les espaces et caractères spéciaux par des tirets
 * Exécuter avec: npx tsx src/scripts/fix-category-slugs.ts
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

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/[^a-z0-9]+/g, '-')      // Remplace les caractères spéciaux par des tirets
        .replace(/^-|-$/g, '');           // Supprime les tirets en début/fin
}

async function fixSlugs() {
    console.log('🔧 CORRECTION DES SLUGS\n');
    console.log('='.repeat(60));
    
    // 1. Corriger les catégories
    console.log('\n📁 CATÉGORIES:');
    const { data: categories } = await supabase
        .from('categories')
        .select('id, slug, name');
    
    for (const cat of categories || []) {
        const newSlug = generateSlug(cat.name);
        if (cat.slug !== newSlug) {
            const { error } = await supabase
                .from('categories')
                .update({ slug: newSlug })
                .eq('id', cat.id);
            
            if (error) {
                console.log(`   ❌ ${cat.slug} → ${newSlug} : ${error.message}`);
            } else {
                console.log(`   ✅ ${cat.slug} → ${newSlug}`);
            }
        } else {
            console.log(`   ⏭️ ${cat.slug} (déjà correct)`);
        }
    }
    
    // 2. Corriger les marques
    console.log('\n🏷️ MARQUES:');
    const { data: brands } = await supabase
        .from('brands')
        .select('id, slug, name');
    
    for (const brand of brands || []) {
        const newSlug = generateSlug(brand.name);
        if (brand.slug !== newSlug) {
            const { error } = await supabase
                .from('brands')
                .update({ slug: newSlug })
                .eq('id', brand.id);
            
            if (error) {
                console.log(`   ❌ ${brand.slug} → ${newSlug} : ${error.message}`);
            } else {
                console.log(`   ✅ ${brand.slug} → ${newSlug}`);
            }
        } else {
            console.log(`   ⏭️ ${brand.slug} (déjà correct)`);
        }
    }
    
    // 3. Corriger les types de produits
    console.log('\n📋 TYPES DE PRODUITS:');
    const { data: productTypes } = await supabase
        .from('product_types')
        .select('id, slug, name');
    
    for (const pt of productTypes || []) {
        const newSlug = generateSlug(pt.name);
        if (pt.slug !== newSlug) {
            const { error } = await supabase
                .from('product_types')
                .update({ slug: newSlug })
                .eq('id', pt.id);
            
            if (error) {
                console.log(`   ❌ ${pt.slug} → ${newSlug} : ${error.message}`);
            } else {
                console.log(`   ✅ ${pt.slug} → ${newSlug}`);
            }
        } else {
            console.log(`   ⏭️ ${pt.slug} (déjà correct)`);
        }
    }
    
    // 4. Corriger les produits
    console.log('\n📦 PRODUITS:');
    const { data: products } = await supabase
        .from('products')
        .select('id, slug, name');
    
    let correctedProducts = 0;
    let alreadyCorrect = 0;
    
    for (const product of products || []) {
        const newSlug = generateSlug(product.name);
        if (product.slug !== newSlug) {
            const { error } = await supabase
                .from('products')
                .update({ slug: newSlug })
                .eq('id', product.id);
            
            if (error) {
                console.log(`   ❌ ${product.slug} → ${newSlug} : ${error.message}`);
            } else {
                correctedProducts++;
            }
        } else {
            alreadyCorrect++;
        }
    }
    console.log(`   ✅ ${correctedProducts} corrigés, ⏭️ ${alreadyCorrect} déjà corrects`);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Correction terminée !');
    console.log('\n⚠️ Redémarrez le serveur de développement pour appliquer les changements.');
}

fixSlugs().catch(console.error);
