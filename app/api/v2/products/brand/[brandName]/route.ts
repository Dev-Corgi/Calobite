import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Product } from '@/lib/types';

export const dynamic = "force-dynamic";

// Helper function to normalize nutriments data
const normalizeNutriments = (product: Product): Product => {
  if (!product.nutriments) return product;

  const nutriments = { ...product.nutriments };

  if (typeof nutriments['energy-kcal_100g'] !== 'number') {
    const energyKj = nutriments['energy_100g'] || nutriments['energy-kj_100g'];
    if (typeof energyKj === 'number') {
      nutriments['energy-kcal_100g'] = energyKj / 4.184;
    }
  }

  return { ...product, nutriments };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ brandName: string }> }
) {
  // Next.js 15: params is now async and must be awaited
  const { brandName } = await params;
  const { searchParams } = new URL(request.url);
  const currentProductCode = searchParams.get('exclude'); // 현재 제품 코드를 제외하기 위함

  if (!brandName) {
    return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
  }

  // Next.js 15: cookies() is now async, pass the function directly
  const supabase = createRouteHandlerClient({ cookies });

  let query = supabase
    .from('products')
    .select('code, product_name, image_small_url, brands, nutriments')
    .ilike('brands', `%${decodeURIComponent(brandName)}%`)
    .or(
      'nutriments->>energy-kcal_100g.not.is.null,' +
      'nutriments->>energy_100g.not.is.null,' +
      'nutriments->>energy-kj_100g.not.is.null'
    )
    .limit(5);

  if (currentProductCode) {
    query = query.not('code', 'eq', currentProductCode);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const normalizedData = data.map(normalizeNutriments);

  return NextResponse.json(normalizedData);
}
