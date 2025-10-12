-- quick_links_content 테이블 생성
CREATE TABLE IF NOT EXISTS quick_links_content (
  id SERIAL PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('radio', 'music_vote')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  songs TEXT[],
  radio_stations JSONB,
  vote_sms JSONB,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기존 하드코딩된 데이터 그대로 삽입
INSERT INTO quick_links_content (content_type, title, description, songs, radio_stations, is_active, display_order) VALUES
('radio', '라디오 신청', 'DAY6 라디오 신청하기', 
 ARRAY['INSIDE OUT', '꿈의 버스'], 
 '[
   {"name": "KBS", "sms_number": "8910", "color": "bg-red-500", "message_template": "DAY6(데이식스)의 ${selectedSong} 신청합니다."},
   {"name": "MBC", "sms_number": "8000", "color": "bg-blue-500", "message_template": "DAY6(데이식스)의 ${selectedSong} 신청합니다."},
   {"name": "SBS", "sms_number": "1077", "color": "bg-green-500", "message_template": "DAY6(데이식스)의 ${selectedSong} 신청합니다."}
 ]'::jsonb,
 true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO quick_links_content (content_type, title, description, vote_sms, is_active, display_order) VALUES
('music_vote', '음중 문자 투표', '음악중심 투표 참여',
 '{"sms_number": "0505", "message": "DAY6", "description": "DAY6 투표를 위해 모바일에서 접속해주세요.", "button_text": "DAY6 투표하기 (#0505)"}'::jsonb,
 true, 2)
ON CONFLICT DO NOTHING;

-- RLS 정책 설정 (읽기는 모든 사용자, 쓰기는 인증된 사용자만)
ALTER TABLE quick_links_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quick_links_content_select_policy" ON quick_links_content
  FOR SELECT USING (true);

CREATE POLICY "quick_links_content_update_policy" ON quick_links_content
  FOR UPDATE USING (true);

CREATE POLICY "quick_links_content_insert_policy" ON quick_links_content
  FOR INSERT WITH CHECK (true);