/**
 * API Routes pour la gestion des catégories
 * POST /api/admin/categories - Créer une catégorie
 * GET /api/admin/categories - Lister les catégories
 */
import type { APIRoute } from 'astro';
import { createCategory, getCategories, generateSlug } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, redirect }) => {
    try {
        const formData = await request.formData();
        
        const name = formData.get('name') as string;
        const slug = (formData.get('slug') as string) || generateSlug(name);
        const icon = formData.get('icon') as string;
        const description = formData.get('description') as string | null;
        const display_order = parseInt(formData.get('display_order') as string) || 0;
        
        // Validation
        if (!name || !icon) {
            return redirect('/admin/categories?error=Nom et icône requis');
        }
        
        const category = await createCategory({
            slug,
            name,
            icon,
            description: description || undefined,
            display_order
        });
        
        if (!category) {
            return redirect('/admin/categories?error=Erreur lors de la création');
        }
        
        return redirect('/admin/categories?success=Catégorie créée avec succès');
        
    } catch (error) {
        console.error('Erreur création catégorie:', error);
        return redirect('/admin/categories?error=Erreur serveur');
    }
};

export const GET: APIRoute = async () => {
    try {
        const categories = await getCategories();
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur liste catégories:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
