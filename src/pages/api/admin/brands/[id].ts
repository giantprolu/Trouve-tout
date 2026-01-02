/**
 * API Routes pour une marque spécifique
 * POST /api/admin/brands/[id] - Mettre à jour une marque
 * DELETE /api/admin/brands/[id] - Supprimer une marque
 */
import type { APIRoute } from 'astro';
import { updateBrand, deleteBrand, getBrandById, setBrandCategories } from '../../../../lib/db';

export const POST: APIRoute = async ({ params, request, redirect }) => {
    const { id } = params;
    
    if (!id) {
        return redirect('/admin/brands?error=ID marque manquant');
    }
    
    try {
        const formData = await request.formData();
        const method = formData.get('_method') as string;
        
        // Suppression
        if (method === 'DELETE') {
            const success = await deleteBrand(id);
            if (!success) {
                return redirect('/admin/brands?error=Erreur lors de la suppression');
            }
            return redirect('/admin/brands?success=Marque supprimée');
        }
        
        // Mise à jour
        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const description = formData.get('description') as string | null;
        const logo_url = formData.get('logo_url') as string | null;
        const categoryIds = formData.getAll('category_ids') as string[];
        
        if (!name) {
            return redirect('/admin/brands?error=Nom requis');
        }
        
        const brand = await updateBrand(id, {
            name,
            slug,
            description: description || undefined,
            logo_url: logo_url || undefined
        });
        
        if (!brand) {
            return redirect('/admin/brands?error=Erreur lors de la mise à jour');
        }
        
        // Mettre à jour les catégories liées
        await setBrandCategories(id, categoryIds);
        
        return redirect('/admin/brands?success=Marque mise à jour');
        
    } catch (error) {
        console.error('Erreur mise à jour marque:', error);
        return redirect('/admin/brands?error=Erreur serveur');
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
        const brand = await getBrandById(id);
        if (!brand) {
            return new Response(JSON.stringify({ error: 'Marque non trouvée' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return new Response(JSON.stringify(brand), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur récupération marque:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
