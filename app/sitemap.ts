import { MetadataRoute } from 'next';
import { getTopBrandProductCodes } from '@/lib/top-brands';
import { STATIC_GENERATION_CONFIG } from '@/lib/static-config';

/**
 * Generate sitemap for SEO
 * Includes all statically generated product pages from top brands
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  
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
    
    // Limit to match the static generation limit
    const limitedCodes = productCodes.slice(0, STATIC_GENERATION_CONFIG.MAX_STATIC_PAGES);
    
    const productPages: MetadataRoute.Sitemap = limitedCodes.map((code) => ({
      url: `${baseUrl}/product/${code}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticPages, ...productPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static pages if there's an error
    return staticPages;
  }
}
