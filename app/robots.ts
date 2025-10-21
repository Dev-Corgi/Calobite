import { MetadataRoute } from 'next';

/**
 * Configure robots.txt for SEO
 * 
 * Best Practices:
 * - Allow all public pages for crawling
 * - Block only API routes, admin panels, and search result duplicates
 * - Specify sitemap.xml location
 * - Avoid crawlDelay (not supported by modern crawlers)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',                  // Block API endpoints
          '/admin/',                // Block admin panel
          '/search?*',              // Block search result pages to prevent duplicate content
          '/*?utm_*',               // Block tracking parameters
          '/*.json',                // Block JSON endpoints
          '/_next/static/',         // Block Next.js static files (already handled by CDN)
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/search?*',
          '/*?utm_*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/search?*',
          '/*?utm_*',
        ],
      },
      {
        userAgent: 'GPTBot',        // Block OpenAI crawler if desired
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
