/**
 * Service de données Supabase
 * Centralise toutes les interactions avec la base de données
 * Utilisé par l'admin ET le front-end
 */
import { supabase } from './supabase';

// ============================================
// TYPES
// ============================================

export type ProductPosition = 'best-value' | 'middle-ground' | 'budget';

export interface DbCategory {
    id: string;
    slug: string;
    name: string;
    icon: string;
    description: string | null;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbBrand {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbProductType {
    id: string;
    slug: string;
    name: string;
    icon: string;
    description: string | null;
    category_id: string;
    brand_id: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DbProduct {
    id: string;
    slug: string;
    name: string;
    summary: string;
    verdict: string | null;
    amazon_url: string;
    asin: string | null;
    image_url: string | null;
    price_display: string | null;
    position: ProductPosition;
    rating_quality: number | null;
    rating_price: number | null;
    rating_durability: number | null;
    rating_reliability: number | null;
    recommended_for: string[];
    not_recommended_for: string[];
    category_id: string;
    brand_id: string;
    product_type_id: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Type enrichi avec les relations
export interface ProductFull extends DbProduct {
    category: DbCategory;
    brand: DbBrand;
    product_type: DbProductType;
    avg_rating: number;
}

// Types pour les liaisons many-to-many
export interface CategoryBrand {
    category_id: string;
    brand_id: string;
    display_order: number;
}

export interface ProductTypeBrand {
    product_type_id: string;
    brand_id: string;
    display_order: number;
}

// ============================================
// CATÉGORIES
// ============================================

export async function getCategories(): Promise<DbCategory[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
    
    if (error) {
        console.error('Erreur getCategories:', error);
        return [];
    }
    return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<DbCategory | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
    
    if (error) {
        console.error('Erreur getCategoryBySlug:', error);
        return null;
    }
    return data;
}

// ============================================
// MARQUES
// ============================================

export async function getBrands(): Promise<DbBrand[]> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getBrands:', error);
        return [];
    }
    return data || [];
}

export async function getBrandBySlug(slug: string): Promise<DbBrand | null> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
    
    if (error) {
        console.error('Erreur getBrandBySlug:', error);
        return null;
    }
    return data;
}

export async function getBrandsByCategory(categorySlug: string): Promise<DbBrand[]> {
    // D'abord récupérer la catégorie par son slug
    const category = await getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    // 1. Récupérer les marques liées via la table category_brands
    const { data: linkedData, error: linkedError } = await supabase
        .from('category_brands')
        .select('brand_id, brands(*)')
        .eq('category_id', category.id);
    
    if (!linkedError && linkedData && linkedData.length > 0) {
        // Utiliser les marques de la table de liaison
        const brands = linkedData
            .map((item: any) => item.brands)
            .filter((b: any) => b && b.is_active)
            .sort((a: DbBrand, b: DbBrand) => a.name.localeCompare(b.name));
        return brands;
    }
    
    // 2. Fallback: récupérer les marques qui ont des produits dans cette catégorie
    const { data, error } = await supabase
        .from('products')
        .select('brand_id, brands(*)')
        .eq('category_id', category.id)
        .eq('is_active', true);
    
    if (error) {
        console.error('Erreur getBrandsByCategory:', error);
        return [];
    }
    
    // Dédupliquer les marques
    const brandsMap = new Map<string, DbBrand>();
    data?.forEach((item: any) => {
        if (item.brands && !brandsMap.has(item.brand_id)) {
            brandsMap.set(item.brand_id, item.brands);
        }
    });
    
    return Array.from(brandsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// ============================================
// TYPES DE PRODUITS
// ============================================

export async function getProductTypes(): Promise<DbProductType[]> {
    const { data, error } = await supabase
        .from('product_types')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductTypes:', error);
        return [];
    }
    return data || [];
}

export async function getProductTypeBySlug(slug: string): Promise<DbProductType | null> {
    const { data, error } = await supabase
        .from('product_types')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
    
    if (error) {
        console.error('Erreur getProductTypeBySlug:', error);
        return null;
    }
    return data;
}

export async function getProductTypesByCategoryAndBrand(
    categoryId: string, 
    brandId: string
): Promise<DbProductType[]> {
    // 1. Récupérer les types de produits liés via la table product_type_brands
    const { data: linkedData, error: linkedError } = await supabase
        .from('product_type_brands')
        .select('product_type_id, product_types(*)')
        .eq('brand_id', brandId);
    
    if (!linkedError && linkedData && linkedData.length > 0) {
        // Filtrer par catégorie et retourner
        const productTypes = linkedData
            .map((item: any) => item.product_types)
            .filter((pt: any) => pt && pt.is_active && pt.category_id === categoryId)
            .sort((a: DbProductType, b: DbProductType) => a.name.localeCompare(b.name));
        
        if (productTypes.length > 0) {
            return productTypes;
        }
    }
    
    // 2. Fallback: récupérer via le brand_id direct (ancienne méthode)
    const { data, error } = await supabase
        .from('product_types')
        .select('*')
        .eq('category_id', categoryId)
        .eq('brand_id', brandId)
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductTypesByCategoryAndBrand:', error);
        return [];
    }
    return data || [];
}

export async function getProductTypesByCategory(categorySlug: string): Promise<DbProductType[]> {
    // D'abord récupérer la catégorie par son slug
    const category = await getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    const { data, error } = await supabase
        .from('product_types')
        .select('*')
        .eq('category_id', category.id)
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductTypesByCategory:', error);
        return [];
    }
    return data || [];
}

