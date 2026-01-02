/**
 * API: Suppression en masse de produits
 * Route: /api/admin/products/bulk-delete
 */
import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const productIds = formData.getAll('product_ids') as string[];
        
        if (!productIds || productIds.length === 0) {
            return new Response(null, {
                status: 302,
                headers: { 'Location': '/admin/products?error=Aucun produit sélectionné' }
            });
        }
        
        // Supprimer les produits
        const { error } = await supabase
            .from('products')
            .delete()
            .in('id', productIds);
        
        if (error) {
            console.error('Erreur suppression en masse:', error);
            return new Response(null, {
                status: 302,
                headers: { 'Location': `/admin/products?error=${encodeURIComponent(error.message)}` }
            });
        }
        
        return new Response(null, {
            status: 302,
            headers: { 'Location': `/admin/products?success=${encodeURIComponent(`${productIds.length} produit(s) supprimé(s)`)}` }
        });
    } catch (err) {
        console.error('Erreur API bulk-delete:', err);
        return new Response(null, {
            status: 302,
            headers: { 'Location': '/admin/products?error=Erreur lors de la suppression' }
        });
    }
};
