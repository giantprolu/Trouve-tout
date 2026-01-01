export interface Profile {
    id: string;
    email: string | null;
    username: string | null;
    avatar_url: string | null;
    updated_at: string | null;
}

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number | null;
    image_url: string | null;
    category: string | null;
    brand: string | null;
    created_at: string;
    // Indicateurs additionnels
    quality_rating?: number; // 1-5 ⭐
    price_rating?: number; // 1-5 💸
    durability_rating?: number; // 1-5 🔧
    service_rating?: number; // 1-5 🛠
    product_type?: string; // telephone, ordi, aspirateur, etc.
    tier?: 'budget' | 'mid-range' | 'best-value'; // Gamme de prix
    affiliate_link?: string;
}

export interface SearchHistory {
    id: string;
    user_id: string | null;
    query: string;
    created_at: string;
}

export interface ProductSelection {
    id: string;
    user_id: string | null;
    product_id: string | null;
    created_at: string;
}

// Types pour les catégories et marques
export interface Category {
    slug: string;
    name: string;
    description: string;
    icon: string;
    brands: Brand[];
    productTypes: string[];
}

export interface Brand {
    slug: string;
    name: string;
    logo?: string;
    description: string;
    category: string;
}

// Type pour les indicateurs de produit
export interface ProductRatings {
    quality: number; // 1-5 ⭐
    price: number; // 1-5 💸
    durability: number; // 1-5 🔧
    service: number; // 1-5 🛠
}

// Type pour le Choix Express
export interface ExpressChoice {
    budget: 'low' | 'medium' | 'high';
    category: string;
    useCase: string;
    preferences: string[];
}

// Type pour le Mode Cadeau
export interface GiftSelection {
    recipient: string;
    occasion: string;
    budget: number;
    interests: string[];
}

