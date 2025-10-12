import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: '인증 코드가 필요합니다.' },
        { status: 400 }
      );
    }

    // Supabase에서 인증 코드 확인
    const { data, error } = await supabase
      .from('admin_auth_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: '잘못된 인증 코드입니다.' },
        { status: 401 }
      );
    }

    // 사용 횟수 업데이트
    await supabase
      .from('admin_auth_codes')
      .update({
        last_used_at: new Date().toISOString(),
        use_count: (data.use_count || 0) + 1
      })
      .eq('id', data.id);

    return NextResponse.json(
      { message: '인증 성공', code: data.code },
      { status: 200 }
    );

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}