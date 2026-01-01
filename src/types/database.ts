/**
 * Types pour la base de données Supabase V2
 * Espace Admin Trouve-Tout
 */

// =====================================================
// ENUMS
// =====================================================

export type ProductPosition = 'best-value' | 'middle-ground' | 'budget';

export type AdminRole = 'super_admin' | 'admin' | 'editor';

// =====================================================
// TABLES PRINCIPALES
// =====================================================

export interface DbCategory {
    id: string;
    slug: string;
    name: string;
    icon: string;
    description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbBrand {
    id: string;
    slug: string;
    name: string;
    logo_url: string | null;
    description: string | null;
    website_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbCategoryBrand {
    category_id: string;
    brand_id: string;
    display_order: number;
}

export interface DbProductType {
    id: string;
    slug: string;
    name: string;
    icon: string;
    description: string | null;
    category_id: string;
    brand_id: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbProduct {
    id: string;
    slug: string;
    name: string;
    
    // Relations
    category_id: string | null;
    brand_id: string | null;
    product_type_id: string | null;
    
    // Positionnement
    position: ProductPosition;
    
    // Amazon
    asin: string | null;
    amazon_url: string;
    
    // Contenu
    summary: string;
    verdict: string | null;
    
    // Image
    image_url: string | null;
    image_alt: string | null;
    
    // Indicateurs (1-5)
    rating_quality: number | null;
    rating_price: number | null;
    rating_durability: number | null;
    rating_reliability: number | null;
    
    // Recommandations
    recommended_for: string[];
    not_recommended_for: string[];
    
    // Prix
    price_display: string | null;
    
    // Meta
    is_active: boolean;
    is_featured: boolean;
    display_order: number;
    views_count: number;
    clicks_count: number;
    
    // Timestamps
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface DbAdmin {
    id: string;
    user_id: string;
    email: string;
    role: AdminRole;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// =====================================================
// VUE PRODUITS COMPLETS
// =====================================================

export interface DbProductFull extends DbProduct {
    category_slug: string | null;
    category_name: string | null;
    category_icon: string | null;
    brand_slug: string | null;
    brand_name: string | null;
    brand_logo: string | null;
    product_type_slug: string | null;
    product_type_name: string | null;
    product_type_icon: string | null;
    average_rating: number | null;
}

// =====================================================
// TYPES POUR FORMULAIRES (INSERT/UPDATE)
// =====================================================

export interface ProductInsert {
    slug: string;
    name: string;
    category_id?: string | null;
    brand_id?: string | null;
    product_type_id?: string | null;
    position: ProductPosition;
    asin?: string | null;
    amazon_url: string;
    summary: string;
    verdict?: string | null;
    image_url?: string | null;
    image_alt?: string | null;
    rating_quality?: number | null;
    rating_price?: number | null;
    rating_durability?: number | null;
    rating_reliability?: number | null;
    recommended_for?: string[];
    not_recommended_for?: string[];
    price_display?: string | null;
    is_active?: boolean;
    is_featured?: boolean;
}

export interface ProductUpdate extends Partial<ProductInsert> {
    id: string;
}

export interface CategoryInsert {
    slug: string;
    name: string;
    icon?: string;
    description?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    display_order?: number;
    is_active?: boolean;
}

export interface BrandInsert {
    slug: string;
    name: string;
    logo_url?: string | null;
    description?: string | null;
    website_url?: string | null;
    is_active?: boolean;
}

export interface ProductTypeInsert {
    slug: string;
    name: string;
    icon?: string;
    description?: string | null;
    category_id: string;
    brand_id: string;
    display_order?: number;
    is_active?: boolean;
}

// =====================================================
// HELPERS
// =====================================================

export const POSITION_LABELS: Record<ProductPosition, { label: string; emoji: string; color: string }> = {
    'best-value': { label: 'Meilleur rapport qualité/prix', emoji: '⭐', color: 'bg-yellow-500' },
    'middle-ground': { label: 'Juste milieu', emoji: '⚖️', color: 'bg-purple-500' },
    'budget': { label: 'Moins cher fiable', emoji: '💸', color: 'bg-green-500' }
};

export const CATEGORIES = [
    { slug: 'high-tech', name: 'High-Tech', icon: '💻' },
    { slug: 'maison', name: 'Maison', icon: '🏠' },
    { slug: 'cuisine', name: 'Cuisine', icon: '🍳' },
    { slug: 'sport', name: 'Sport & Bien-être', icon: '⚽' },
    { slug: 'beaute', name: 'Beauté & Soin', icon: '💄' }
] as const;

/**
 * Génère un slug à partir d'un texte
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/[^a-z0-9\s-]/g, '') // Garde uniquement lettres, chiffres, espaces, tirets
        .replace(/\s+/g, '-') // Remplace espaces par tirets
        .replace(/-+/g, '-') // Supprime tirets multiples
        .replace(/^-|-$/g, ''); // Supprime tirets en début/fin
}

/**
 * Calcule la note moyenne
 */
export function calculateAverageRating(product: DbProduct | DbProductFull): number {
    const ratings = [
        product.rating_quality,
        product.rating_price,
        product.rating_durability,
        product.rating_reliability
    ].filter((r): r is number => r !== null);
    
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}
