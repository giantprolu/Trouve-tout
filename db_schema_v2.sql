-- =====================================================
-- SCHEMA V2 - Espace Admin Trouve-Tout
-- =====================================================
-- Ce schéma remplace/étend l'ancien pour supporter:
-- - Gestion complète des produits avec indicateurs
-- - Catégories, Marques et Types de produits
-- - Système d'administration
-- =====================================================

-- Supprimer les anciennes tables si migration
-- DROP TABLE IF EXISTS public.product_selections CASCADE;
-- DROP TABLE IF EXISTS public.products CASCADE;

-- =====================================================
-- 1. TABLES DE RÉFÉRENCE (Lookup tables)
-- =====================================================

-- Catégories principales (5)
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    icon text DEFAULT '📦',
    description text,
    meta_title text,
    meta_description text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Marques
CREATE TABLE IF NOT EXISTS public.brands (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    logo_url text,
    description text,
    website_url text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Association Catégorie <-> Marque (many-to-many)
CREATE TABLE IF NOT EXISTS public.category_brands (
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE,
    display_order integer DEFAULT 0,
    PRIMARY KEY (category_id, brand_id)
);

-- Types de produits (liés à une catégorie uniquement, les marques sont liées via product_type_brands)
CREATE TABLE IF NOT EXISTS public.product_types (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug text NOT NULL,
    name text NOT NULL,
    icon text DEFAULT '📦',
    description text,
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE, -- Marque principale (rétrocompatibilité)
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(slug, category_id, brand_id)
);

-- Association Type de produit <-> Marques (many-to-many)
CREATE TABLE IF NOT EXISTS public.product_type_brands (
    product_type_id uuid REFERENCES public.product_types(id) ON DELETE CASCADE,
    brand_id uuid REFERENCES public.brands(id) ON DELETE CASCADE,
    display_order integer DEFAULT 0,
    PRIMARY KEY (product_type_id, brand_id)
);

-- =====================================================
-- 2. TABLE PRODUITS PRINCIPALE
-- =====================================================

-- Enum pour le positionnement
CREATE TYPE product_position AS ENUM ('best-value', 'middle-ground', 'budget');

CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Identifiants
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    
    -- Relations
    category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id uuid REFERENCES public.brands(id) ON DELETE SET NULL,
    product_type_id uuid REFERENCES public.product_types(id) ON DELETE SET NULL,
    
    -- Positionnement
    position product_position NOT NULL DEFAULT 'middle-ground',
    
    -- Amazon
    asin text,
    amazon_url text NOT NULL,
    
    -- Contenu
    summary text NOT NULL, -- Résumé court (1-2 phrases)
    verdict text, -- Verdict éditorial
    
    -- Image
    image_url text,
    image_alt text,
    
    -- Indicateurs (1-5)
    rating_quality numeric(2,1) CHECK (rating_quality >= 1 AND rating_quality <= 5),
    rating_price numeric(2,1) CHECK (rating_price >= 1 AND rating_price <= 5),
    rating_durability numeric(2,1) CHECK (rating_durability >= 1 AND rating_durability <= 5),
    rating_reliability numeric(2,1) CHECK (rating_reliability >= 1 AND rating_reliability <= 5),
    
    -- Recommandations (arrays)
    recommended_for text[] DEFAULT '{}',
    not_recommended_for text[] DEFAULT '{}',
    
    -- Prix indicatif (texte pour flexibilité: "149 €", "De 99 à 149 €")
    price_display text,
    
    -- Meta
    is_active boolean DEFAULT true,
    is_featured boolean DEFAULT false,
    display_order integer DEFAULT 0,
    views_count integer DEFAULT 0,
    clicks_count integer DEFAULT 0,
    
    -- Timestamps
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    published_at timestamptz
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(product_type_id);
CREATE INDEX IF NOT EXISTS idx_products_position ON public.products(position);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);

