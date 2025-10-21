/**
 * SEO Utilities
 * 
 * Centralized functions for managing SEO metadata across the application
 * - Canonical URLs
 * - Meta robots
 * - Pagination links
 */

import { Metadata } from 'next';

/**
 * Get the base URL for canonical URLs
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
}

/**
 * Generate canonical URL for a given path
 * Handles query parameters and trailing slashes
 */
export function generateCanonicalUrl(path: string, includeQuery: boolean = false): string {
  const baseUrl = getBaseUrl();
  
  // Remove trailing slash if present
  const cleanPath = path.endsWith('/') && path !== '/' 
    ? path.slice(0, -1) 
    : path;
  
  // Remove query parameters if not included
  const finalPath = includeQuery 
    ? cleanPath 
    : cleanPath.split('?')[0];
  
  return `${baseUrl}${finalPath}`;
}

/**
 * Robots configuration presets
 */
export const ROBOTS_PRESETS = {
  // Default: Index and follow all links
  default: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  
  // No index: Don't index but follow links (for search results, pagination, etc.)
  noindex: {
    index: false,
    follow: true,
  },
  
  // No follow: Index but don't follow links (rare use case)
  nofollow: {
    index: true,
    follow: false,
  },
  
  // No index, no follow: Complete block (for admin, login pages)
  none: {
    index: false,
    follow: false,
  },
} as const;

/**
 * Page type for SEO configuration
 */
export type PageType = 
  | 'homepage'
  | 'static'      // About, FAQ, Contact, etc.
  | 'product'     // Product detail pages
  | 'search'      // Search results
  | 'pagination'  // Paginated lists
  | 'noindex';    // Pages that shouldn't be indexed

/**
 * Get robots configuration for page type
 */
export function getRobotsForPageType(pageType: PageType, hasQuery: boolean = false): Metadata['robots'] {
  switch (pageType) {
    case 'homepage':
    case 'static':
    case 'product':
      return ROBOTS_PRESETS.default;
    
    case 'search':
      // Index main search page, but not search results
      return hasQuery ? ROBOTS_PRESETS.noindex : ROBOTS_PRESETS.default;
    
    case 'pagination':
      // Don't index paginated pages to avoid duplicate content
      return ROBOTS_PRESETS.noindex;
    
    case 'noindex':
      return ROBOTS_PRESETS.noindex;
    
    default:
      return ROBOTS_PRESETS.default;
  }
}

/**
 * Generate complete SEO metadata for a page
 */
export interface GenerateSEOMetadataOptions {
  path: string;
  title: string;
  description: string;
  pageType: PageType;
  includeQueryInCanonical?: boolean;
  ogImage?: string;
  twitterImage?: string;
  keywords?: string[];
  noindex?: boolean;
}

export function generateSEOMetadata(options: GenerateSEOMetadataOptions): Metadata {
  const {
    path,
    title,
    description,
    pageType,
    includeQueryInCanonical = false,
    ogImage = '/og-image.png',
    twitterImage = '/twitter-card.png',
    keywords,
    noindex = false,
  } = options;
  
  const baseUrl = getBaseUrl();
  const canonicalUrl = generateCanonicalUrl(path, includeQueryInCanonical);
  const hasQuery = path.includes('?');
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noindex 
      ? ROBOTS_PRESETS.noindex 
      : getRobotsForPageType(pageType, hasQuery),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [{
        url: `${baseUrl}${ogImage}`,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${twitterImage}`],
    },
  };
}

/**
 * Pagination metadata
 * Generates prev/next links for paginated content
 */
export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function generatePaginationLinks(pagination: PaginationMetadata): {
  prev?: string;
  next?: string;
} {
  const { currentPage, totalPages, basePath } = pagination;
  const baseUrl = getBaseUrl();
  
  const links: { prev?: string; next?: string } = {};
  
  if (currentPage > 1) {
    const prevPage = currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`;
    links.prev = `${baseUrl}${prevPage}`;
  }
  
  if (currentPage < totalPages) {
    links.next = `${baseUrl}${basePath}?page=${currentPage + 1}`;
  }
  
  return links;
}

/**
 * Check if a URL should be indexed
 */
export function shouldIndexUrl(url: string): boolean {
  const urlObj = new URL(url, getBaseUrl());
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;
  
  // Don't index these paths
  const noindexPaths = [
    '/api/',
    '/admin/',
    '/_next/',
    '/404',
    '/500',
  ];
  
  if (noindexPaths.some(path => pathname.startsWith(path))) {
    return false;
  }
  
  // Don't index pages with certain query parameters
  const noindexParams = ['page', 'sort', 'filter', 'utm_'];
  for (const param of noindexParams) {
    if (Array.from(searchParams.keys()).some(key => 
      key.startsWith(param) || key.includes(param)
    )) {
      return false;
    }
  }
  
  // Don't index search results
  if (pathname === '/search' && searchParams.has('query')) {
    return false;
  }
  
  return true;
}

/**
 * Generate self-referencing canonical URL
 * This is the most common case - page points to itself
 */
export function generateSelfCanonical(pathname: string): string {
  return generateCanonicalUrl(pathname, false);
}

/**
 * Canonical URL variants for duplicate content
 */
export interface CanonicalVariant {
  canonical: string;
  variants: string[];
}

/**
 * Common canonical URL mappings
 * Maps variant URLs to their canonical version
 */
export const CANONICAL_MAPPINGS: Record<string, string> = {
  // Example: Multiple URLs pointing to same content
  // '/products': '/search',
  // '/items': '/search',
};

/**
 * Get canonical URL for a given path
 * Checks if there's a mapping, otherwise returns self-referencing canonical
 */
export function getCanonicalForPath(path: string): string {
  const cleanPath = path.split('?')[0];
  
  // Check if there's a specific mapping
  if (CANONICAL_MAPPINGS[cleanPath]) {
    return generateCanonicalUrl(CANONICAL_MAPPINGS[cleanPath]);
  }
  
  // Default: self-referencing canonical
  return generateSelfCanonical(cleanPath);
}
