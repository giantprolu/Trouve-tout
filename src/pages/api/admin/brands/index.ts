/**
 * API Routes pour la gestion des marques
 * POST /api/admin/brands - Créer une marque
 * GET /api/admin/brands - Lister les marques
 */
import type { APIRoute } from 'astro';
import { createBrand, getBrands, generateSlug } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, redirect }) => {
    try {
        const formData = await request.formData();
        
        const name = formData.get('name') as string;
        const slug = (formData.get('slug') as string) || generateSlug(name);
        const description = formData.get('description') as string | null;
        const logo_url = formData.get('logo_url') as string | null;
        
        // Validation
        if (!name) {
            return redirect('/admin/brands?error=Nom requis');
        }
        
        const brand = await createBrand({
            slug,
            name,
            description: description || undefined,
            logo_url: logo_url || undefined
        });
        
        if (!brand) {
            return redirect('/admin/brands?error=Erreur lors de la création');
        }
        
        return redirect('/admin/brands?success=Marque créée avec succès');
        
    } catch (error) {
        console.error('Erreur création marque:', error);
        return redirect('/admin/brands?error=Erreur serveur');
    }
};

export const GET: APIRoute = async () => {
    try {
        const brands = await getBrands();
        return new Response(JSON.stringify(brands), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erreur liste marques:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
