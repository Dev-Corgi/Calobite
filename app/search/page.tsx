'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from "../_components/sidebar";
import { CardContent } from "@/components/ui/card";
import { SearchSection } from "./_components/search-section";
import { ClientResultList } from './_components/client-result-list';

interface SearchResult {
  code: string;
  product_name: string;
  brands?: string;
  nutriments: {
    'energy-kcal_100g'?: number;
  };
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const searchType = searchParams.get('type');
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalHits, setTotalHits] = useState(0);

  const fetchResults = useCallback(async (currentPage: number, currentQuery: string, type: string | null) => {
    if (!currentQuery) {
      setResults([]);
      setTotalHits(0);
      setLoading(false);
      setHasMore(false);
      return;
    }
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3001}`;
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
      setTotalHits(total || 0);
      if (type === 'brand') {
        setHasMore(false); // Pagination not supported for brand search
      } else {
        setHasMore(newProducts.length > 0 && (total > (currentPage * 30)));
      }
    } catch (e) {
      console.error('Failed to fetch results', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchResults(1, query, searchType);
  }, [query, searchType, fetchResults]);

  const handleLoadMore = () => {
    if (!loading && hasMore && searchType !== 'brand') {
      const newPage = page + 1;
      setPage(newPage);
      fetchResults(newPage, query, searchType);
    }
  };

  return (
    <section className="pt-8">
      <SearchSection query={query} totalHits={totalHits} searchType = {searchType} />
      <div className="bg-muted">
        <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-4 py-8 mt-8">
          <Sidebar />
          <div className="flex-1 max-w-5xl">
            <div className="pt-6">
              <ClientResultList 
                results={results}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                isInitialLoad={loading && page === 1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