-- =====================================================
-- 3. TABLE ADMINS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.admins (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email text NOT NULL,
    role text DEFAULT 'editor', -- 'super_admin', 'admin', 'editor'
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- 4. ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_type_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour catégories, marques, types, produits
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Public read category_brands" ON public.category_brands FOR SELECT USING (true);
CREATE POLICY "Public read product_types" ON public.product_types FOR SELECT USING (true);
CREATE POLICY "Public read product_type_brands" ON public.product_type_brands FOR SELECT USING (true);
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (is_active = true);

-- Admins peuvent tout faire
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY "Admins can manage brands" ON public.brands FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY "Admins can manage category_brands" ON public.category_brands FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY "Admins can manage product_types" ON public.product_types FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY "Admins can manage product_type_brands" ON public.product_type_brands FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY "Admins can manage products" ON public.products FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

CREATE POLICY "Admins can view admins" ON public.admins FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND is_active = true));

-- =====================================================
-- 5. FONCTIONS ET TRIGGERS
-- =====================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_types_updated_at BEFORE UPDATE ON public.product_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON public.admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour générer un slug
CREATE OR REPLACE FUNCTION generate_slug(input_text text)
RETURNS text AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                unaccent(input_text),
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. DONNÉES INITIALES - CATÉGORIES
-- =====================================================

INSERT INTO public.categories (slug, name, icon, description, meta_title, meta_description, display_order) VALUES
('high-tech', 'High-Tech', '💻', 'Smartphones, ordinateurs, tablettes et accessoires connectés des meilleures marques.', 'High-Tech - Smartphones, PC & Accessoires | Trouve-Tout Conseil', 'Découvrez notre sélection des meilleurs produits high-tech. Smartphones, ordinateurs, tablettes, écouteurs. Conseils d''achat personnalisés.', 1),
('maison', 'Maison', '🏠', 'Aspirateurs, purificateurs d''air, robots et équipements pour un intérieur impeccable.', 'Maison - Aspirateurs & Électroménager | Trouve-Tout Conseil', 'Découvrez notre sélection des meilleurs équipements maison. Aspirateurs, robots, purificateurs. Conseils d''achat personnalisés.', 2),
('cuisine', 'Cuisine', '🍳', 'Robots cuiseurs, machines à café, mixeurs et équipements pour cuisiner comme un chef.', 'Cuisine - Robots Cuiseurs & Cafetières | Trouve-Tout Conseil', 'Découvrez notre sélection des meilleurs équipements cuisine. Robots, cafetières, blenders. Conseils d''achat personnalisés.', 3),
('sport', 'Sport & Bien-être', '⚽', 'Montres GPS, équipements fitness, vélos et accessoires pour atteindre vos objectifs.', 'Sport & Bien-être - Montres GPS & Fitness | Trouve-Tout Conseil', 'Découvrez notre sélection des meilleurs équipements sportifs. Montres GPS, fitness, récupération. Conseils d''achat personnalisés.', 4),
('beaute', 'Beauté & Soin', '💄', 'Sèche-cheveux, lisseurs, épilateurs et brosses à dents des meilleures marques.', 'Beauté & Soin - Cheveux, Épilation & Hygiène | Trouve-Tout Conseil', 'Découvrez notre sélection des meilleurs appareils beauté. Dyson, GHD, Philips, Oral-B. Conseils d''achat personnalisés.', 5)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 7. VUE POUR RÉCUPÉRER LES PRODUITS COMPLETS
-- =====================================================

CREATE OR REPLACE VIEW public.products_full AS
SELECT 
    p.*,
    c.slug AS category_slug,
    c.name AS category_name,
    c.icon AS category_icon,
    b.slug AS brand_slug,
    b.name AS brand_name,
    b.logo_url AS brand_logo,
    pt.slug AS product_type_slug,
    pt.name AS product_type_name,
    pt.icon AS product_type_icon,
    (COALESCE(p.rating_quality, 0) + COALESCE(p.rating_price, 0) + COALESCE(p.rating_durability, 0) + COALESCE(p.rating_reliability, 0)) / 4.0 AS average_rating
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
LEFT JOIN public.brands b ON p.brand_id = b.id
LEFT JOIN public.product_types pt ON p.product_type_id = pt.id;
