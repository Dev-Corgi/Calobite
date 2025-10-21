'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClientResultList } from './_components/client-result-list';

interface SearchPageClientProps {
  initialQuery: string;
  initialType?: string;
}

interface SearchResult {
  code: string;
  product_name: string;
  brands?: string;
  nutriments: {
    'energy-kcal_100g'?: number;
  };
}

/**
 * Client-side search functionality component
 * Handles dynamic search results and pagination
 */
export function SearchPageClient({ initialQuery, initialType }: SearchPageClientProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = useCallback(async (currentPage: number, currentQuery: string, type: string | undefined) => {
    if (!currentQuery) {
      setResults([]);
      setLoading(false);
      setHasMore(false);
      return;
    }
    
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
      let url = '';
      if (type === 'brand') {
        url = `${baseUrl}/api/v2/products/brand/${encodeURIComponent(currentQuery)}?page=${currentPage}&page_size=30`;
      } else {
        url = `${baseUrl}/api/v2/search?search_terms=${encodeURIComponent(currentQuery)}&page=${currentPage}&page_size=30&fields=code,product_name,brands,nutriments`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      const newProducts = type === 'brand' ? data : data.products;
      const total = type === 'brand' ? data.length : data.count;

      setResults(prev => currentPage === 1 ? newProducts : [...prev, ...newProducts]);
      setHasMore(type === 'brand' ? false : newProducts.length > 0 && (total > (currentPage * 30)));
    } catch (e) {
      console.error('Failed to fetch results', e);
      setResults([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchResults(1, initialQuery, initialType);
  }, [initialQuery, initialType, fetchResults]);

  const handleLoadMore = () => {
    if (!loading && hasMore && initialType !== 'brand') {
      const newPage = page + 1;
      setPage(newPage);
      fetchResults(newPage, initialQuery, initialType);
    }
  };

  return (
    <ClientResultList 
      results={results}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      isInitialLoad={loading && page === 1}
    />
  );
}
