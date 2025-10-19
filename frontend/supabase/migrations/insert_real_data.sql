-- 실제 하드코딩된 데이터를 DB에 삽입
-- 기존 테스트 데이터 삭제 후 실제 데이터 삽입

-- 1. 기존 테스트 데이터 삭제
DELETE FROM public.radio_stations;
DELETE FROM public.music_shows;
DELETE FROM public.comeback_schedule;

-- 2. 실제 라디오 방송국 데이터 삽입 (lib/constants/radio-shows.ts 기반)
INSERT INTO public.radio_stations (name, url, description, display_order) VALUES
('K-POP Connection (KBS World)', 'https://world.kbs.co.kr/service/program_songrequest_view.htm?bbs=kpop_conn_song&lang=e&no=48370&procode=kpop_conn', '영어로도 신청 가능한 글로벌 K-POP 신청 프로그램', 1),
('굿모닝 FM 테이입니다 (MBC)', 'https://www.imbc.com/broad/radio/fm4u/morningfm/requestsong/index.html', '문자 #8000으로도 참여 가능 (평일 아침)', 2),
('아이돌 스테이션 (MBC)', 'https://www.imbc.com/broad/radio/fm/idolstation/request/index.html', '아이돌 팬들을 위한 전용 신청 코너', 3),
('파워타임 (SBS)', 'https://programs.sbs.co.kr/radio/powertime/boards/57973', '사연과 신청곡을 받는 대표 프로그램 (매일 진행)', 4),
('두시탈출 컬투쇼 (SBS)', 'https://programs.sbs.co.kr/radio/cultwoshow/boards/58047', '사연 접수 및 생방송 방청 신청 가능 (평일 오후 2시)', 5),
('황제성의 황제파워 (SBS)', 'https://programs.sbs.co.kr/radio/kingcastlepower/main', '문자 사연, 전화 연결 등 다양한 참여 방식 (주말 프로그램)', 6);

-- 3. 실제 음악방송 데이터 삽입 (lib/constants/music-shows.ts 기반)
INSERT INTO public.music_shows (
  show_id, name, channel, schedule, voting_method, voting_app, 
  app_download_android, app_download_ios, app_download_web, program_url,
  icon, color, description, voting_period, voting_windows, notes, display_order
) VALUES
('the-show', '더쇼', 'SBS M', '매주 화요일 오후 6시', 'STAR PLANET', 'STAR PLANET',
 'https://play.google.com/store/apps/details?id=inc.rowem.passicon',
 'https://apps.apple.com/us/app/스타-플래닛-sbs-m-더-쇼-더-트롯쇼-투표/id1377584935',
 'https://www.thestarplanet.com/', NULL,
 '🟦', 'bg-purple-500', '젤리(Heart Jelly) 소모형 투표', '(통상) 금 20:00 ~ 월 14:00 KST', 
 '["사전투표: 금 20:00 ~ 월 14:00 KST", "실시간: 화 생방 중"]'::jsonb, '편성/특집에 따라 변동 가능', 1),

('show-champion', '쇼챔피언', 'MBC M', '매주 수요일 오후 6시', 'IDOL CHAMP', 'IDOL CHAMP',
 'https://play.google.com/store/apps/details?id=com.nwz.ichampclient',
 'https://apps.apple.com/us/app/idolchamp/id1185735018',
 'https://promo-web.idolchamp.com/app_proxy.html?type=vote&vote_id=vote_4473_1101&=', NULL,
 '🟩', 'bg-blue-500', 'Ruby/Time 하트 → 티켓 교환 후 투표', '(통상) 금 20:00 ~ 월 15:00 KST',
 '["사전투표: 금 20:00 ~ 월 15:00 KST"]'::jsonb, '라이브 투표 없음(사전투표 중심)', 2),

('mcountdown', '엠카운트다운', 'Mnet', '매주 목요일 오후 6시', 'Mnet Plus', 'Mnet Plus',
 NULL, NULL, 'https://www.mnetplus.world/ko/program/m-countdown/', NULL,
 '🟪', 'bg-pink-500', '주차별 투표 공지 페이지에서 바로 참여', '주차별 PRE-VOTE 게시',
 '["사전투표: 주차별 PRE-VOTE", "실시간: 생방 중 라이브 투표"]'::jsonb, '계정당 일일 5회 등 제한 공지 확인', 3),

('music-bank', '뮤직뱅크', 'KBS2', '매주 금요일 오후 5시', 'ALL CHART', 'ALL CHART',
 'https://play.google.com/store/apps/details?id=com.vlending.apps.mubeat', NULL,
 'https://link.inpock.co.kr/allchart', NULL,
 '🟥', 'bg-red-500', 'ALL CHART 앱에서 투표 참여', '월 11:00 ~ 수 11:00 KST',
 '["Fan Voting: 월 11:00 ~ 수 11:00 KST"]'::jsonb, 'K-Chart 최종 반영 지표는 KBS 방송 후 공지(디지털/음반/방송점수 중심)', 4),

('show-music-core', '쇼! 음악중심', 'MBC', '매주 토요일 오후 3시 15분', 'Mubeat Global Pre-Vote', 'Mubeat',
 'https://play.google.com/store/apps/details?id=com.vlending.apps.mubeat', NULL,
 'https://mubeat.tv/', 'https://program.imbc.com/Info/musiccore?seq=5',
 '🟧', 'bg-green-500', '공지 기간 내 Mubeat에서 진행', '공지 기간 내',
 '["사전투표: 공지 기간 내"]'::jsonb, '정확한 오픈/마감은 앱 공지 확인', 5),

('inkigayo', '인기가요', 'SBS', '매주 일요일 오후 3시 40분', 'SBS 공식 게시판', 'SBS 프로그램 홈페이지',
 NULL, NULL, 'https://programs.sbs.co.kr/enter/gayo/board/54771?cmd=view&page=1&board_no=8442&board_notice=Y',
 'https://programs.sbs.co.kr/enter/gayo/',
 '🟥', 'bg-yellow-500', '투표 공지 확인 후 참여', '공지 확인 필요',
 '["투표: SBS 공식 공지 확인"]'::jsonb, '디지털/음반/SNS 지표도 중요 - 스트리밍·구매·MV 조회 집중', 6);

-- 4. 컴백 스케줄 실제 데이터 (예시)
INSERT INTO public.comeback_schedule (date, event, status, description, datetime, display_order) VALUES
('2025.12.31', 'DAY6 2025년 활동 마무리', 'upcoming', '2025년 DAY6 활동 정리 및 팬미팅', '2025-12-31', 1),
('2025.11.30', 'DAY6 신곡 발매 예정', 'upcoming', '새로운 트랙 발매 예정일', '2025-11-30', 2);

-- 시퀀스 리셋 (자동 증가 ID 재정렬)
SELECT setval('radio_stations_id_seq', (SELECT MAX(id) FROM radio_stations));
SELECT setval('music_shows_id_seq', (SELECT MAX(id) FROM music_shows));
SELECT setval('comeback_schedule_id_seq', (SELECT MAX(id) FROM comeback_schedule));