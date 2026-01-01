/**
 * API Routes pour la gestion des types de produits
 * POST /api/admin/product-types - Créer un type de produit
 * GET /api/admin/product-types - Lister les types de produits
 */
import type { APIRoute } from 'astro';
import { createProductType, getProductTypes, generateSlug } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, redirect }) => {
    try {
        const formData = await request.formData();
        
        const name = formData.get('name') as string;
        const slug = (formData.get('slug') as string) || generateSlug(name);
        const icon = formData.get('icon') as string;
        const description = formData.get('description') as string | null;
        const category_id = formData.get('category_id') as string;
        const brand_id = formData.get('brand_id') as string;
        
        // Validation
        if (!name || !icon || !category_id || !brand_id) {
            return redirect('/admin/product-types?error=Champs requis manquants');
        }
        
        const productType = await createProductType({
            slug,
            name,
            icon,
            description: description || undefined,
            category_id,
            brand_id
        });
        
        if (!productType) {
            return redirect('/admin/product-types?error=Erreur lors de la création');
        }
        
        return redirect('/admin/product-types?success=Type de produit créé avec succès');
        
    } catch (error) {
        console.error('Erreur création type de produit:', error);
        return redirect('/admin/product-types?error=Erreur serveur');
    }
};

export const GET: APIRoute = async () => {
    try {
        const productTypes = await getProductTypes();
        return new Response(JSON.stringify(productTypes), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur liste types de produits:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
