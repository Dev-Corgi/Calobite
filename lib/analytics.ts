// project/lib/analytics.ts

// Type definition for Google Analytics gtag function
interface WindowWithGtag extends Window {
  gtag?: (...args: unknown[]) => void;
}

/**
 * Google Analytics event tracking helper
 * Safely sends events to GA4
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  const windowWithGtag = window as unknown as WindowWithGtag;
  if (typeof window !== 'undefined' && windowWithGtag.gtag) {
    windowWithGtag.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track search events
 */
export const trackSearch = (query: string, resultCount: number) => {
  trackEvent('search', 'Product Search', query, resultCount);
};

/**
 * Track product views
 */
export const trackProductView = (productName: string, productCode: string) => {
  trackEvent('view_item', 'Product', productName);
  
  const windowWithGtag = window as unknown as WindowWithGtag;
  if (typeof window !== 'undefined' && windowWithGtag.gtag) {
    windowWithGtag.gtag('event', 'view_item', {
      items: [{
        item_id: productCode,
        item_name: productName,
      }]
    });
  }
};

/**
 * Track page views (for SPA navigation)
 */
export const trackPageView = (url: string) => {
  const windowWithGtag = window as unknown as WindowWithGtag;
  if (typeof window !== 'undefined' && windowWithGtag.gtag) {
    windowWithGtag.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};
