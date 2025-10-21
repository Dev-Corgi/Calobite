import { Suspense } from 'react';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductDetailSkeleton } from '../_components/ProductDetailSkeleton';
import type { Product } from '@/lib/types';
import { getTopBrandProductCodes } from '@/lib/top-brands';
import type { Metadata } from 'next';
import { STATIC_GENERATION_CONFIG } from '@/lib/static-config';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { supabase } from '@/lib/supabase';



/**
 * Generate SEO-optimized product description with nutrition highlights
 */
function generateProductDescription(product: Product): string {
  const brand = product.brands || 'Unknown Brand';
  const name = product.product_name || 'Product';
  const calories = product.nutriments?.['energy-kcal_100g'];
  const protein = product.nutriments?.proteins_100g;
  const carbs = product.nutriments?.carbohydrates_100g;
  const fat = product.nutriments?.fat_100g;
  
  let desc = `${name} by ${brand}. `;
  
  if (calories) {
    desc += `${Math.round(calories)} calories per 100g`;
    if (protein) desc += `, ${protein}g protein`;
    if (carbs) desc += `, ${carbs}g carbs`;
    if (fat) desc += `, ${fat}g fat`;
    desc += '. ';
  }
  
  desc += 'View complete nutrition facts, ingredients, and allergen information.';
  
  return desc.length > 155 ? desc.slice(0, 152) + '...' : desc;
}

/**
 * Helper function to normalize nutriments data
 */
const normalizeNutriments = (product: Product): Product => {
  if (!product || !product.nutriments) return product;

  const nutriments = { ...product.nutriments };

  if (typeof nutriments['energy-kcal_100g'] !== 'number') {
    const energyKj = nutriments['energy_100g'] || nutriments['energy-kj_100g'];
    if (typeof energyKj === 'number') {
      nutriments['energy-kcal_100g'] = energyKj / 4.184;
    }
  }

  return { ...product, nutriments };
};

/**
 * Get product data directly from Supabase (for build-time static generation)
 * This avoids ECONNREFUSED errors during build by not calling API routes
 */
async function getProduct(code: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('code', code)
      .or(
        'nutriments->>energy-kcal_100g.not.is.null,' +
        'nutriments->>energy_100g.not.is.null,' +
        'nutriments->>energy-kj_100g.not.is.null'
      )
      .single<Partial<Product>>();

    if (error || !data) {
      return null;
    }

    // Normalize the nutriments data
    const normalizedProduct = normalizeNutriments(data as Product);
    return normalizedProduct;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

const ProductData = async ({ code }: { code: string }) => {
  const product = await getProduct(code);

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <p className="text-muted-foreground">The requested product (code: {code}) does not exist.</p>
      </div>
    );
  }

  // Generate structured data schemas
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${baseUrl}` },
    { name: 'Search', url: `${baseUrl}/search` },
    { name: product.product_name || 'Product', url: `${baseUrl}/product/${product.code}` }
  ]);

  return (
    <>
      {/* Product Schema for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <ProductDetailClient product={product} />
    </>
  );
};

/**
 * Generate static paths for top brand products
 * This will pre-render product pages for products from top 1000 brands
 */
export async function generateStaticParams() {
  try {
    console.log('Starting generateStaticParams for top brand products...');
    const productCodes = await getTopBrandProductCodes();
    
    // Limit the number of static pages based on configuration
    const limitedCodes = productCodes.slice(0, STATIC_GENERATION_CONFIG.MAX_STATIC_PAGES);
    
    console.log(`Generating ${limitedCodes.length} static pages out of ${productCodes.length} total products`);
    console.log(`ISR revalidation period: ${STATIC_GENERATION_CONFIG.REVALIDATE_SECONDS} seconds (${STATIC_GENERATION_CONFIG.REVALIDATE_SECONDS / 3600} hours)`);
    
    return limitedCodes.map((code) => ({
      code: code,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    // Return empty array on error to allow build to continue
    return [];
  }
}

/**
 * Configure dynamic params behavior
 * 'force-static' would error on unknown params
 * 'auto' or true will render unknown params on-demand
 */
export const dynamicParams = true;

/**
 * Configure ISR for dynamically generated pages
 * - Top brand products (from generateStaticParams): Full SSG at build time (permanent)
 * - Other products (dynamicParams = true): Generated on first visit, cached for 24 hours
 * 
 * Note: In Next.js 15, the pre-built pages from generateStaticParams remain permanently static,
 * while this revalidate setting only affects on-demand generated pages.
 */
export const revalidate = 86400; // 24 hours for dynamically generated pages

/**
 * Generate metadata for SEO
 */
export async function generateMetadata(
  { params }: { params: Promise<{ code: string }> }
): Promise<Metadata> {
  const { code } = await params;
  const product = await getProduct(code);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
  
  const description = generateProductDescription(product);
  
  // Optimize title length (target: 50-60 chars)
  const brandPart = product.brands || 'Unknown Brand';
  const productTitle = product.product_name || 'Product';
  
  // Try full version first
  let title = `${productTitle} by ${brandPart} - Nutrition Facts | Calobite`;
  
  // If too long, use shorter version
  if (title.length > 60) {
    title = `${productTitle} - Nutrition Facts | Calobite`;
  }
  
  // If still too long, truncate product name
  if (title.length > 60) {
    const maxProductLength = 60 - ' - Nutrition Facts | Calobite'.length;
    const truncatedProduct = productTitle.slice(0, maxProductLength);
    title = `${truncatedProduct} - Nutrition Facts | Calobite`;
  }
  
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/product/${code}`,
    },
    openGraph: {
      title: product.product_name || 'Product',
      description,
      images: product.image_url ? [product.image_url] : [`${baseUrl}/og-image.png`],
      url: `${baseUrl}/product/${code}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.product_name || 'Product',
      description,
      images: product.image_url ? [product.image_url] : [`${baseUrl}/twitter-card.png`],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ code: string }> }) {
  // Next.js 15: params is now async and must be awaited
  const { code } = await params;
  
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductData code={code} />
    </Suspense>
  );
}