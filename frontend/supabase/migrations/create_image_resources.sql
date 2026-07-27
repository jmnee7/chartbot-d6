-- ============================================================================
-- image_resources 테이블 / 스토리지 마이그레이션
-- 목적: 라디오 가이드 이미지 관리자 편집 기능 지원
--
-- 배경: 현재 저장소(migrations 디렉토리)에 image_resources 관련 마이그레이션 파일이
-- 존재하지 않음 (Supabase 콘솔에서 직접 생성되었을 가능성이 높음).
-- 이 파일은 기존 스키마를 문서화/재현하기 위한 목적이며, IF NOT EXISTS 를 사용하여
-- 이미 테이블/버킷이 존재하는 환경에서도 안전하게 재실행할 수 있다.
--
-- 이 마이그레이션 이후 radio_sbs / radio_kbs / radio_mbc 카테고리로
-- 라디오 가이드(SBS/KBS/MBC) 이미지를 관리자 모드에서 업로드/교체할 수 있다.
-- 실행 방법: Supabase Dashboard > SQL Editor에서 실행
-- ============================================================================

-- 1. image_resources 테이블 생성
-- lib/api/image-resources.ts 의 ImageResource 인터페이스와 컬럼 정확히 일치
CREATE TABLE IF NOT EXISTS public.image_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,               -- CHECK 제약 없음 (자유 문자열, radio 카테고리 확장 대응)
  file_url TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by TEXT NOT NULL DEFAULT 'admin'
);

-- 참고: 기존 테이블에 category CHECK 제약이 걸려있을 수 있다.
-- (예: streaming_guide/banner/voting_guide 만 허용하는 제약)
-- 그런 경우 아래와 같이 radio_sbs/radio_kbs/radio_mbc 를 허용하도록 제약을 갱신해야 한다.
-- 제약 이름은 환경마다 다를 수 있으므로 실제 이름을 information_schema 에서 확인 후 적용할 것.
--
-- ALTER TABLE public.image_resources DROP CONSTRAINT IF EXISTS image_resources_category_check;
-- ALTER TABLE public.image_resources ADD CONSTRAINT image_resources_category_check
--   CHECK (category IN (
--     'streaming_guide', 'banner', 'voting_guide',
--     'radio_sbs', 'radio_kbs', 'radio_mbc'
--   ));

-- 카테고리/노출 여부/정렬 순서 조회 성능을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_image_resources_category_active
  ON public.image_resources (category, is_active, display_order);

-- 2. Storage 버킷 생성 (streaming-guides)
-- 주의: 이 버킷은 스트리밍/투표/라디오 가이드 이미지가 모두 공유하는 버킷이며 public 이어야
-- 프론트에서 getPublicUrl 로 생성한 URL이 정상적으로 접근 가능하다.
INSERT INTO storage.buckets (id, name, public)
VALUES ('streaming-guides', 'streaming-guides', true)
ON CONFLICT (id) DO NOTHING;

-- 3. RLS 안내 (주석)
-- streaming 가이드 이미지 관리가 이미 운영 중이므로 아래 정책들은 이미 존재할 가능성이 높다.
-- 신규 환경에서 처음 생성하는 경우 프로젝트 정책에 맞게 아래와 유사한 정책을 적용할 것:
--
-- ALTER TABLE public.image_resources ENABLE ROW LEVEL SECURITY;
--
-- -- 누구나(anon 포함) 활성화된 이미지 목록을 읽을 수 있도록 허용
-- CREATE POLICY "image_resources_public_read"
--   ON public.image_resources FOR SELECT
--   USING (is_active = true);
--
-- -- 관리자(서비스 롤 또는 인증된 사용자)만 추가/수정/삭제 가능하도록 허용
-- CREATE POLICY "image_resources_admin_write"
--   ON public.image_resources FOR ALL
--   USING (auth.role() = 'authenticated')
--   WITH CHECK (auth.role() = 'authenticated');
--
-- storage.objects 에 대해서도 streaming-guides 버킷 read/write 정책이 이미 있을 것이므로
-- 별도 정책 추가 없이 기존 정책을 그대로 재사용한다.
--
-- ============================================================================
-- ⚠️ 보안 확인 체크리스트 (반드시 배포 전 Supabase 콘솔에서 점검)
-- ============================================================================
-- [배경] 이 앱의 이미지 업로드/삭제는 모두 브라우저에서 anon 키로 직접 실행된다
--        (lib/api/image-resources.ts). 관리자 판정(useAdminMode)은 localStorage 기반
--        클라이언트 상태일 뿐이며, Supabase Auth 세션을 발급하지 않는다.
--        => image_resources INSERT/UPDATE 및 storage.objects INSERT 정책이 anon 에게
--           열려 있으면, 비관리자도 콘솔에서 직접 API를 호출해 가이드 이미지를
--           업로드/교체할 수 있다. (라디오뿐 아니라 기존 스트리밍/투표도 동일)
--
-- --- (A) image_resources RLS 정책 현재 상태 확인 ---
-- SELECT relname, relrowsecurity
--   FROM pg_class WHERE relname = 'image_resources';
--   -- relrowsecurity = true 여야 RLS 활성 상태.
--
-- SELECT policyname, cmd, roles, qual, with_check
--   FROM pg_policies
--   WHERE schemaname = 'public' AND tablename = 'image_resources';
--   -- INSERT/UPDATE/DELETE(또는 ALL) 정책의 roles 에 anon 이 포함되어 있는지 확인.
--   -- anon 에게 write 가 열려 있으면 => 아래 (C) 로 잠글 것.
--
-- --- (B) storage.objects 정책 현재 상태 확인 (streaming-guides 버킷) ---
-- SELECT policyname, cmd, roles, qual, with_check
--   FROM pg_policies
--   WHERE schemaname = 'storage' AND tablename = 'objects';
--   -- streaming-guides 버킷에 anon INSERT 가 허용돼 있으면 파일 무단 업로드 가능.
--
-- --- (C) 권장: 쓰기는 authenticated/service_role 로 제한, 읽기만 공개 ---
--     (단, 현재 앱은 Auth 세션을 만들지 않으므로 이 정책을 걸면 프론트 업로드가
--      실패한다. 그 경우 업로드/삭제를 서버 라우트(/api/admin/*) + service_role 로
--      옮기는 후속 작업이 필요하다. 이번 배포에서는 정책 상태 "확인"까지가 범위.)
--
-- ALTER TABLE public.image_resources ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "image_resources_public_read" ON public.image_resources;
-- CREATE POLICY "image_resources_public_read"
--   ON public.image_resources FOR SELECT USING (is_active = true);
-- -- anon write 정책이 있다면 제거하고 authenticated/service_role 만 남길 것.
--
-- [결론] 이번 라디오 배포 자체는 새 취약점을 만들지 않는다(기존 패턴 재사용).
--        다만 anon write 가 열려 있다면 이미 존재하던 위험이 라디오 라우트까지
--        확대되므로, 위 (A)(B) 확인 결과를 배포 전 반드시 점검할 것.
