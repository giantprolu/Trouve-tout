/**
 * API pour gérer les liaisons type de produit <-> marques
 * POST /api/admin/product-types/[id]/brands - Définir les marques d'un type de produit
 */
import type { APIRoute } from 'astro';
import { setProductTypeBrands, getProductTypeBrands } from '../../../../../lib/db';

export const POST: APIRoute = async ({ params, request, redirect }) => {
    const { id } = params;
    
    if (!id) {
        return redirect('/admin/product-types?error=ID type de produit manquant');
    }
    
    try {
        const formData = await request.formData();
        const brandIds = formData.getAll('brand_ids') as string[];
        
        const success = await setProductTypeBrands(id, brandIds);
        
        if (!success) {
            return redirect(`/admin/product-types?edit=${id}&error=Erreur lors de la mise à jour des marques`);
        }
        
        return redirect('/admin/product-types?success=Marques mises à jour');
        
    } catch (error) {
        console.error('Erreur mise à jour marques type produit:', error);
        return redirect('/admin/product-types?error=Erreur serveur');
    }
};

export const GET: APIRoute = async ({ params }) => {
    const { id } = params;
    
    if (!id) {
        return new Response(JSON.stringify({ error: 'ID manquant' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    try {
        const brands = await getProductTypeBrands(id);
        return new Response(JSON.stringify(brands), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur récupération marques type produit:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
