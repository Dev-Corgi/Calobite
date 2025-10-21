'use client';

import { useReportWebVitals } from 'next/web-vitals';

// Type definition for Google Analytics gtag function
interface WindowWithGtag extends Window {
  gtag?: (...args: unknown[]) => void;
}

/**
 * Web Vitals tracking component
 * Sends Core Web Vitals metrics to Google Analytics
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to Google Analytics 4
    const windowWithGtag = window as unknown as WindowWithGtag;
    if (typeof window !== 'undefined' && windowWithGtag.gtag) {
      windowWithGtag.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric.name, metric.value, metric.rating);
    }
  });

  return null;
}