// ============================================
// PRODUITS
// ============================================

function enrichProduct(product: any): ProductFull {
    const ratings = [
        product.rating_quality,
        product.rating_price,
        product.rating_durability,
        product.rating_reliability
    ].filter(r => r !== null);
    
    const avg_rating = ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
    
    return {
        ...product,
        category: product.categories,
        brand: product.brands,
        product_type: product.product_types,
        avg_rating
    };
}

export async function getProducts(): Promise<ProductFull[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProducts:', error);
        return [];
    }
    
    return (data || []).map(enrichProduct);
}

export async function getProductBySlug(slug: string): Promise<ProductFull | null> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
    
    if (error) {
        console.error('Erreur getProductBySlug:', error);
        return null;
    }
    
    return enrichProduct(data);
}

export async function getProductById(id: string): Promise<ProductFull | null> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Erreur getProductById:', error);
        return null;
    }
    
    return enrichProduct(data);
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductFull[]> {
    const category = await getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('category_id', category.id)
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductsByCategory:', error);
        return [];
    }
    
    return (data || []).map(enrichProduct);
}

export async function getProductsByBrand(
    categorySlug: string, 
    brandSlug: string
): Promise<ProductFull[]> {
    const category = await getCategoryBySlug(categorySlug);
    const brand = await getBrandBySlug(brandSlug);
    
    if (!category || !brand) return [];
    
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('category_id', category.id)
        .eq('brand_id', brand.id)
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductsByBrand:', error);
        return [];
    }
    
    return (data || []).map(enrichProduct);
}

export async function getProductsByProductType(
    categorySlug: string,
    brandSlug: string,
    productTypeSlug: string
): Promise<ProductFull[]> {
    const category = await getCategoryBySlug(categorySlug);
    const brand = await getBrandBySlug(brandSlug);
    const productType = await getProductTypeBySlug(productTypeSlug);
    
    if (!category || !brand || !productType) return [];
    
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('category_id', category.id)
        .eq('brand_id', brand.id)
        .eq('product_type_id', productType.id)
        .eq('is_active', true)
        .order('position', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductsByProductType:', error);
        return [];
    }
    
    // Trier par position: best-value → middle-ground → budget
    const positionOrder = ['best-value', 'middle-ground', 'budget'];
    return (data || [])
        .map(enrichProduct)
        .sort((a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position));
}

export async function getProductsByProductTypeId(productTypeId: string): Promise<ProductFull[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('product_type_id', productTypeId)
        .eq('is_active', true)
        .order('position', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductsByProductTypeId:', error);
        return [];
    }
    
    // Trier par position: best-value → middle-ground → budget
    const positionOrder = ['best-value', 'middle-ground', 'budget'];
    return (data || [])
        .map(enrichProduct)
        .sort((a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position));
}

/**
 * Récupère les produits par type de produit ET par marque
 * Utilisé pour la page /categories/[category]/[brand]/[productType]
 */
