import { supabase } from '@/lib/supabase/client';

// 타입 정의
export interface ChartDisplayConfig {
  id: string;
  target_artist: string;
  target_song: string | null;
  search_mode: string;
  priority: number;
  is_active: boolean;
  // 예약된 곡명. publish_at 이전에는 노출되지 않고, 발매 시각 이후 target_song 대신 노출된다.
  pending_song: string | null;
  // 예약 발매 시각. 이 시각 이후부터 pending_song이 노출된다. null이면 예약 없음.
  publish_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChartSettings {
  chart_rolling_interval: number;
  chart_auto_rolling: boolean;
  chart_max_display: number;
}

// 예약 발매 시각이 지났는지 판정.
// pending_song/publish_at이 설정돼 있고 현재 시각이 발매 시각 이후이면 true.
export function isPublished(config: ChartDisplayConfig, now: number = Date.now()): boolean {
  if (!config.publish_at || !config.pending_song) return false;
  const publishTime = new Date(config.publish_at).getTime();
  if (isNaN(publishTime)) return false; // 파싱 실패 시 예약 미적용
  return publishTime <= now;
}

// 현재 노출할 곡명을 결정한다 (예약 교체 방식).
//   발매 시각 전  => target_song (이전에 설정됐던 곡을 그대로 유지)
//   발매 시각 이후 => pending_song (예약곡으로 자동 전환)
export function getDisplaySong(
  config: ChartDisplayConfig,
  now: number = Date.now()
): string | null {
  return isPublished(config, now) ? config.pending_song : config.target_song;
}

// 메인 차트 표시 설정 가져오기
export async function fetchChartDisplayConfig(): Promise<ChartDisplayConfig[]> {
  try {
    const { data, error } = await supabase
      .from('chart_display_config')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: true });

    if (error) {
      console.error('Error fetching chart display config:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch chart display config:', error);
    return [];
  }
}

// 관리자용: 비활성화된 설정 포함 전체 조회
export async function fetchAllChartDisplayConfig(): Promise<ChartDisplayConfig[]> {
  try {
    const { data, error } = await supabase
      .from('chart_display_config')
      .select('*')
      .order('priority', { ascending: true });

    if (error) {
      console.error('Error fetching all chart display config:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch all chart display config:', error);
    return [];
  }
}

// 차트 설정 가져오기 (롤링 시간 등)
export async function fetchChartSettings(): Promise<ChartSettings> {
  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('key, value')
      .eq('category', 'chart')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching chart settings:', error);
      // 기본값 반환
      return {
        chart_rolling_interval: 5000,
        chart_auto_rolling: true,
        chart_max_display: 2
      };
    }

    // key-value를 객체로 변환
    const settings: ChartSettings = {
      chart_rolling_interval: 5000,
      chart_auto_rolling: true,
      chart_max_display: 2
    };

    const settingsRecord = settings as unknown as Record<string, unknown>;
    data?.forEach(item => {
      try {
        settingsRecord[item.key] = JSON.parse(item.value);
      } catch (e) {
        // JSON 파싱 실패시 그대로 사용
        settingsRecord[item.key] = item.value;
      }
    });

    return settings;
  } catch (error) {
    console.error('Failed to fetch chart settings:', error);
    // 기본값 반환
    return {
      chart_rolling_interval: 5000,
      chart_auto_rolling: true,
      chart_max_display: 2
    };
  }
}

// 차트 표시 설정 업데이트 (관리자용)
export async function updateChartDisplayConfig(
  id: string, 
  updates: Partial<ChartDisplayConfig>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chart_display_config')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating chart display config:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to update chart display config:', error);
    return false;
  }
}

// 새로운 차트 표시 설정 추가 (관리자용)
export async function addChartDisplayConfig(
  config: Omit<ChartDisplayConfig, 'id' | 'created_at' | 'updated_at'>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chart_display_config')
      .insert(config);

    if (error) {
      console.error('Error adding chart display config:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to add chart display config:', error);
    return false;
  }
}

// 차트 설정 업데이트 (관리자용)
export async function updateChartSetting(
  key: string,
  value: string | number | boolean
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('admin_settings')
      .update({
        value: JSON.stringify(value),
        updated_at: new Date().toISOString()
      })
      .eq('key', key)
      .eq('category', 'chart');

    if (error) {
      console.error('Error updating chart setting:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to update chart setting:', error);
    return false;
  }
}