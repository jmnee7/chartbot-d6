import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface ChartDisplayConfig {
  id: string;
  target_artist: string;
  target_song: string | null;
  search_mode: string;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChartSettings {
  chart_rolling_interval: number;
  chart_auto_rolling: boolean;
  chart_max_display: number;
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

    data?.forEach(item => {
      try {
        const value = JSON.parse(item.value);
        settings[item.key as keyof ChartSettings] = value;
      } catch (e) {
        // JSON 파싱 실패시 그대로 사용
        settings[item.key as keyof ChartSettings] = item.value;
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