/**
 * Amazon Product Advertising API 5.0 Service
 * Documentation: https://webservices.amazon.com/paapi5/documentation/
 */

import crypto from 'crypto';

// Types pour l'API Amazon
export interface AmazonProduct {
    asin: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    currency: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    affiliateUrl: string;
    availability: string;
    brand: string;
    category: string;
    productType: string;
    isPrime: boolean;
    features: string[];
}

export interface AmazonSearchParams {
    keywords?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'relevance';
    itemCount?: number;
}

// Configuration Amazon PA-API
const AMAZON_CONFIG = {
    accessKey: import.meta.env.AMAZON_ACCESS_KEY || '',
    secretKey: import.meta.env.AMAZON_SECRET_KEY || '',
    partnerTag: import.meta.env.AMAZON_PARTNER_TAG || '',
    host: 'webservices.amazon.fr',
    region: 'eu-west-1',
    marketplace: 'www.amazon.fr'
};

// Mapping des catégories vers les SearchIndex Amazon
const CATEGORY_SEARCH_INDEX: Record<string, string> = {
    'high-tech': 'Electronics',
    'maison': 'HomeAndGarden',
    'cuisine': 'Kitchen',
    'sport': 'Sports',
    'beaute': 'Beauty'
};

// Mapping des types de produits vers les mots-clés Amazon
const PRODUCT_TYPE_KEYWORDS: Record<string, string> = {
    // High-Tech
    'smartphone': 'smartphone',
    'ordinateur': 'ordinateur portable laptop',
    'tablette': 'tablette tactile',
    'ecouteurs': 'écouteurs casque audio bluetooth',
    'montre-connectee': 'montre connectée smartwatch',
    
    // Maison
    'aspirateur': 'aspirateur balai sans fil',
    'aspirateur-robot': 'robot aspirateur',
    'purificateur': 'purificateur air',
    'climatiseur': 'climatiseur mobile',
    
    // Cuisine
    'robot-cuisine': 'robot cuisine multifonction',
    'mixeur': 'mixeur blender',
    'machine-cafe': 'machine à café automatique',
    'four': 'four micro-ondes',
    'robot-patissier': 'robot pâtissier',
    
    // Sport
    'velo': 'vélo électrique',
    'tapis-course': 'tapis de course',
    'montre-sport': 'montre GPS sport running',
    'halteres': 'haltères musculation',
    'velo-appartement': 'vélo appartement',
    
    // Beauté
    'seche-cheveux': 'sèche cheveux ionique',
    'lisseur': 'lisseur cheveux professionnel',
    'epilateur': 'épilateur électrique',
    'brosse-dents': 'brosse à dents électrique',
    'rasoir': 'rasoir électrique'
};

/**
 * Génère la signature AWS pour l'API
 */
