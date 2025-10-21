/**
 * useBreadcrumbs Hook
 * 
 * Automatically generates breadcrumb items based on current route
 * Supports dynamic routes and custom labels
 * 
 * Usage:
 *   const breadcrumbs = useBreadcrumbs();
 *   const breadcrumbs = useBreadcrumbs({ customLabels: { 'product': 'Products' } });
 */

'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

interface UseBreadcrumbsOptions {
  /**
   * Custom labels for route segments
   * Example: { 'product': 'Products', 'about': 'About Us' }
   */
  customLabels?: Record<string, string>;
  
  /**
   * Custom breadcrumb items (overrides automatic generation)
   */
  customBreadcrumbs?: BreadcrumbItem[];
  
  /**
   * Whether to include home in breadcrumbs
   * @default true
   */
  includeHome?: boolean;
}

/**
 * Default route labels (can be overridden)
 */
const DEFAULT_LABELS: Record<string, string> = {
  // Main pages
  'about': 'About Us',
  'contact': 'Contact',
  'faq': 'FAQ',
  'search': 'Search',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  
  // Dynamic routes
  'product': 'Products',
};

/**
 * Format segment into readable label
 * Example: 'product-name' -> 'Product Name'
 */
function formatLabel(segment: string, customLabels?: Record<string, string>): string {
  // Check custom labels first
  if (customLabels && customLabels[segment]) {
    return customLabels[segment];
  }
  
  // Check default labels
  if (DEFAULT_LABELS[segment]) {
    return DEFAULT_LABELS[segment];
  }
  
  // Handle dynamic segments (e.g., [code])
  if (segment.startsWith('[') && segment.endsWith(']')) {
    // For dynamic routes, try to get actual value from URL
    // This will be handled by the parent component
    return segment.slice(1, -1);
  }
  
  // Format as title case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Hook to generate breadcrumb items from current pathname
 */
export function useBreadcrumbs(options: UseBreadcrumbsOptions = {}): BreadcrumbItem[] {
  const pathname = usePathname();
  const {
    customLabels,
    customBreadcrumbs,
    includeHome = true,
  } = options;
  
  return useMemo(() => {
    // Use custom breadcrumbs if provided
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }
    
    // Don't show breadcrumbs on homepage
    if (pathname === '/') {
      return [];
    }
    
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Add home
    if (includeHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
        isCurrent: false,
      });
    }
    
    // Build breadcrumb trail
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      breadcrumbs.push({
        label: formatLabel(segment, customLabels),
        href: currentPath,
        isCurrent: isLast,
      });
    });
    
    return breadcrumbs;
  }, [pathname, customLabels, customBreadcrumbs, includeHome]);
}

/**
 * Generate Schema.org BreadcrumbList for SEO
 */
export function generateBreadcrumbSchemaFromItems(
  breadcrumbs: BreadcrumbItem[],
  baseUrl: string = 'https://www.calobite.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${baseUrl}${crumb.href}`,
    })),
  };
}