export async function getProductsByProductTypeAndBrand(productTypeId: string, brandId: string): Promise<ProductFull[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('product_type_id', productTypeId)
        .eq('brand_id', brandId)
        .eq('is_active', true)
        .order('position', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductsByProductTypeAndBrand:', error);
        return [];
    }
    
    // Trier par position: best-value → middle-ground → budget
    const positionOrder = ['best-value', 'middle-ground', 'budget'];
    return (data || [])
        .map(enrichProduct)
        .sort((a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position));
}

export async function getProductsByPosition(position: ProductPosition): Promise<ProductFull[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('position', position)
        .eq('is_active', true)
        .order('name', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductsByPosition:', error);
        return [];
    }
    
    return (data || []).map(enrichProduct);
}

export async function searchProducts(query: string): Promise<ProductFull[]> {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,summary.ilike.%${query}%`)
        .order('name', { ascending: true })
        .limit(50);
    
    if (error) {
        console.error('Erreur searchProducts:', error);
        return [];
    }
    
    return (data || []).map(enrichProduct);
}

// ============================================
// CRUD PRODUITS (ADMIN)
// ============================================

export interface CreateProductInput {
    slug: string;
    name: string;
    summary: string;
    verdict?: string;
    amazon_url: string;
    asin?: string;
    image_url?: string;
    price_display?: string;
    position: ProductPosition;
    rating_quality?: number;
    rating_price?: number;
    rating_durability?: number;
    rating_reliability?: number;
    recommended_for?: string[];
    not_recommended_for?: string[];
    category_id: string;
    brand_id: string;
    product_type_id: string;
}

export async function createProduct(input: CreateProductInput): Promise<ProductFull | null> {
    const { data, error } = await supabase
        .from('products')
        .insert({
            ...input,
            recommended_for: input.recommended_for || [],
            not_recommended_for: input.not_recommended_for || [],
            is_active: true
        })
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .single();
    
    if (error) {
        console.error('Erreur createProduct:', error);
        return null;
    }
    
    return enrichProduct(data);
}

export async function updateProduct(
    id: string, 
    updates: Partial<CreateProductInput>
): Promise<ProductFull | null> {
    const { data, error } = await supabase
        .from('products')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
            *,
            categories(*),
            brands(*),
            product_types(*)
        `)
        .single();
    
    if (error) {
        console.error('Erreur updateProduct:', error);
        return null;
    }
    
    return enrichProduct(data);
}

export async function deleteProduct(id: string): Promise<boolean> {
    // Soft delete - on désactive juste le produit
    const { error } = await supabase
        .from('products')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);
    
    if (error) {
        console.error('Erreur deleteProduct:', error);
        return false;
    }
    
    return true;
}

// ============================================
// CRUD CATÉGORIES (ADMIN)
// ============================================

export interface CreateCategoryInput {
    slug: string;
    name: string;
    icon: string;
    description?: string;
    display_order?: number;
}

export async function createCategory(input: CreateCategoryInput): Promise<DbCategory | null> {
    const { data, error } = await supabase
        .from('categories')
        .insert({
            ...input,
            display_order: input.display_order || 0,
            is_active: true
        })
        .select()
        .single();
    
    if (error) {
        console.error('Erreur createCategory:', error);
        return null;
    }
    
    return data;
}

export async function updateCategory(
    id: string, 
    updates: Partial<CreateCategoryInput>
): Promise<DbCategory | null> {
    const { data, error } = await supabase
        .from('categories')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Erreur updateCategory:', error);
        return null;
    }
    
    return data;
}

export async function deleteCategory(id: string): Promise<boolean> {
    // Soft delete - on désactive juste la catégorie
    const { error } = await supabase
        .from('categories')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);
    
    if (error) {
        console.error('Erreur deleteCategory:', error);
        return false;
    }
    
    return true;
}

export async function getCategoryById(id: string): Promise<DbCategory | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Erreur getCategoryById:', error);
        return null;
    }
    return data;
}

// ============================================
// LIAISONS CATÉGORIE <-> MARQUE
// ============================================

export async function getCategoryBrands(categoryId: string): Promise<DbBrand[]> {
    const { data, error } = await supabase
        .from('category_brands')
        .select('brand_id, brands(*)')
        .eq('category_id', categoryId)
        .order('display_order', { ascending: true });
    
    if (error) {
        console.error('Erreur getCategoryBrands:', error);
        return [];
    }
    
    return (data || []).map((item: any) => item.brands).filter(Boolean);
}

