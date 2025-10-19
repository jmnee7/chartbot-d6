-- 누락된 테이블들 생성 (정확한 스키마 기반)
-- 실행 방법: Supabase Dashboard > SQL Editor에서 실행

-- 1. comeback_schedule 테이블 생성
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

-- 2. radio_stations 테이블 생성
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

-- 3. music_shows 테이블 생성
CREATE TABLE IF NOT EXISTS public.music_shows (
  id SERIAL PRIMARY KEY,
  show_id VARCHAR NOT NULL UNIQUE,          -- unique identifier like "the-show"
  name VARCHAR NOT NULL,
  channel VARCHAR NOT NULL,
  schedule VARCHAR NOT NULL,
  voting_method VARCHAR NOT NULL,
  voting_app VARCHAR NOT NULL,
  app_download_android VARCHAR,             -- 옵셔널
  app_download_ios VARCHAR,                 -- 옵셔널
  app_download_web VARCHAR,                 -- 옵셔널
  program_url VARCHAR,                      -- 옵셔널
  icon VARCHAR NOT NULL,
  color VARCHAR NOT NULL,
  description TEXT NOT NULL,
  voting_period VARCHAR,                    -- 옵셔널
  voting_windows JSONB DEFAULT '[]'::jsonb, -- JSON array
  notes TEXT,                               -- 옵셔널
  has_voting BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 기본 데이터 삽입

-- comeback_schedule 기본 데이터
INSERT INTO public.comeback_schedule (date, event, status, description, datetime, display_order) VALUES
('2025.12.01', 'DAY6 새 앨범 발매', 'upcoming', 'DAY6 정규 앨범 발매 예정', '2025-12-01', 1),
('2025.11.15', '컴백 티저 공개', 'upcoming', '컴백 관련 첫 티저 공개', '2025-11-15', 2)
ON CONFLICT DO NOTHING;

-- radio_stations 기본 데이터  
INSERT INTO public.radio_stations (name, url, logo, description, display_order) VALUES
('KBS', 'https://world.kbs.co.kr/service/program_main.htm?lang=e&procode=weekend', '', 'KBS 라디오', 1),
('MBC', 'https://www.imbc.com/broad/radio', '', 'MBC 라디오', 2),
('SBS', 'https://www.sbs.co.kr/radio?div=gnb_pc', '', 'SBS 라디오', 3)
ON CONFLICT DO NOTHING;

-- music_shows 기본 데이터
INSERT INTO public.music_shows (
  show_id, name, channel, schedule, voting_method, voting_app, 
  icon, color, description, has_voting, display_order
) VALUES
('the-show', 'THE SHOW', 'SBS MTV', '화요일 18:00', '앱 투표', 'THE SHOW', 
 '🎭', 'bg-red-500', 'SBS MTV THE SHOW 음악방송', true, 1),
('show-champion', '쇼! 챔피언', 'MBC M', '수요일 18:00', '앱 투표', 'Show Champion', 
 '🏆', 'bg-blue-500', 'MBC M 쇼! 챔피언 음악방송', true, 2),
('m-countdown', 'M COUNTDOWN', 'Mnet', '목요일 18:00', '앱 투표', 'Mnet Plus', 
 '📺', 'bg-green-500', 'Mnet M COUNTDOWN 음악방송', true, 3)
ON CONFLICT (show_id) DO NOTHING;

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_comeback_schedule_datetime ON public.comeback_schedule(datetime);
CREATE INDEX IF NOT EXISTS idx_comeback_schedule_active ON public.comeback_schedule(is_active);
CREATE INDEX IF NOT EXISTS idx_radio_stations_active ON public.radio_stations(is_active);
CREATE INDEX IF NOT EXISTS idx_radio_stations_order ON public.radio_stations(display_order);
CREATE INDEX IF NOT EXISTS idx_music_shows_active ON public.music_shows(is_active);
CREATE INDEX IF NOT EXISTS idx_music_shows_order ON public.music_shows(display_order);

-- Row Level Security (RLS) 설정
ALTER TABLE public.comeback_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_shows ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모든 사용자)
CREATE POLICY "Allow read access for comeback_schedule" ON public.comeback_schedule
  FOR SELECT USING (true);

CREATE POLICY "Allow read access for radio_stations" ON public.radio_stations
  FOR SELECT USING (true);

CREATE POLICY "Allow read access for music_shows" ON public.music_shows
  FOR SELECT USING (true);

-- 쓰기 권한 (인증된 사용자만 - 관리자 모드)
CREATE POLICY "Allow write access for comeback_schedule" ON public.comeback_schedule
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write access for radio_stations" ON public.radio_stations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write access for music_shows" ON public.music_shows
  FOR ALL USING (auth.role() = 'authenticated');