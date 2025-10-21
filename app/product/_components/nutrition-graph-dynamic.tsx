/**
 * Dynamic Import wrapper for Nutrition Graph
 * Reduces initial bundle size by lazy-loading recharts
 */

import dynamic from 'next/dynamic';
import { NutritionGraphSkeleton } from './nutrition-graph-skeleton';
import type { Product } from '@/lib/types';

// Lazy load the chart component
const NutritionGraph = dynamic(
  () => import('./nutrition-graph').then(mod => ({ default: mod.NutritionGraph })),
  {
    loading: () => <NutritionGraphSkeleton />,
    ssr: false, // Charts don't need SSR
  }
);

export { NutritionGraph };
