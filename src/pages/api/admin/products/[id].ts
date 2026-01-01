/**
 * API Route pour mise à jour/suppression d'un produit
 * PUT /api/admin/products/[id] - Mettre à jour un produit
 * DELETE /api/admin/products/[id] - Supprimer un produit (via /[id]/delete)
 */
import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';
import { getCategoryBySlug, getBrandBySlug, getProductTypeBySlug } from '../../../../lib/db';

// Fonction pour parser les tableaux depuis les champs du formulaire
function parseArrayField(value: string | null): string[] {
    if (!value) return [];
    return value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
}

export const POST: APIRoute = async ({ params, request, redirect }) => {
    const { id } = params;
    
    if (!id) {
        return redirect('/admin/products?error=ID produit manquant');
    }
    
    try {
        const formData = await request.formData();
        const method = formData.get('_method') as string;
        
        // Vérifier si c'est une simulation de PUT
        if (method === 'PUT') {
            return handleUpdate(id, formData, redirect);
        }
        
        // Par défaut, traiter comme PUT
        return handleUpdate(id, formData, redirect);
        
    } catch (error) {
        console.error('Erreur mise à jour produit:', error);
        return redirect(`/admin/products/${id}?error=Erreur lors de la mise à jour`);
    }
};

async function handleUpdate(id: string, formData: FormData, redirect: Function) {
    // Extraire les données du formulaire
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
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
    // Validation
    if (!name || !position || !amazon_url || !summary) {
        return redirect(`/admin/products/${id}?error=Champs requis manquants`);
    }
    // Récupérer les IDs depuis les slugs
    const category = await getCategoryBySlug(categorySlug);
    const brand = await getBrandBySlug(brandSlug);
    const productType = await getProductTypeBySlug(productTypeSlug);
    if (!category) {
        return redirect(`/admin/products/${id}?error=Catégorie non trouvée`);
    }
    if (!brand) {
        return redirect(`/admin/products/${id}?error=Marque non trouvée`);
    }
    if (!productType) {
        return redirect(`/admin/products/${id}?error=Type de produit non trouvé`);
    }
    // Construire l'objet produit mis à jour
    const updatedProduct = {
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
        updated_at: new Date().toISOString()
    };
    // Sauvegarder dans Supabase
    const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', id)
        .select()
        .single();
    if (error) {
        console.error('Erreur mise à jour produit:', error);
        return redirect(`/admin/products/${id}?error=Erreur lors de la mise à jour`);
    }
    return redirect(`/admin/products/${id}?success=Produit mis à jour avec succès`);
}

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
    summary: "${product.summary?.replace(/"/g, '\\"') || ''}",
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
    ${product.verdict ? `verdict: "${product.verdict?.replace(/"/g, '\\"')}",` : ''}
    recommendedFor: [${product.recommended_for?.map((r: string) => `"${r}"`).join(', ') || ''}],
    notRecommendedFor: [${product.not_recommended_for?.map((r: string) => `"${r}"`).join(', ') || ''}]
}`;
}

export const GET: APIRoute = async ({ params }) => {
    const { id } = params;
    
    if (!id) {
        return new Response(JSON.stringify({ error: 'ID manquant' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    // Récupérer le produit depuis Supabase
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
    if (error || !data) {
        return new Response(JSON.stringify({ error: 'Produit non trouvé' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
