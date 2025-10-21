/**
 * Configuration for static page generation
 * Adjust these values to control build behavior
 */

export const STATIC_GENERATION_CONFIG = {
  /**
   * Maximum number of product pages to statically generate
   * Higher values = longer build time but better SEO coverage
   * 
   * Recommendations:
   * - Development/Testing: 100-1000
   * - Small sites: 1000-5000
   * - Medium sites: 5000-10000
   * - Large sites: 10000-50000
   */
  MAX_STATIC_PAGES: parseInt(process.env.MAX_STATIC_PAGES || '10000', 10),

  /**
   * Batch size for database queries
   * Lower values = less memory usage but more queries
   * Higher values = fewer queries but more memory usage
   */
  DB_BATCH_SIZE: 10,

  /**
   * Maximum products per brand to fetch
   * Prevents any single brand from dominating the static pages
   * Set to 0 for unlimited
   */
  MAX_PRODUCTS_PER_BRAND: 1000,

  /**
   * ISR revalidation period (in seconds)
   * How often static pages should be regenerated
   * 
   * Common values:
   * - 3600 (1 hour)
   * - 43200 (12 hours)
   * - 86400 (24 hours)
   * - 604800 (1 week)
   */
  REVALIDATE_SECONDS: 86400, // 24 hours

  /**
   * Whether to include sitemap generation
   * Set to false if you have a custom sitemap solution
   */
  GENERATE_SITEMAP: true,

  /**
   * Whether to log detailed information during build
   */
  VERBOSE_LOGGING: process.env.NODE_ENV === 'development',
};

/**
 * Helper function to log with verbosity control
 */
export function logIfVerbose(...args: unknown[]) {
  if (STATIC_GENERATION_CONFIG.VERBOSE_LOGGING) {
    console.log(...args);
  }
}