export async function getBrandCategories(brandId: string): Promise<DbCategory[]> {
    const { data, error } = await supabase
        .from('category_brands')
        .select('category_id, categories(*)')
        .eq('brand_id', brandId)
        .order('display_order', { ascending: true });
    
    if (error) {
        console.error('Erreur getBrandCategories:', error);
        return [];
    }
    
    return (data || []).map((item: any) => item.categories).filter(Boolean);
}

export async function linkBrandToCategory(brandId: string, categoryId: string, displayOrder: number = 0): Promise<boolean> {
    const { error } = await supabase
        .from('category_brands')
        .upsert({
            brand_id: brandId,
            category_id: categoryId,
            display_order: displayOrder
        });
    
    if (error) {
        console.error('Erreur linkBrandToCategory:', error);
        return false;
    }
    return true;
}

export async function unlinkBrandFromCategory(brandId: string, categoryId: string): Promise<boolean> {
    const { error } = await supabase
        .from('category_brands')
        .delete()
        .eq('brand_id', brandId)
        .eq('category_id', categoryId);
    
    if (error) {
        console.error('Erreur unlinkBrandFromCategory:', error);
        return false;
    }
    return true;
}

export async function setBrandCategories(brandId: string, categoryIds: string[]): Promise<boolean> {
    console.log('setBrandCategories appelé avec:', { brandId, categoryIds });
    
    // Supprimer toutes les liaisons existantes
    const { error: deleteError } = await supabase
        .from('category_brands')
        .delete()
        .eq('brand_id', brandId);
    
    if (deleteError) {
        console.error('Erreur suppression liaisons brand-category:', deleteError);
        // Ne pas retourner false si c'est une erreur "no rows" (table peut être vide)
        if (deleteError.code !== 'PGRST116') {
            return false;
        }
    }
    
    // Créer les nouvelles liaisons
    if (categoryIds.length > 0) {
        const insertData = categoryIds.map((categoryId, index) => ({
            brand_id: brandId,
            category_id: categoryId,
            display_order: index
        }));
        console.log('Insertion liaisons:', insertData);
        
        const { data: insertResult, error: insertError } = await supabase
            .from('category_brands')
            .insert(insertData)
            .select();
        
        if (insertError) {
            console.error('Erreur création liaisons brand-category:', insertError);
            return false;
        }
        console.log('Liaisons créées:', insertResult);
    }
    
    return true;
}

// ============================================
// CRUD MARQUES (ADMIN)
// ============================================

export interface CreateBrandInput {
    slug: string;
    name: string;
    description?: string;
    logo_url?: string;
}

export async function createBrand(input: CreateBrandInput): Promise<DbBrand | null> {
    const { data, error } = await supabase
        .from('brands')
        .insert({
            ...input,
            is_active: true
        })
        .select()
        .single();
    
    if (error) {
        console.error('Erreur createBrand:', error);
        return null;
    }
    
    return data;
}

export async function updateBrand(
    id: string, 
    updates: Partial<CreateBrandInput>
): Promise<DbBrand | null> {
    const { data, error } = await supabase
        .from('brands')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Erreur updateBrand:', error);
        return null;
    }
    
    return data;
}

export async function deleteBrand(id: string): Promise<boolean> {
    // Soft delete - on désactive juste la marque
    const { error } = await supabase
        .from('brands')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);
    
    if (error) {
        console.error('Erreur deleteBrand:', error);
        return false;
    }
    
    return true;
}

export async function getBrandById(id: string): Promise<DbBrand | null> {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Erreur getBrandById:', error);
        return null;
    }
    return data;
}

// ============================================
// LIAISONS TYPE DE PRODUIT <-> MARQUES
// ============================================

export async function getProductTypeBrands(productTypeId: string): Promise<DbBrand[]> {
    const { data, error } = await supabase
        .from('product_type_brands')
        .select('brand_id, brands(*)')
        .eq('product_type_id', productTypeId)
        .order('display_order', { ascending: true });
    
    if (error) {
        console.error('Erreur getProductTypeBrands:', error);
        return [];
    }
    
    return (data || []).map((item: any) => item.brands).filter(Boolean);
}

