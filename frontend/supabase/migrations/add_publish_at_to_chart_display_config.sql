-- 미발매곡 예약 노출 기능 (예약 교체 방식)
-- chart_display_config에 예약 관련 컬럼 추가
-- Supabase Dashboard > SQL Editor에서 1회 실행

-- 동작 방식:
--   target_song  => 현재 표시 중인 곡 (예약 발매 전까지 그대로 유지)
--   pending_song => 예약된 곡 (예: 미발매 신곡)
--   publish_at   => 예약 발매 시각 (KST 포함 TIMESTAMPTZ)
--
--   now < publish_at  => target_song(이전 곡)을 그대로 노출
--   now >= publish_at => pending_song(예약곡)으로 자동 전환
--   publish_at / pending_song 이 NULL 이면 예약 없이 target_song 만 노출 (기존 동작)

ALTER TABLE public.chart_display_config
  ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pending_song VARCHAR;

COMMENT ON COLUMN public.chart_display_config.publish_at IS
  '예약 발매 시각. 이 시각 이후부터 pending_song이 target_song 대신 노출된다. NULL이면 예약 없음.';
COMMENT ON COLUMN public.chart_display_config.pending_song IS
  '예약된 곡명. publish_at 이전에는 노출되지 않고, 발매 시각 이후 노출된다.';

-- 예약곡 조회 최적화용 인덱스
CREATE INDEX IF NOT EXISTS idx_chart_display_config_publish_at
  ON public.chart_display_config(publish_at);
