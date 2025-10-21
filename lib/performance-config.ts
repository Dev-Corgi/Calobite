/**
 * Performance Optimization Configuration
 * 
 * LCP (Largest Contentful Paint) optimization settings
 * Target: < 2.5s for good, < 4.0s for needs improvement
 */

export const PERFORMANCE_CONFIG = {
  // Font loading strategy
  fonts: {
    display: 'swap' as const,
    preload: true,
  },
  
  // Image optimization
  images: {
    formats: ['avif', 'webp'] as const,
    quality: 85,
    priority: {
      hero: true,
      aboveTheFold: true,
      belowTheFold: false,
    },
  },
  
  // Critical resources to preload
  preload: {
    fonts: [
      '/fonts/inter-var.woff2',
    ],
    criticalCSS: true,
  },
  
  // Bundle optimization
  bundle: {
    // Components to lazy load
    lazyLoad: [
      'recharts', // Heavy charting library
      'react-hook-form', // Form handling
      'dialog', // Modals/dialogs
    ],
    
    // Code splitting thresholds
    maxSize: {
      bundle: 200 * 1024, // 200KB
      chunk: 50 * 1024,   // 50KB
    },
  },
  
  // Resource hints
  resourceHints: {
    dns: [
      'https://www.google-analytics.com',
      'https://fonts.gstatic.com',
    ],
    preconnect: [
      'https://world.openfoodfacts.org',
    ],
  },
} as const;

/**
 * Check if resource should be preloaded
 */
export function shouldPreload(resourceType: 'font' | 'image' | 'css'): boolean {
  switch (resourceType) {
    case 'font':
      return PERFORMANCE_CONFIG.fonts.preload;
    case 'css':
      return PERFORMANCE_CONFIG.preload.criticalCSS;
    case 'image':
      return true; // Next.js handles this
    default:
      return false;
  }
}

/**
 * Get image priority based on position
 */
export function getImagePriority(position: 'hero' | 'above-fold' | 'below-fold'): boolean {
  switch (position) {
    case 'hero':
      return PERFORMANCE_CONFIG.images.priority.hero;
    case 'above-fold':
      return PERFORMANCE_CONFIG.images.priority.aboveTheFold;
    case 'below-fold':
      return PERFORMANCE_CONFIG.images.priority.belowTheFold;
    default:
      return false;
  }
}
