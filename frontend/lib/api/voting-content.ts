import { supabase } from "@/lib/supabase/client";

// 라디오 방송국 타입
export interface RadioStation {
  id: number;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// 음악 방송 타입  
export interface MusicShow {
  id: number;
  show_id: string; // unique identifier like "the-show"
  name: string;
  channel: string;
  schedule: string;
  voting_method: string;
  voting_app: string;
  app_download_android?: string;
  app_download_ios?: string; 
  app_download_web?: string;
  program_url?: string;
  icon: string;
  color: string;
  description: string;
  voting_period?: string;
  voting_windows?: string[]; // JSON array
  notes?: string;
  has_voting: boolean;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// 라디오 방송국 목록 조회
export async function fetchRadioStations(): Promise<RadioStation[]> {
  try {
    const { data, error } = await supabase
      .from('radio_stations')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      console.error('라디오 방송국 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('라디오 방송국 조회 중 오류:', error);
    return [];
  }
}

// 음악 방송 목록 조회
export async function fetchMusicShows(): Promise<MusicShow[]> {
  try {
    const { data, error } = await supabase
      .from('music_shows')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      console.error('음악 방송 조회 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('음악 방송 조회 중 오류:', error);
    return [];
  }
}

// 라디오 방송국 업데이트
export async function updateRadioStation(
  id: number,
  updates: Partial<Omit<RadioStation, 'id' | 'created_at'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('radio_stations')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('라디오 방송국 업데이트 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('라디오 방송국 업데이트 중 오류:', error);
    return false;
  }
}

// 음악 방송 업데이트
export async function updateMusicShow(
  id: number,
  updates: Partial<Omit<MusicShow, 'id' | 'created_at'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('music_shows')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('음악 방송 업데이트 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('음악 방송 업데이트 중 오류:', error);
    return false;
  }
}

// 라디오 방송국 추가
export async function addRadioStation(
  station: Omit<RadioStation, 'id' | 'created_at' | 'updated_at'>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('radio_stations')
      .insert([station]);

    if (error) {
      console.error('라디오 방송국 추가 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('라디오 방송국 추가 중 오류:', error);
    return false;
  }
}

// 음악 방송 추가
export async function addMusicShow(
  show: Omit<MusicShow, 'id' | 'created_at' | 'updated_at'>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('music_shows')
      .insert([show]);

    if (error) {
      console.error('음악 방송 추가 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('음악 방송 추가 중 오류:', error);
    return false;
  }
}

// 라디오 방송국 삭제 (소프트 삭제)
export async function deleteRadioStation(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('radio_stations')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('라디오 방송국 삭제 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('라디오 방송국 삭제 중 오류:', error);
    return false;
  }
}

// 음악 방송 삭제 (소프트 삭제)
export async function deleteMusicShow(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('music_shows')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('음악 방송 삭제 실패:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('음악 방송 삭제 중 오류:', error);
    return false;
  }
}