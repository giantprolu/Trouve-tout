-- =====================================================
-- MIGRATION: Support des types de produits multi-catégories
-- =====================================================
-- Ce script permet à un type de produit d'être dans plusieurs catégories
-- Exemple: "Montres" peut être dans "Sport" ET "High-Tech"
-- =====================================================

-- 1. Créer la table de liaison product_type_categories (many-to-many)
CREATE TABLE IF NOT EXISTS public.product_type_categories (
    product_type_id uuid REFERENCES public.product_types(id) ON DELETE CASCADE,
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    display_order integer DEFAULT 0,
    PRIMARY KEY (product_type_id, category_id)
);

-- 2. Migrer les données existantes (copier category_id vers la nouvelle table)
INSERT INTO public.product_type_categories (product_type_id, category_id)
SELECT id, category_id 
FROM public.product_types 
WHERE category_id IS NOT NULL
ON CONFLICT DO NOTHING;

-- 3. Index pour performances
CREATE INDEX IF NOT EXISTS idx_product_type_categories_category 
ON public.product_type_categories(category_id);

CREATE INDEX IF NOT EXISTS idx_product_type_categories_product_type 
ON public.product_type_categories(product_type_id);

-- =====================================================
-- NOTES D'UTILISATION:
-- =====================================================
-- Après cette migration:
-- - Un product_type peut avoir plusieurs categories via product_type_categories
-- - Le champ category_id dans product_types reste pour rétrocompatibilité
--   (catégorie principale)
-- - Les requêtes doivent utiliser la table de liaison pour les filtres
--
-- Exemple de requête pour trouver tous les types d'une catégorie:
-- SELECT pt.* FROM product_types pt
-- JOIN product_type_categories ptc ON pt.id = ptc.product_type_id
-- WHERE ptc.category_id = 'xxx'
-- =====================================================
