import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Product, Nutriments } from '@/lib/types';

// Helper function to transform FormData into a structured Product object
function formDataToProduct(formData: FormData): Partial<Product> {
  const product: Partial<Product> = {};
  const nutriments: Nutriments = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value !== 'string') continue;

    if (key.startsWith('nutriment_')) {
      const nutrimentKey = key.replace('nutriment_', '');
      const numericValue = parseFloat(value);
      nutriments[nutrimentKey] = isNaN(numericValue) ? value : numericValue;
    } else {
      // Direct mapping for other product fields
      const keyOfProduct = key as keyof Product;
      if (keyOfProduct in product) {
        const currentValue = product[keyOfProduct];
        if (typeof currentValue === 'number') {
          (product as Record<string, unknown>)[keyOfProduct] = parseFloat(value);
        } else {
          (product as Record<string, unknown>)[keyOfProduct] = value;
        }
      }
    }
  }

  if (Object.keys(nutriments).length > 0) {
    product.nutriments = nutriments;
  }

  return product;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const code = formData.get('code') as string;

    if (!code) {
      return NextResponse.json({ status: 400, status_verbose: 'barcode (code) is required' }, { status: 400 });
    }

    const productData = formDataToProduct(formData);
    productData.code = code; // Ensure code is set

    const { error } = await supabase.from('products').insert(productData);

    if (error) {
      console.error('Supabase insert error:', error);
      // Handle potential duplicate key error
      if (error.code === '23505') { // unique_violation
        return NextResponse.json({ status: 409, status_verbose: 'product already exists' }, { status: 409 });
      }
      return NextResponse.json({ status: 500, status_verbose: 'internal server error' }, { status: 500 });
    }

    return NextResponse.json(
      { status: 1, status_verbose: 'product created successfully', code },
      { status: 201 }
    );

  } catch (e) {
    console.error('Unexpected POST error:', e);
    return NextResponse.json({ status: 500, status_verbose: 'internal server error' }, { status: 500 });
  }
}
