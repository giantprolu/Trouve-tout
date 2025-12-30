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
