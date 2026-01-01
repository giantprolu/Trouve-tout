/**
 * API Route pour supprimer un produit
 * POST /api/admin/products/[id]/delete - Supprimer un produit
 */
import type { APIRoute } from 'astro';
import { supabase } from '../../../../../lib/supabase';

export const POST: APIRoute = async ({ params, redirect }) => {
    const { id } = params;
    if (!id) {
        return redirect('/admin/products?error=ID produit manquant');
    }
    try {
        // Supprimer dans Supabase
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Erreur suppression produit:', error);
            return redirect(`/admin/products?error=Erreur lors de la suppression`);
        }
        return redirect(`/admin/products?success=Produit supprimé avec succès`);
    } catch (error) {
        console.error('Erreur suppression produit:', error);
        return redirect(`/admin/products?error=Erreur lors de la suppression`);
    }
};