export async function getBrandProductTypes(brandId: string): Promise<DbProductType[]> {
    const { data, error } = await supabase
        .from('product_type_brands')
        .select('product_type_id, product_types(*)')
        .eq('brand_id', brandId)
        .order('display_order', { ascending: true });
    
    if (error) {
        console.error('Erreur getBrandProductTypes:', error);
        return [];
    }
    
    return (data || []).map((item: any) => item.product_types).filter(Boolean);
}

export async function linkProductTypeToBrand(productTypeId: string, brandId: string, displayOrder: number = 0): Promise<boolean> {
    const { error } = await supabase
        .from('product_type_brands')
        .upsert({
            product_type_id: productTypeId,
            brand_id: brandId,
            display_order: displayOrder
        });
    
    if (error) {
        console.error('Erreur linkProductTypeToBrand:', error);
        return false;
    }
    return true;
}

export async function unlinkProductTypeFromBrand(productTypeId: string, brandId: string): Promise<boolean> {
    const { error } = await supabase
        .from('product_type_brands')
        .delete()
        .eq('product_type_id', productTypeId)
        .eq('brand_id', brandId);
    
    if (error) {
        console.error('Erreur unlinkProductTypeFromBrand:', error);
        return false;
    }
    return true;
}

export async function setProductTypeBrands(productTypeId: string, brandIds: string[]): Promise<boolean> {
    console.log('=== setProductTypeBrands appelé ===');
    console.log('productTypeId:', productTypeId);
    console.log('brandIds:', brandIds);
    
    // Supprimer toutes les liaisons existantes
    const { error: deleteError } = await supabase
        .from('product_type_brands')
        .delete()
        .eq('product_type_id', productTypeId);
    
    if (deleteError) {
        console.error('Erreur suppression liaisons product_type-brand:', deleteError);
        return false;
    }
    console.log('Anciennes liaisons supprimées');
    
    // Créer les nouvelles liaisons
    if (brandIds.length > 0) {
        const insertData = brandIds.map((brandId, index) => ({
            product_type_id: productTypeId,
            brand_id: brandId,
            display_order: index
        }));
        console.log('Données à insérer:', insertData);
        
        const { error: insertError } = await supabase
            .from('product_type_brands')
            .insert(insertData);
        
        if (insertError) {
            console.error('Erreur création liaisons product_type-brand:', insertError);
            return false;
        }
        console.log('Nouvelles liaisons créées avec succès');
    } else {
        console.log('Aucune marque à lier');
    }
    
    return true;
}

// ============================================
// LIAISONS TYPE DE PRODUIT <-> CATÉGORIES (MULTI-CATÉGORIES)
// ============================================

export async function getProductTypeCategories(productTypeId: string): Promise<DbCategory[]> {
    const { data, error } = await supabase
        .from('product_type_categories')
        .select('category_id, categories(*)')
        .eq('product_type_id', productTypeId)
        .order('display_order', { ascending: true });
    
    if (error) {
        // Table might not exist yet - fallback to category_id
        console.log('Table product_type_categories non disponible, utilisation du fallback');
        const { data: pt, error: ptError } = await supabase
            .from('product_types')
            .select('category_id, categories(*)')
            .eq('id', productTypeId)
            .single();
        
        if (ptError || !pt) return [];
        return [(pt as any).categories].filter(Boolean);
    }
    
    return (data || []).map((item: any) => item.categories).filter(Boolean);
}

export async function setProductTypeCategories(productTypeId: string, categoryIds: string[]): Promise<boolean> {
    console.log('=== setProductTypeCategories appelé ===');
    console.log('productTypeId:', productTypeId);
    console.log('categoryIds:', categoryIds);
    
    // Supprimer toutes les liaisons existantes
    const { error: deleteError } = await supabase
        .from('product_type_categories')
        .delete()
        .eq('product_type_id', productTypeId);
    
    if (deleteError) {
        console.error('Erreur suppression liaisons product_type-category:', deleteError);
        // La table n'existe peut-être pas encore
        return false;
    }
    console.log('Anciennes liaisons supprimées');
    
    // Créer les nouvelles liaisons
    if (categoryIds.length > 0) {
        const insertData = categoryIds.map((categoryId, index) => ({
            product_type_id: productTypeId,
            category_id: categoryId,
            display_order: index
        }));
        console.log('Données à insérer:', insertData);
        
        const { error: insertError } = await supabase
            .from('product_type_categories')
            .insert(insertData);
        
        if (insertError) {
            console.error('Erreur création liaisons product_type-category:', insertError);
            return false;
        }
        console.log('Nouvelles liaisons créées avec succès');
    }
    
    // Mettre à jour aussi le category_id principal (première catégorie)
    if (categoryIds.length > 0) {
        await supabase
            .from('product_types')
            .update({ category_id: categoryIds[0] })
            .eq('id', productTypeId);
    }
    
    return true;
}

