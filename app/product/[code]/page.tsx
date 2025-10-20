import { Suspense } from 'react';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductDetailSkeleton } from '../_components/ProductDetailSkeleton';
import type { Product } from '@/lib/types';



async function getProduct(code: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
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

export default async function ProductPage({ params }: { params: Promise<{ code: string }> }) {
  // Next.js 15: params is now async and must be awaited
  const { code } = await params;
  
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductData code={code} />
    </Suspense>
  );
}