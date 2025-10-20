import { type NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

// Helper function to normalize nutriments data
const normalizeNutriments = (product: Product): Product => {
  if (!product || !product.nutriments) return product;

  const nutriments = { ...product.nutriments };

  if (typeof nutriments['energy-kcal_100g'] !== 'number') {
    const energyKj = nutriments['energy_100g'] || nutriments['energy-kj_100g'];
    if (typeof energyKj === 'number') {
      nutriments['energy-kcal_100g'] = energyKj / 4.184;
    }
  }

  return { ...product, nutriments };
};

type RouteParams = {
  params: Promise<{
    barcode: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  // Next.js 15: params is now async and must be awaited
  const { barcode } = await params;
  const { searchParams } = new URL(request.url);
  const fields = searchParams.get('fields');

  if (!barcode) {
    return NextResponse.json({ error: 'Barcode is required' }, { status: 400 });
  }

  try {
    // fields 파라미터가 있으면 해당 필드만, 없으면 모든 필드를 선택합니다.
    const selectQuery = fields ? fields.split(',').join(',') : '*';

    const { data, error } = await supabase
      .from('products')
      .select(selectQuery)
      .eq('code', barcode)
      .or(
        'nutriments->>energy-kcal_100g.not.is.null,' +
        'nutriments->>energy_100g.not.is.null,' +
        'nutriments->>energy-kj_100g.not.is.null'
      )
      .single<Partial<Product>>(); // Type the response as Partial<Product>

    if (error) {
      // PostgREST에서 PGRST116 코드는 행이 없음을 의미합니다.
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { status_verbose: 'product not found', status: 0, product: null },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { status_verbose: 'product not found', status: 0, product: null },
        { status: 404 }
      );
    }

    // Increment the view count for the product
    await supabase.rpc('increment_product_view_count', { product_code: barcode });

    // Normalize the nutriments data
    const normalizedProduct = normalizeNutriments(data as Product);

    return NextResponse.json({
      status_verbose: 'product found',
      status: 1,
      product: normalizedProduct
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { status_verbose: 'error', status: 0, error: 'Internal server error' },
      { status: 500 }
    );
  }
}