// /**
//  * Analytics Wrapper with optimized loading
//  * Defers analytics to prevent blocking main thread
//  */

// 'use client';

// import { useEffect } from 'react';
// import Script from 'next/script';

// interface AnalyticsWrapperProps {
//   gaId: string;
// }

// export function AnalyticsWrapper({ gaId }: AnalyticsWrapperProps) {
//   useEffect(() => {
//     // Initialize dataLayer
//     if (typeof window !== 'undefined') {
//       window.dataLayer = window.dataLayer || [];
//       function gtag(...args: any[]) {
//         window.dataLayer.push(args);
//       }
//       gtag('js', new Date());
//       gtag('config', gaId, {
//         page_path: window.location.pathname,
//       });
//     }
//   }, [gaId]);

//   return (
//     <>
//       {/* Google Analytics - Deferred loading */}
//       <Script
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
//       />
//     </>
//   );
// }

// // Type augmentation for dataLayer
// declare global {
//   interface Window {
//     dataLayer: any[];
//   }
// }
