'use client';

import { useEffect, useRef } from 'react';
import { FoodListItem } from '@/components/food-list-item';
import { Button } from '@/components/ui/button';
import { ResultListSkeleton } from './result-list-skeleton';
import { useIntersection } from '@mantine/hooks';

interface SearchResult {
  code: string;
  product_name: string;
  brands?: string;
  nutriments: {
    'energy-kcal_100g'?: number;
  };
}

interface ClientResultListProps {
  results: SearchResult[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  isInitialLoad: boolean;
}

export function ClientResultList({ results, loading, hasMore, onLoadMore, isInitialLoad }: ClientResultListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: loadMoreRef.current,
    threshold: 1.0,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [entry, hasMore, loading, onLoadMore]);

  if (isInitialLoad) {
    return <ResultListSkeleton />;
  }

  if (results.length === 0 && !loading) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        <p>Oh, can&apos;t find the food you&apos;re looking for?</p>
        <p>Please leave your feedback at the email below!</p>
        <p className="font-semibold text-foreground">support@pillyze.com</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((item) => (
        <FoodListItem
          key={item.code}
          code={item.code}
          name={item.product_name}
          brands={`${item.brands || ''}`.trim()}
          calories={`${item.nutriments['energy-kcal_100g'] ? Math.round(item.nutriments['energy-kcal_100g']) : 'N/A'} Kcal`}
        />
      ))}
      
      <div ref={ref}>
        {hasMore && (
          <Button
            variant="outline"
            className="w-full bg-background hover:bg-muted"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load 30 more'}
          </Button>
        )}
      </div>
    </div>
  );
}
