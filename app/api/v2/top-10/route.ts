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

export async function GET() {
  // Next.js 15: cookies() is now async, pass the function directly
  const supabase = createRouteHandlerClient({ cookies });

  // top_10_products 뷰에서 에너지 정보가 있는 제품만 조회
  const { data, error } = await supabase
    .from('top_10_products')
    .select('*')
    .or('nutriments->>energy-kcal_100g.not.is.null, nutriments->>energy_100g.not.is.null, nutriments->>energy-kj_100g.not.is.null');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const normalizedData = data.map(normalizeNutriments);

  return NextResponse.json(normalizedData);
}
