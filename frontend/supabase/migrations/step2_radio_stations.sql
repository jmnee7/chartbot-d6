-- Step 2: radio_stations 테이블 생성
-- Supabase Dashboard > SQL Editor에서 실행

CREATE TABLE IF NOT EXISTS public.radio_stations (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  logo VARCHAR,                             -- 옵셔널
  description TEXT,                         -- 옵셔널
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 기본 데이터 삽입 (테스트용)
INSERT INTO public.radio_stations (name, url, logo, description, display_order) VALUES
('KBS', 'https://world.kbs.co.kr/service/program_main.htm?lang=e&procode=weekend', '', 'KBS 라디오', 1),
('MBC', 'https://www.imbc.com/broad/radio', '', 'MBC 라디오', 2),
('SBS', 'https://www.sbs.co.kr/radio?div=gnb_pc', '', 'SBS 라디오', 3)
ON CONFLICT DO NOTHING;

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_radio_stations_active ON public.radio_stations(is_active);
CREATE INDEX IF NOT EXISTS idx_radio_stations_order ON public.radio_stations(display_order);

-- Row Level Security 설정
ALTER TABLE public.radio_stations ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모든 사용자)
CREATE POLICY "Allow read access for radio_stations" ON public.radio_stations
  FOR SELECT USING (true);

-- 쓰기 권한 (인증된 사용자만)
CREATE POLICY "Allow write access for radio_stations" ON public.radio_stations
  FOR ALL USING (auth.role() = 'authenticated');