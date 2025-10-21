/**
 * Pagination SEO Component
 * 
 * Adds rel="prev" and rel="next" links to paginated pages for SEO
 * Helps search engines understand the relationship between paginated pages
 * 
 * Usage:
 *   <PaginationSEO 
 *     currentPage={2} 
 *     totalPages={10} 
 *     basePath="/search" 
 *   />
 */

'use client';

import { useEffect } from 'react';

interface PaginationSEOProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function PaginationSEO({ currentPage, totalPages, basePath }: PaginationSEOProps) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
    
    // Remove existing pagination link tags
    const existingPrevLink = document.querySelector('link[rel="prev"]');
    const existingNextLink = document.querySelector('link[rel="next"]');
    existingPrevLink?.remove();
    existingNextLink?.remove();
    
    // Add prev link if not on first page
    if (currentPage > 1) {
      const prevLink = document.createElement('link');
      prevLink.rel = 'prev';
      prevLink.href = currentPage === 2 
        ? `${baseUrl}${basePath}` 
        : `${baseUrl}${basePath}?page=${currentPage - 1}`;
      document.head.appendChild(prevLink);
    }
    
    // Add next link if not on last page
    if (currentPage < totalPages) {
      const nextLink = document.createElement('link');
      nextLink.rel = 'next';
      nextLink.href = `${baseUrl}${basePath}?page=${currentPage + 1}`;
      document.head.appendChild(nextLink);
    }
    
    // Cleanup on unmount
    return () => {
      document.querySelector('link[rel="prev"]')?.remove();
      document.querySelector('link[rel="next"]')?.remove();
    };
  }, [currentPage, totalPages, basePath]);
  
  return null; // This component doesn't render anything
}

/**
 * Server-side pagination metadata generator
 * Use this in generateMetadata function
 */
export function generatePaginationMetadata(
  currentPage: number,
  totalPages: number,
  basePath: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  
  const metadata: {
    robots?: { index: boolean; follow: boolean };
    alternates?: {
      canonical?: string;
    };
  } = {};
  
  // Don't index paginated pages (page > 1) to avoid duplicate content
  if (currentPage > 1) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }
  
  // Canonical URL points to page 1 for all paginated pages
  // Or you can use view-all page if available
  metadata.alternates = {
    canonical: currentPage === 1 
      ? `${baseUrl}${basePath}`
      : `${baseUrl}${basePath}`, // All pages point to page 1
  };
  
  return metadata;
}
