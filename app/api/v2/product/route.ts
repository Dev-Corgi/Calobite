import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';

// Helper function to transform FormData into a structured Product object
function formDataToProduct(formData: FormData): Partial<Product> {
  const product: Partial<Product> = {};
  const nutriments: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value !== 'string') continue;

    if (key.startsWith('nutriment_')) {
      // e.g., nutriment_energy-kcal_100g -> nutriments: { 'energy-kcal_100g': ... }
      const nutrimentKey = key.replace('nutriment_', '');
      nutriments[nutrimentKey] = pd.to_numeric(value, { errors: 'coerce' }) ?? value;
    } else if (key.endsWith('_tags')) {
      // e.g., brands_tags -> ["tag1", "tag2"]
      product[key as keyof Product] = value.split(',').map(tag => tag.trim());
    } else {
      // Direct mapping
      product[key as keyof Product] = value;
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
