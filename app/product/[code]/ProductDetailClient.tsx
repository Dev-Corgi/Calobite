'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from "../../_components/sidebar";
import { DetailHeroSection } from "../_components/hero-section";
import { NutritionInfo } from "../_components/nutrition-info";
import { ExerciseInfo } from "../_components/exercise-info";
import { OtherFoods } from "../_components/other-foods";

import { NutritionGraph } from "../_components/nutrition-graph";

import type { Product, Nutriments } from '@/lib/types';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product: initialProduct }: ProductDetailClientProps) {
  const [displayMode, setDisplayMode] = useState<'serving' | '100g'>('serving');

  const product = useMemo(() => {
    if (displayMode === '100g' || !initialProduct.serving_quantity) {
      return initialProduct;
    }

    const ratio = initialProduct.serving_quantity / 100;
    const newNutriments: Nutriments = {};

    // Check if nutriments exists before iterating
    if (!initialProduct.nutriments) {
      return initialProduct;
    }

    for (const key in initialProduct.nutriments) {
      const value = initialProduct.nutriments[key];
      if (key.endsWith('_100g') && typeof value === 'number') {
        newNutriments[key] = value * ratio;
      } else {
        newNutriments[key] = value;
      }
    }

    return { ...initialProduct, nutriments: newNutriments };
  }, [displayMode, initialProduct]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-4 py-8">
      <Sidebar />
      <div className="flex-1 space-y-8">
        <DetailHeroSection 
          product={product} 
          displayMode={displayMode} 
          setDisplayMode={setDisplayMode} 
        />
        <NutritionInfo product={product} />
        <NutritionGraph product={product} />
        <ExerciseInfo product={product} />
        <OtherFoods product={product} />
      </div>
    </div>
  );
}