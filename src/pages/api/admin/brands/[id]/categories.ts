/**
 * API pour gérer les liaisons marque <-> catégories
 * POST /api/admin/brands/[id]/categories - Définir les catégories d'une marque
 */
import type { APIRoute } from 'astro';
import { setBrandCategories, getBrandCategories } from '../../../../../lib/db';

export const POST: APIRoute = async ({ params, request, redirect }) => {
    const { id } = params;
    
    if (!id) {
        return redirect('/admin/brands?error=ID marque manquant');
    }
    
    try {
        const formData = await request.formData();
        const categoryIds = formData.getAll('category_ids') as string[];
        
        console.log('API categories - brand id:', id);
        console.log('API categories - categoryIds reçus:', categoryIds);
        
        if (categoryIds.length === 0) {
            console.log('Aucune catégorie sélectionnée - suppression des liaisons');
        }
        
        const success = await setBrandCategories(id, categoryIds);
        
        console.log('API categories - résultat:', success);
        
        if (!success) {
            return redirect(`/admin/brands?error=Erreur lors de la mise à jour des catégories (vérifiez que la table category_brands existe)`);
        }
        
        return redirect(`/admin/brands?success=Catégories mises à jour (${categoryIds.length} catégorie(s))`);
        
    } catch (error) {
        console.error('Erreur mise à jour catégories marque:', error);
        return redirect(`/admin/brands?error=Erreur serveur: ${error instanceof Error ? error.message : 'inconnue'}`);
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
        const categories = await getBrandCategories(id);
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur récupération catégories marque:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
