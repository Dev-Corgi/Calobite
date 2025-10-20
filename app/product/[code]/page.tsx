import { Suspense } from 'react';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductDetailSkeleton } from '../_components/ProductDetailSkeleton';

type Product = {
  code: string;
  product_name: string;
  brands: string;
  image_url: string;
  serving_size: string;
  serving_quantity: number;
  nutriments: {
    'energy-kcal_100g'?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
    fat_100g?: number;
    sugars_100g?: number;
    'saturated-fat_100g'?: number;
    sodium_100g?: number;
    [key: string]: any;
  };
};

async function getProduct(code: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3001}`;
  const res = await fetch(`${baseUrl}/api/v2/product/${code}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product data');
  }

  const data = await res.json();
  return data.product;
}

const ProductData = async ({ code }: { code: string }) => {
  const product = await getProduct(code);

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <p className="text-muted-foreground">The requested product (code: {code}) does not exist.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
};

export default function ProductPage({ params }: { params: { code: string } }) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductData code={params.code} />
    </Suspense>
  );
}