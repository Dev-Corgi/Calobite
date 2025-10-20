'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FoodListItem } from '@/components/food-list-item';

type Product = {
  code: string;
  brands: string;
};

type RelatedProduct = {
  code: string;
  product_name: string;
  brands: string;
  nutriments: {
    'energy-kcal_100g'?: number;
  };
};

interface OtherFoodsProps {
  product: Product;
}

export function OtherFoods({ product }: OtherFoodsProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  useEffect(() => {
    if (!product.brands) {
      return;
    }

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(`/api/v2/products/brand/${encodeURIComponent(product.brands)}?exclude=${product.code}&fields=code,product_name,brands,nutriments`);
        if (res.ok) {
          const data = await res.json();
          setRelatedProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [product.brands, product.code]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Other products from {product.brands}</h2>
      <div className="space-y-4">
        {relatedProducts.map((item) => {
          const calories = item.nutriments?.['energy-kcal_100g']
            ? `${Math.round(item.nutriments['energy-kcal_100g'])} Kcal`
            : 'N/A';

          return (
            <div key={item.code}>
              <FoodListItem 
                  code={item.code}
                  name={item.product_name} 
                  brands={item.brands || ''} 
                  calories={calories}
              />
            </div>
          )
        })}
      </div>
      <div className="text-center mt-6">
        <Button variant="link" className="text-muted-foreground underline"
        onClick={() => window.location.href = `/search?type=brand&query=${encodeURIComponent(product.brands)}&page=1`}
        >View all products from {product.brands}</Button>
      </div>
      <div className="mt-8 text-xs text-muted-foreground border-t pt-6 space-y-1">
        <p>ⓘ The copyright of all content and posts published on this site belongs to Pill-raise Inc.</p>
        <p>Unauthorized collection, reprinting, copying, and distribution of all content and posts on this site are strictly prohibited.</p>
        <p>All works, including review data, are protected by copyright law, so unauthorized theft and reprocessing are prohibited.</p>
      </div>
    </section>
  );
}