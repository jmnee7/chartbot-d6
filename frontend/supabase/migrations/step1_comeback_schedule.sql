-- Step 1: comeback_schedule 테이블만 먼저 생성 (테스트용)
-- Supabase Dashboard > SQL Editor에서 실행

CREATE TABLE IF NOT EXISTS public.comeback_schedule (
  id SERIAL PRIMARY KEY,
  date VARCHAR NOT NULL,                    -- "2025.09.14" 형식
  event VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  description TEXT,
  datetime VARCHAR NOT NULL,                -- "2025-09-14" 형식 (ISO date)
  display_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 기본 데이터 삽입 (테스트용)
INSERT INTO public.comeback_schedule (date, event, status, description, datetime, display_order) VALUES
('2025.12.01', 'DAY6 새 앨범 발매', 'upcoming', 'DAY6 정규 앨범 발매 예정', '2025-12-01', 1),
('2025.11.15', '컴백 티저 공개', 'upcoming', '컴백 관련 첫 티저 공개', '2025-11-15', 2)
ON CONFLICT DO NOTHING;

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_comeback_schedule_datetime ON public.comeback_schedule(datetime);
CREATE INDEX IF NOT EXISTS idx_comeback_schedule_active ON public.comeback_schedule(is_active);

-- Row Level Security 설정
ALTER TABLE public.comeback_schedule ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모든 사용자)
CREATE POLICY "Allow read access for comeback_schedule" ON public.comeback_schedule
  FOR SELECT USING (true);

-- 쓰기 권한 (인증된 사용자만)
CREATE POLICY "Allow write access for comeback_schedule" ON public.comeback_schedule
  FOR ALL USING (auth.role() = 'authenticated');