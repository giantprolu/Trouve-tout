/**
 * API Routes pour une catégorie spécifique
 * POST /api/admin/categories/[id] - Mettre à jour une catégorie
 * DELETE /api/admin/categories/[id] - Supprimer une catégorie
 */
import type { APIRoute } from 'astro';
import { updateCategory, deleteCategory, getCategoryById } from '../../../../lib/db';

export const POST: APIRoute = async ({ params, request, redirect }) => {
    const { id } = params;
    
    if (!id) {
        return redirect('/admin/categories?error=ID catégorie manquant');
    }
    
    try {
        const formData = await request.formData();
        const method = formData.get('_method') as string;
        
        // Suppression
        if (method === 'DELETE') {
            const success = await deleteCategory(id);
            if (!success) {
                return redirect('/admin/categories?error=Erreur lors de la suppression');
            }
            return redirect('/admin/categories?success=Catégorie supprimée');
        }
        
        // Mise à jour
        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const icon = formData.get('icon') as string;
        const description = formData.get('description') as string | null;
        const display_order = parseInt(formData.get('display_order') as string) || 0;
        
        if (!name || !icon) {
            return redirect('/admin/categories?error=Nom et icône requis');
        }
        
        const category = await updateCategory(id, {
            name,
            slug,
            icon,
            description: description || undefined,
            display_order
        });
        
        if (!category) {
            return redirect('/admin/categories?error=Erreur lors de la mise à jour');
        }
        
        return redirect('/admin/categories?success=Catégorie mise à jour');
        
    } catch (error) {
        console.error('Erreur mise à jour catégorie:', error);
        return redirect('/admin/categories?error=Erreur serveur');
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
        const category = await getCategoryById(id);
        if (!category) {
            return new Response(JSON.stringify({ error: 'Catégorie non trouvée' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return new Response(JSON.stringify(category), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur récupération catégorie:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
