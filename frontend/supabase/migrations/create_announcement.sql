-- 홍보성 공지 바텀시트 기능 (단일 공지)
-- Supabase Dashboard > SQL Editor에서 1회 실행

-- 단일 공지를 관리하는 테이블. 항상 1개 행만 사용한다.
--   version : 공지 내용이 수정될 때마다 증가한다.
--             사용자의 '다시 보지 않기'는 특정 version에 대해서만 유효하므로,
--             관리자가 내용을 바꾸면(version 증가) 이전에 닫았던 사용자에게도 다시 노출된다.
CREATE TABLE IF NOT EXISTS public.announcement (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  image_url TEXT,                             -- 앨범 사진 등 공지 이미지 public URL
  image_path TEXT,                            -- Storage 경로 (교체/삭제용)
  link_url TEXT,                              -- 클릭 시 이동할 링크 (선택)
  link_label VARCHAR,                         -- 링크 버튼 문구 (예: '자세히 보기')
  is_active BOOLEAN NOT NULL DEFAULT false,   -- 노출 여부
  version INTEGER NOT NULL DEFAULT 1,         -- 수정 시 증가 → '다시 보지 않기' 무효화
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 기본 1행 seed (없을 때만)
INSERT INTO public.announcement (title, body, is_active, version)
SELECT '', '', false, 1
WHERE NOT EXISTS (SELECT 1 FROM public.announcement);

-- Row Level Security
-- 이 앱의 관리자 모드는 Supabase Auth 로그인이 아니라 코드 입력 방식이라,
-- 프론트에서 오는 요청은 항상 anon 역할이다. 따라서 quick_links_content 테이블과
-- 동일하게 anon 쓰기를 허용하는 USING (true) 패턴을 사용한다.
-- (auth.role()='authenticated' 정책을 쓰면 관리자 저장이 조용히 실패한다.)
ALTER TABLE public.announcement ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모든 사용자)
CREATE POLICY "announcement_select_policy" ON public.announcement
  FOR SELECT USING (true);

-- 수정 권한
CREATE POLICY "announcement_update_policy" ON public.announcement
  FOR UPDATE USING (true);

-- 삽입 권한 (seed / 재생성 대비)
CREATE POLICY "announcement_insert_policy" ON public.announcement
  FOR INSERT WITH CHECK (true);
