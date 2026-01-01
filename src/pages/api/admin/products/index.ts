/**
 * API Routes pour la gestion des produits
 * POST /api/admin/products - Créer un produit
 * GET /api/admin/products - Lister les produits
 */
import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
import { getCategoryBySlug, getBrandBySlug, getProductTypeBySlug } from '../../../../lib/db';
import type { ProductInsert } from '../../../../types/database';

// Fonction pour générer un slug
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Fonction pour parser les tableaux depuis les champs du formulaire
function parseArrayField(value: string | null): string[] {
    if (!value) return [];
    return value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
}

export const POST: APIRoute = async ({ request, redirect }) => {
    try {
        const formData = await request.formData();
        
        // Extraire les données du formulaire
        const name = formData.get('name') as string;
        const slug = (formData.get('slug') as string) || generateSlug(name);
        const categorySlug = formData.get('category') as string;
        const brandSlug = formData.get('brand') as string;
        const productTypeSlug = formData.get('product_type') as string;
        const position = formData.get('position') as 'best-value' | 'middle-ground' | 'budget';
        const amazon_url = formData.get('amazon_url') as string;
        const asin = formData.get('asin') as string | null;
        const summary = formData.get('summary') as string;
        const verdict = formData.get('verdict') as string | null;
        const image_url = formData.get('image_url') as string | null;
        const price_display = formData.get('price_display') as string | null;
        
        // Ratings
        const rating_quality = parseFloat(formData.get('rating_quality') as string) || null;
        const rating_price = parseFloat(formData.get('rating_price') as string) || null;
        const rating_durability = parseFloat(formData.get('rating_durability') as string) || null;
        const rating_reliability = parseFloat(formData.get('rating_reliability') as string) || null;
        
        // Recommendations
        const recommended_for = parseArrayField(formData.get('recommended_for') as string);
        const not_recommended_for = parseArrayField(formData.get('not_recommended_for') as string);
        
        // Validation basique
        if (!name || !categorySlug || !brandSlug || !productTypeSlug || !position || !amazon_url || !summary) {
            return redirect('/admin/products/new?error=Champs requis manquants');
        }
        
        // Récupérer les IDs depuis les slugs
        const category = await getCategoryBySlug(categorySlug);
        const brand = await getBrandBySlug(brandSlug);
        const productType = await getProductTypeBySlug(productTypeSlug);
        
        if (!category) {
            console.error('Catégorie non trouvée:', categorySlug);
            return redirect('/admin/products/new?error=Catégorie non trouvée');
        }
        if (!brand) {
            console.error('Marque non trouvée:', brandSlug);
            return redirect('/admin/products/new?error=Marque non trouvée');
        }
        if (!productType) {
            console.error('Type de produit non trouvé:', productTypeSlug);
            return redirect('/admin/products/new?error=Type de produit non trouvé');
        }
        
        console.log('=== Création produit dans Supabase ===');
        console.log('Catégorie:', category.name, '(', category.id, ')');
        console.log('Marque:', brand.name, '(', brand.id, ')');
        console.log('Type de produit:', productType.name, '(', productType.id, ')');
        
        // Préparer les données pour Supabase
        const productData = {
            name,
            slug,
            category_id: category.id,
            brand_id: brand.id,
            product_type_id: productType.id,
            position,
            amazon_url,
            asin: asin || null,
            summary,
            verdict: verdict || null,
            image_url: image_url || null,
            price_display: price_display || null,
            rating_quality,
            rating_price,
            rating_durability,
            rating_reliability,
            recommended_for,
            not_recommended_for,
            is_active: true
        };
        
        console.log('Données produit:', productData);
        
        // Sauvegarder dans Supabase
        const { data, error } = await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();
        
        if (error) {
            console.error('Erreur Supabase:', error);
            return redirect(`/admin/products/new?error=${encodeURIComponent(error.message)}`);
        }
        
        console.log('Produit créé avec succès:', data);
        
        return redirect(`/admin/products?success=Produit "${name}" créé avec succès !`);
        
    } catch (error) {
        console.error('Erreur création produit:', error);
        return redirect('/admin/products/new?error=Erreur lors de la création');
    }
};

// Générer le code TypeScript pour un produit
function generateProductTypeScript(product: any): string {
    const ratings = [
        product.rating_quality,
        product.rating_price,
        product.rating_durability,
        product.rating_reliability
    ].filter(r => r !== null);
    
    const avgRating = ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : '4.0';
    
    return `{
    name: "${product.name}",
    slug: "${product.slug}",
    position: "${product.position}",
    summary: "${product.summary.replace(/"/g, '\\"')}",
    amazonUrl: "${product.amazon_url}",
    ${product.asin ? `asin: "${product.asin}",` : ''}
    ${product.image_url ? `imageUrl: "${product.image_url}",` : ''}
    ${product.price_display ? `priceDisplay: "${product.price_display}",` : ''}
    ratings: {
        qualité: ${product.rating_quality || 4},
        prix: ${product.rating_price || 4},
        durabilité: ${product.rating_durability || 4},
        fiabilité: ${product.rating_reliability || 4}
    },
    avgRating: ${avgRating},
    ${product.verdict ? `verdict: "${product.verdict.replace(/"/g, '\\"')}",` : ''}
    recommendedFor: [${product.recommended_for.map((r: string) => `"${r}"`).join(', ')}],
    notRecommendedFor: [${product.not_recommended_for.map((r: string) => `"${r}"`).join(', ')}]
}`;
}

export const GET: APIRoute = async ({ url }) => {
    try {
        // Paramètres de filtrage
        const category = url.searchParams.get('category');
        const position = url.searchParams.get('position');
        const search = url.searchParams.get('q');
        
        // Construire la requête Supabase
        let query = supabase
            .from('products')
            .select(`
                *,
                categories(*),
                brands(*),
                product_types(*)
            `)
            .order('created_at', { ascending: false });
        
        // Appliquer les filtres
        if (category) {
            // Récupérer l'ID de la catégorie depuis le slug
            const cat = await getCategoryBySlug(category);
            if (cat) {
                query = query.eq('category_id', cat.id);
            }
        }
        
        if (position) {
            query = query.eq('position', position);
        }
        
        if (search) {
            query = query.ilike('name', `%${search}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
            console.error('Erreur récupération produits:', error);
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({
            success: true,
            products: data || [],
            count: (data || []).length
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Erreur lors de la récupération des produits'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
