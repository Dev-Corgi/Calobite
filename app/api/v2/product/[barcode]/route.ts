import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper function to normalize nutriments data
const normalizeNutriments = (product: any) => {
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

export async function GET(
  request: Request,
  { params }: { params: { barcode: string } }
) {
  const { barcode } = params;
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
      .single(); // 단일 레코드를 반환합니다.

    if (error) {
      // PostgREST에서 PGRST116 코드는 행이 없음을 의미합니다.
      if (error.code === 'PGRST116') {
        return NextResponse.json({ status_verbose: 'product not found', status: 0, product: null }, { status: 404 });
      }
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ status_verbose: 'product not found', status: 0, product: null }, { status: 404 });
    }

    // 이제 쿼리에서 이미 에너지 정보가 있는 제품만 가져오므로 별도의 체크가 필요 없습니다.

    // Increment the view count for the product
    await supabase.rpc('increment_product_view_count', { product_code: barcode });

    // 정규화된 제품 정보 가져오기
    const normalizedProduct = normalizeNutriments(data);

    // Open Food Facts API 형식에 맞춰 응답을 구성합니다.
    const responsePayload = {
        status: 1,
        status_verbose: 'product found',
        product: normalizedProduct,
        code: barcode,
    };

    return NextResponse.json(responsePayload);

  } catch (err) {
    console.error('Server error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
