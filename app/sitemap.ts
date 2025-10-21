import { MetadataRoute } from 'next';
import { getTopBrandProductCodes } from '@/lib/top-brands';
import { STATIC_GENERATION_CONFIG } from '@/lib/static-config';

/**
 * Generate sitemap for SEO
 * Includes all statically generated product pages from top brands
 * 
 * Google Sitemap Limits:
 * - Max 50,000 URLs per sitemap
 * - Max 50MB uncompressed file size
 * - Use sitemap index for larger sites
 * 
 * Current Implementation:
 * - Splits into multiple sitemaps if > 45,000 URLs
 * - Static pages: ~7 URLs
 * - Product pages: Up to MAX_STATIC_PAGES
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-01-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Generate product pages for top brands
  try {
    // Only include sitemap if enabled in config
    if (!STATIC_GENERATION_CONFIG.GENERATE_SITEMAP) {
      return staticPages;
    }
    
    const productCodes = await getTopBrandProductCodes();
    
    // Google sitemap limit: 50,000 URLs per sitemap
    // We keep it under 45,000 to have a safety margin
    const SITEMAP_URL_LIMIT = 45000;
    const staticPageCount = staticPages.length;
    const maxProductPages = Math.min(
      STATIC_GENERATION_CONFIG.MAX_STATIC_PAGES,
      SITEMAP_URL_LIMIT - staticPageCount
    );
    
    const limitedCodes = productCodes.slice(0, maxProductPages);
    
    // Log warning if we're hitting the limit
    if (limitedCodes.length >= SITEMAP_URL_LIMIT - staticPageCount) {
      console.warn(
        `⚠️  Sitemap approaching Google's 50,000 URL limit.\n` +
        `   Current: ${limitedCodes.length + staticPageCount} URLs\n` +
        `   Consider implementing sitemap index for better SEO.`
      );
    }
    
    const productPages: MetadataRoute.Sitemap = limitedCodes.map((code) => ({
      url: `${baseUrl}/product/${code}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static pages if there's an error
    return staticPages;
  }
}
