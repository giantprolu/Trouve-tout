/**
 * API pour récupérer les types de produits d'une catégorie
 * GET /api/admin/categories/[slug]/product-types
 */
import type { APIRoute } from 'astro';
import { getProductTypesByCategory } from '../../../../../lib/db';

export const GET: APIRoute = async ({ params }) => {
    const slug = params.slug;
    
    if (!slug) {
        return new Response(
            JSON.stringify({ error: 'Slug de catégorie manquant' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    try {
        const productTypes = await getProductTypesByCategory(slug);
        
        // Retourner seulement les champs nécessaires
        const simplifiedTypes = productTypes.map(pt => ({
            slug: pt.slug,
            name: pt.name,
            icon: pt.icon || '📦'
        }));
        
        return new Response(
            JSON.stringify(simplifiedTypes),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Erreur API product-types:', error);
        return new Response(
            JSON.stringify({ error: 'Erreur serveur' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
