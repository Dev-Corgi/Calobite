import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 서비스 역할 키를 가져옵니다.
// 서비스 역할 키는 RLS(Row Level Security)를 우회하기 위해 서버 측에서 사용됩니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and service role key are required.');
}

// 서버용 Supabase 클라이언트를 생성하고 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