function generateSignature(
    method: string,
    path: string,
    queryString: string,
    headers: Record<string, string>,
    payload: string,
    timestamp: string,
    date: string
): string {
    const algorithm = 'AWS4-HMAC-SHA256';
    const service = 'ProductAdvertisingAPI';
    
    // Canonical Request
    const canonicalHeaders = Object.keys(headers)
        .sort()
        .map(key => `${key.toLowerCase()}:${headers[key]}`)
        .join('\n');
    
    const signedHeaders = Object.keys(headers)
        .sort()
        .map(key => key.toLowerCase())
        .join(';');
    
    const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
    
    const canonicalRequest = [
        method,
        path,
        queryString,
        canonicalHeaders + '\n',
        signedHeaders,
        payloadHash
    ].join('\n');
    
    // String to Sign
    const credentialScope = `${date}/${AMAZON_CONFIG.region}/${service}/aws4_request`;
    const stringToSign = [
        algorithm,
        timestamp,
        credentialScope,
        crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');
    
    // Signing Key
    const kDate = crypto.createHmac('sha256', `AWS4${AMAZON_CONFIG.secretKey}`).update(date).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(AMAZON_CONFIG.region).digest();
    const kService = crypto.createHmac('sha256', kRegion).update(service).digest();
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
    
    // Signature
    const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
    
    return signature;
}

/**
 * Effectue une requête à l'API Amazon PA-API 5.0
 */
async function amazonApiRequest(operation: string, payload: object): Promise<any> {
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const date = timestamp.substring(0, 8);
    const path = `/paapi5/${operation.toLowerCase()}`;
    
    const payloadString = JSON.stringify(payload);
    
    const headers: Record<string, string> = {
        'content-encoding': 'amz-1.0',
        'content-type': 'application/json; charset=utf-8',
        'host': AMAZON_CONFIG.host,
        'x-amz-date': timestamp,
        'x-amz-target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`
    };
    
    const signature = generateSignature('POST', path, '', headers, payloadString, timestamp, date);
    
    const authHeader = `AWS4-HMAC-SHA256 Credential=${AMAZON_CONFIG.accessKey}/${date}/${AMAZON_CONFIG.region}/ProductAdvertisingAPI/aws4_request, SignedHeaders=${Object.keys(headers).sort().map(k => k.toLowerCase()).join(';')}, Signature=${signature}`;
    
    try {
        const response = await fetch(`https://${AMAZON_CONFIG.host}${path}`, {
            method: 'POST',
            headers: {
                ...headers,
                'Authorization': authHeader
            },
            body: payloadString
        });
        
        if (!response.ok) {
            throw new Error(`Amazon API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Amazon API Request failed:', error);
        throw error;
    }
}

/**
 * Recherche des produits sur Amazon
 */
export async function searchProducts(params: AmazonSearchParams): Promise<AmazonProduct[]> {
    const searchIndex = params.category ? CATEGORY_SEARCH_INDEX[params.category] : 'All';
    const keywords = params.keywords || PRODUCT_TYPE_KEYWORDS[params.keywords || ''] || '';
    
    const payload = {
        Keywords: params.brand ? `${params.brand} ${keywords}` : keywords,
        SearchIndex: searchIndex,
        PartnerTag: AMAZON_CONFIG.partnerTag,
        PartnerType: 'Associates',
        Marketplace: AMAZON_CONFIG.marketplace,
        Resources: [
            'Images.Primary.Large',
            'ItemInfo.Title',
            'ItemInfo.Features',
            'ItemInfo.ProductInfo',
            'ItemInfo.ByLineInfo',
            'Offers.Listings.Price',
            'Offers.Listings.SavingBasis',
            'Offers.Listings.DeliveryInfo.IsPrimeEligible',
            'Offers.Listings.Availability.Message',
            'CustomerReviews.StarRating',
            'CustomerReviews.Count',
            'BrowseNodeInfo.BrowseNodes'
        ],
        ItemCount: params.itemCount || 10
    };
    
    // Ajouter les filtres de prix si spécifiés
    if (params.minPrice || params.maxPrice) {
        (payload as any).MinPrice = params.minPrice ? params.minPrice * 100 : undefined;
        (payload as any).MaxPrice = params.maxPrice ? params.maxPrice * 100 : undefined;
    }
    
    // Ajouter le tri
    if (params.sortBy) {
        const sortMapping: Record<string, string> = {
            'price-asc': 'Price:LowToHigh',
            'price-desc': 'Price:HighToLow',
            'rating': 'AvgCustomerReviews',
            'reviews': 'Relevance',
            'relevance': 'Relevance'
        };
        (payload as any).SortBy = sortMapping[params.sortBy];
    }
    
    try {
        const response = await amazonApiRequest('SearchItems', payload);
        return parseAmazonResponse(response, params.category || '', params.keywords || '');
    } catch (error) {
        console.error('Search products failed:', error);
        return [];
    }
}

/**
 * Récupère les détails d'un produit par ASIN
 */
export async function getProductByAsin(asin: string): Promise<AmazonProduct | null> {
    const payload = {
        ItemIds: [asin],
        PartnerTag: AMAZON_CONFIG.partnerTag,
        PartnerType: 'Associates',
        Marketplace: AMAZON_CONFIG.marketplace,
        Resources: [
            'Images.Primary.Large',
            'Images.Variants.Large',
            'ItemInfo.Title',
            'ItemInfo.Features',
            'ItemInfo.ProductInfo',
            'ItemInfo.ByLineInfo',
            'ItemInfo.TechnicalInfo',
            'Offers.Listings.Price',
            'Offers.Listings.SavingBasis',
            'Offers.Listings.DeliveryInfo.IsPrimeEligible',
            'Offers.Listings.Availability.Message',
            'CustomerReviews.StarRating',
            'CustomerReviews.Count'
        ]
    };
    
    try {
        const response = await amazonApiRequest('GetItems', payload);
        const products = parseAmazonResponse(response, '', '');
        return products[0] || null;
    } catch (error) {
        console.error('Get product failed:', error);
        return null;
    }
}

/**
 * Parse la réponse de l'API Amazon en objets AmazonProduct
 */
function parseAmazonResponse(response: any, category: string, productType: string): AmazonProduct[] {
    if (!response.SearchResult?.Items && !response.ItemsResult?.Items) {
        return [];
    }
    
    const items = response.SearchResult?.Items || response.ItemsResult?.Items || [];
    
    return items.map((item: any) => {
        const listing = item.Offers?.Listings?.[0];
        const price = listing?.Price?.Amount || 0;
        const originalPrice = listing?.SavingBasis?.Amount;
        
        return {
            asin: item.ASIN,
            title: item.ItemInfo?.Title?.DisplayValue || '',
            description: item.ItemInfo?.Features?.DisplayValues?.join(' ') || '',
            price: price,
            originalPrice: originalPrice,
            currency: listing?.Price?.Currency || 'EUR',
            rating: parseFloat(item.CustomerReviews?.StarRating?.Value || '0'),
            reviewCount: parseInt(item.CustomerReviews?.Count?.Value || '0', 10),
            imageUrl: item.Images?.Primary?.Large?.URL || '',
            affiliateUrl: item.DetailPageURL || '',
            availability: listing?.Availability?.Message || 'Disponible',
            brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || '',
            category: category,
            productType: productType,
            isPrime: listing?.DeliveryInfo?.IsPrimeEligible || false,
            features: item.ItemInfo?.Features?.DisplayValues || []
        } as AmazonProduct;
    });
}

/**
 * Récupère les meilleurs produits par catégorie, marque et type
 */
export async function getBestProducts(
    category: string,
    brand: string,
    productType: string,
    tier: 'best-value' | 'mid-range' | 'budget'
): Promise<AmazonProduct[]> {
    const keywords = PRODUCT_TYPE_KEYWORDS[productType] || productType;
    
    let sortBy: AmazonSearchParams['sortBy'] = 'rating';
    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    
    // Ajuster les filtres selon le tier
    switch (tier) {
        case 'best-value':
            sortBy = 'rating';
            break;
        case 'mid-range':
            sortBy = 'relevance';
            break;
        case 'budget':
            sortBy = 'price-asc';
            break;
    }
    
    const products = await searchProducts({
        keywords,
        category,
        brand,
        sortBy,
        minPrice,
        maxPrice,
        minRating: tier === 'budget' ? 3.5 : 4.0,
        itemCount: 3
    });
    
    return products.slice(0, 3);
}

/**
 * Génère un lien d'affiliation Amazon
 */
export function generateAffiliateLink(asin: string): string {
    return `https://www.amazon.fr/dp/${asin}?tag=${AMAZON_CONFIG.partnerTag}`;
}

/**
 * Formate le prix en euros
 */
export function formatAmazonPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR' 
    }).format(price);
}

/**
 * Calcule le score de valeur (rapport qualité/prix)
 */
export function calculateValueScore(product: AmazonProduct): number {
    if (!product.price || product.price === 0) return 0;
    
    // Score basé sur le rating, le nombre d'avis et le prix
    const ratingScore = product.rating * 20; // 0-100
    const reviewScore = Math.min(product.reviewCount / 100, 1) * 20; // 0-20
    const primeBonus = product.isPrime ? 10 : 0;
    
    return ratingScore + reviewScore + primeBonus;
}

/**
 * Trie les produits par meilleur rapport qualité/prix
 */
export function sortByBestValue(products: AmazonProduct[]): AmazonProduct[] {
    return [...products].sort((a, b) => {
        const scoreA = calculateValueScore(a);
        const scoreB = calculateValueScore(b);
        return scoreB - scoreA;
    });
}

/**
 * Filtre les produits budget mais fiables (bon rating, prix bas)
 */
export function filterBudgetReliable(products: AmazonProduct[]): AmazonProduct[] {
    return products
        .filter(p => p.rating >= 4.0 && p.reviewCount >= 50)
        .sort((a, b) => a.price - b.price);
}
