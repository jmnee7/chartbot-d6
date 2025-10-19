-- Step 3: music_shows 테이블 생성
-- Supabase Dashboard > SQL Editor에서 실행

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

-- 기본 데이터 삽입 (테스트용)
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

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_music_shows_active ON public.music_shows(is_active);
CREATE INDEX IF NOT EXISTS idx_music_shows_order ON public.music_shows(display_order);

-- Row Level Security 설정
ALTER TABLE public.music_shows ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모든 사용자)
CREATE POLICY "Allow read access for music_shows" ON public.music_shows
  FOR SELECT USING (true);

-- 쓰기 권한 (인증된 사용자만)
CREATE POLICY "Allow write access for music_shows" ON public.music_shows
  FOR ALL USING (auth.role() = 'authenticated');