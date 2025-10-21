/**
 * Sitemap utility functions for generating sitemap index
 * Use when total URLs exceed 45,000
 */

import { MetadataRoute } from 'next';

export const SITEMAP_CONFIG = {
  MAX_URLS_PER_SITEMAP: 45000,
  MAX_FILE_SIZE_MB: 50,
  SITEMAP_CHUNK_SIZE: 40000, // Split into chunks of 40k for safety margin
};

/**
 * Split URLs into multiple sitemap chunks
 * @param urls All URLs to include
 * @param chunkSize URLs per sitemap file
 * @returns Array of sitemap chunks
 */
export function splitIntoSitemaps(
  urls: MetadataRoute.Sitemap,
  chunkSize: number = SITEMAP_CONFIG.SITEMAP_CHUNK_SIZE
): MetadataRoute.Sitemap[] {
  const chunks: MetadataRoute.Sitemap[] = [];
  
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize));
  }
  
  return chunks;
}

/**
 * Calculate estimated sitemap file size
 * Each URL entry is roughly 100-150 bytes
 */
export function estimateSitemapSize(urlCount: number): number {
  const avgBytesPerUrl = 120;
  return (urlCount * avgBytesPerUrl) / (1024 * 1024); // Return in MB
}

/**
 * Check if sitemap needs to be split
 */
export function needsSitemapIndex(totalUrls: number): boolean {
  return totalUrls > SITEMAP_CONFIG.MAX_URLS_PER_SITEMAP;
}

/**
 * Generate sitemap index content
 * This would be used if implementing dynamic sitemap splitting
 */
export function generateSitemapIndexUrls(
  baseUrl: string,
  sitemapCount: number
): string[] {
  return Array.from(
    { length: sitemapCount },
    (_, i) => `${baseUrl}/sitemap-${i}.xml`
  );
}