// ============================================
// CRUD TYPES DE PRODUITS (ADMIN)
// ============================================

export interface CreateProductTypeInput {
    slug: string;
    name: string;
    icon: string;
    description?: string;
    category_id: string;
    brand_id: string;
}

export async function createProductType(input: CreateProductTypeInput): Promise<DbProductType | null> {
    const { data, error } = await supabase
        .from('product_types')
        .insert({
            ...input,
            is_active: true
        })
        .select()
        .single();
    
    if (error) {
        console.error('Erreur createProductType:', error);
        return null;
    }
    
    return data;
}

export async function updateProductType(
    id: string, 
    updates: Partial<CreateProductTypeInput>
): Promise<DbProductType | null> {
    const { data, error } = await supabase
        .from('product_types')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        console.error('Erreur updateProductType:', error);
        return null;
    }
    
    return data;
}

export async function deleteProductType(id: string): Promise<boolean> {
    // Soft delete - on désactive juste le type de produit
    const { error } = await supabase
        .from('product_types')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);
    
    if (error) {
        console.error('Erreur deleteProductType:', error);
        return false;
    }
    
    return true;
}

export async function getProductTypeById(id: string): Promise<DbProductType | null> {
    const { data, error } = await supabase
        .from('product_types')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Erreur getProductTypeById:', error);
        return null;
    }
    return data;
}

// ============================================
// STATISTIQUES
// ============================================

export async function getStats() {
    const [categories, brands, productTypes, products] = await Promise.all([
        getCategories(),
        getBrands(),
        getProductTypes(),
        getProducts()
    ]);
    
    return {
        totalCategories: categories.length,
        totalBrands: brands.length,
        totalProductTypes: productTypes.length,
        totalProducts: products.length,
        productsByPosition: {
            'best-value': products.filter(p => p.position === 'best-value').length,
            'middle-ground': products.filter(p => p.position === 'middle-ground').length,
            'budget': products.filter(p => p.position === 'budget').length
        },
        productsByCategory: Object.fromEntries(
            categories.map(c => [
                c.slug, 
                products.filter(p => p.category_id === c.id).length
            ])
        )
    };
}

// ============================================
// NAVIGATION / STRUCTURE
// ============================================

export async function getNavigationStructure() {
    const categories = await getCategories();
    const products = await getProducts();
    
    const structure = await Promise.all(
        categories.map(async (category) => {
            const categoryProducts = products.filter(p => p.category_id === category.id);
            const brandsInCategory = await getBrandsByCategory(category.id);
            
            const brandsWithTypes = await Promise.all(
                brandsInCategory.map(async (brand) => {
                    const productTypes = await getProductTypesByCategoryAndBrand(category.id, brand.id);
                    return {
                        ...brand,
                        productTypes: productTypes.map(pt => ({
                            ...pt,
                            productCount: categoryProducts.filter(p => p.product_type_id === pt.id).length
                        }))
                    };
                })
            );
            
            return {
                ...category,
                brands: brandsWithTypes.filter(b => b.productTypes.length > 0),
                productCount: categoryProducts.length
            };
        })
    );
    
    return structure.filter(c => c.brands.length > 0);
}

// ============================================
// HELPERS
// ============================================

export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export const POSITION_LABELS: Record<ProductPosition, { label: string; emoji: string; color: string; bgColor: string }> = {
    'best-value': { 
        label: 'Meilleur rapport qualité/prix', 
        emoji: '⭐', 
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100'
    },
    'middle-ground': { 
        label: 'Juste milieu', 
        emoji: '⚖️', 
        color: 'text-purple-700',
        bgColor: 'bg-purple-100'
    },
    'budget': { 
        label: 'Moins cher fiable', 
        emoji: '💸', 
        color: 'text-green-700',
        bgColor: 'bg-green-100'
    }
};
