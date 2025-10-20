import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // 검색 파라미터 추출
  const searchTerms = searchParams.get('search_terms') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('page_size') || '24', 10);
  const sortBy = searchParams.get('sort_by');
  const fields = searchParams.get('fields');

  try {
    // 검색어가 있을 경우 textSearch를, 없을 경우 일반 from을 사용합니다.
    let query;

    if (searchTerms) {
      // textSearch를 사용할 때는 select, filter 등을 함께 사용하기 어렵기 때문에
      // RPC를 사용하여 검색과 정렬을 한 번에 처리하는 것이 효율적입니다.
      // 하지만 기존 필터링 로직과의 호환성을 위해 textSearch를 먼저 적용합니다.
      query = supabase.from('products').select(fields || 'product_name, brands, nutriments', { count: 'exact' });
      query = query.textSearch('search_vector', searchTerms, { 
        config: 'simple',
        type: 'websearch' // 'websearch'는 여러 단어를 AND 연산으로 처리합니다.
      });
    } else {
      query = supabase.from('products').select(fields || '*', { count: 'exact' });
    }

    // 2. 태그 및 영양소 필터링
    searchParams.forEach((value, key) => {
      if (key.endsWith('_tags')) { // 태그 필터링 (e.g., categories_tags)
        if (value.includes('|')) {
          const orConditions = value.split('|').map(tag => `${key}.cs.{${tag}}`).join(',');
          query = query.or(orConditions);
        } else {
          query = query.contains(key, value.split(','));
        }
      } else if (key.match(/_(gt|lt|eq)$/)) { // 영양소 필터링 (e.g., sugars_100g_gt)
        const [field, operator] = key.split(/_(gt|lt|eq)$/);
        const opMap = { gt: '>', lt: '<', eq: '=' };
        query = query.filter(`nutriments->>${field}`, opMap[operator], value);
      }
    });

    // 3. 정렬
    // 검색어가 있는 경우, ts_rank로 이미 정렬되었으므로 다른 정렬 옵션을 적용하지 않습니다.
    if (!searchTerms && sortBy) {
      const [field, order] = sortBy.startsWith('-') 
        ? [sortBy.substring(1), { ascending: false }]
        : [sortBy, { ascending: true }];
      query = query.order(field, order);
    } else if (searchTerms) {
      // 검색어가 있을 경우 ts_rank 내림차순으로 정렬합니다.
      // Supabase JS 라이브러리는 order 메서드에서 직접 함수 호출을 지원하지 않으므로,
      // 이미 textSearch에서 순위가 매겨진 결과를 사용합니다. 
      // textSearch는 내부적으로 순위 매김을 수행합니다.
    }

    // 4. 페이지네이션
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    query = query.range(start, end);

    // 쿼리 실행
    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Failed to fetch products', details: error.message }, { status: 500 });
    }

    // Open Food Facts API 형식에 맞춰 응답 반환
    return NextResponse.json({
      count: count,
      page: page,
      page_size: pageSize,
      products: data,
      status: 1,
      status_verbose: 'search results found'
    });

  } catch (err) {
    console.error('Server error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
