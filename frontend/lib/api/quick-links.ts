import { supabase } from "@/lib/supabase/client";

// 빠른 링크 콘텐츠 타입
export interface QuickLinksContent {
  id: number;
  content_type: 'radio' | 'music_vote'; // 라디오 또는 음중투표
  title: string;
  description: string;
  songs?: string[]; // 타이틀곡 목록 (라디오용)
  radio_stations?: RadioStationSMS[]; // 라디오 방송국 정보
  vote_sms?: VoteSMSInfo; // 투표 SMS 정보
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// 라디오 방송국 SMS 정보
export interface RadioStationSMS {
  name: string; // KBS, MBC, SBS
  sms_number: string; // 8910, 8000, 1077
  color: string; // bg-red-500, bg-blue-500, bg-green-500
  message_template: string; // "DAY6(데이식스)의 ${selectedSong} 신청합니다."
}

// 투표 SMS 정보
export interface VoteSMSInfo {
  sms_number: string; // 0505
  message: string; // DAY6
  description: string; // "DAY6 투표를 위해 모바일에서 접속해주세요."
  button_text: string; // "DAY6 투표하기 (#0505)"
}

// 빠른 링크 콘텐츠 조회
export async function fetchQuickLinksContent(): Promise<QuickLinksContent[]> {
  try {
    const { data, error } = await supabase
      .from('quick_links_content')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      console.error('빠른 링크 콘텐츠 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('빠른 링크 콘텐츠 조회 중 오류:', error);
    return [];
  }
}

// 라디오 콘텐츠 조회
export async function fetchRadioContent(): Promise<QuickLinksContent | null> {
  try {
    const { data, error } = await supabase
      .from('quick_links_content')
      .select('*')
      .eq('content_type', 'radio')
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('라디오 콘텐츠 조회 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('라디오 콘텐츠 조회 중 오류:', error);
    return null;
  }
}

// 음악 투표 콘텐츠 조회  
export async function fetchMusicVoteContent(): Promise<QuickLinksContent | null> {
  try {
    const { data, error } = await supabase
      .from('quick_links_content')
      .select('*')
      .eq('content_type', 'music_vote')
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('음악 투표 콘텐츠 조회 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('음악 투표 콘텐츠 조회 중 오류:', error);
    return null;
  }
}

// 빠른 링크 콘텐츠 업데이트
export async function updateQuickLinksContent(
  id: number,
  updates: Partial<Omit<QuickLinksContent, 'id' | 'created_at'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('quick_links_content')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('빠른 링크 콘텐츠 업데이트 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('빠른 링크 콘텐츠 업데이트 중 오류:', error);
    return false;
  }
}

// 라디오 콘텐츠 업데이트
export async function updateRadioContent(updates: {
  songs?: string[];
  radio_stations?: RadioStationSMS[];
  title?: string;
  description?: string;
}): Promise<boolean> {
  try {
    // 먼저 기존 라디오 콘텐츠 찾기
    const existing = await fetchRadioContent();
    
    if (existing) {
      // 업데이트
      return await updateQuickLinksContent(existing.id, updates);
    } else {
      // 새로 생성
      const { error } = await supabase
        .from('quick_links_content')
        .insert([{
          content_type: 'radio',
          title: updates.title || '라디오 신청',
          description: updates.description || 'DAY6 라디오 신청하기',
          songs: updates.songs || ['INSIDE OUT', '꿈의 버스'],
          radio_stations: updates.radio_stations || [
            { name: 'KBS', sms_number: '8910', color: 'bg-red-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' },
            { name: 'MBC', sms_number: '8000', color: 'bg-blue-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' },
            { name: 'SBS', sms_number: '1077', color: 'bg-green-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' }
          ],
          is_active: true,
          display_order: 1,
        }]);

      if (error) {
        console.error('라디오 콘텐츠 생성 실패:', error);
        return false;
      }

      return true;
    }
  } catch (error) {
    console.error('라디오 콘텐츠 업데이트 중 오류:', error);
    return false;
  }
}

// 음악 투표 콘텐츠 업데이트
export async function updateMusicVoteContent(updates: {
  vote_sms?: VoteSMSInfo;
  title?: string;
  description?: string;
}): Promise<boolean> {
  try {
    // 먼저 기존 음악 투표 콘텐츠 찾기
    const existing = await fetchMusicVoteContent();
    
    if (existing) {
      // 업데이트
      return await updateQuickLinksContent(existing.id, updates);
    } else {
      // 새로 생성
      const { error } = await supabase
        .from('quick_links_content')
        .insert([{
          content_type: 'music_vote',
          title: updates.title || '음중 문자 투표',
          description: updates.description || '음악중심 투표 참여',
          vote_sms: updates.vote_sms || {
            sms_number: '0505',
            message: 'DAY6',
            description: 'DAY6 투표를 위해 모바일에서 접속해주세요.',
            button_text: 'DAY6 투표하기 (#0505)'
          },
          is_active: true,
          display_order: 2,
        }]);

      if (error) {
        console.error('음악 투표 콘텐츠 생성 실패:', error);
        return false;
      }

      return true;
    }
  } catch (error) {
    console.error('음악 투표 콘텐츠 업데이트 중 오류:', error);
    return false;
  }
}