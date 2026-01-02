/**
 * API Routes pour un type de produit spécifique
 * POST /api/admin/product-types/[id] - Mettre à jour un type de produit
 * DELETE /api/admin/product-types/[id] - Supprimer un type de produit
 */
import type { APIRoute } from 'astro';
import { updateProductType, deleteProductType, getProductTypeById, setProductTypeBrands } from '../../../../lib/db';

export const POST: APIRoute = async ({ params, request, redirect }) => {
    const { id } = params;
    
    if (!id) {
        return redirect('/admin/product-types?error=ID type de produit manquant');
    }
    
    try {
        const formData = await request.formData();
        const method = formData.get('_method') as string;
        
        // Suppression
        if (method === 'DELETE') {
            const success = await deleteProductType(id);
            if (!success) {
                return redirect('/admin/product-types?error=Erreur lors de la suppression');
            }
            return redirect('/admin/product-types?success=Type de produit supprimé');
        }
        
        // Mise à jour
        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const icon = formData.get('icon') as string;
        const description = formData.get('description') as string | null;
        const category_id = formData.get('category_id') as string;
        const brand_id = formData.get('brand_id') as string;
        const brandIds = formData.getAll('brand_ids') as string[];
        
        if (!name || !icon) {
            return redirect('/admin/product-types?error=Nom et icône requis');
        }
        
        const productType = await updateProductType(id, {
            name,
            slug,
            icon,
            description: description || undefined,
            category_id,
            brand_id
        });
        
        if (!productType) {
            return redirect('/admin/product-types?error=Erreur lors de la mise à jour');
        }
        
        // Mettre à jour les marques liées
        await setProductTypeBrands(id, brandIds);
        
        return redirect('/admin/product-types?success=Type de produit mis à jour');
        
    } catch (error) {
        console.error('Erreur mise à jour type de produit:', error);
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
        const productType = await getProductTypeById(id);
        if (!productType) {
            return new Response(JSON.stringify({ error: 'Type de produit non trouvé' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return new Response(JSON.stringify(productType), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur récupération type de produit:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
