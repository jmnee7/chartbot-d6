import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

// 사이트 설정 타입 정의
export interface SiteSettings {
  id: number;
  key: string;
  value: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// 기본 설정값 (DB 연결 실패 시 폴백)
const DEFAULT_SETTINGS: Record<string, string> = {
  streaming_disabled: "true", // 발매 전 스트리밍 링크 비활성화
  streaming_disabled_message: "새 링크 준비 중입니다",
  current_song_title: "Lovin' the Christmas",
  radio_song_title: "Lovin' the Christmas",
};

// 모든 설정 조회
export async function fetchSiteSettings(): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      console.error("사이트 설정 조회 실패:", error);
      return DEFAULT_SETTINGS;
    }

    if (!data || data.length === 0) {
      console.log("사이트 설정이 없습니다. 기본값 사용");
      return DEFAULT_SETTINGS;
    }

    // key-value 형태로 변환
    const settings: Record<string, string> = {};
    data.forEach((item: SiteSettings) => {
      settings[item.key] = item.value;
    });

    // 기본값과 병합 (DB에 없는 키는 기본값 사용)
    return { ...DEFAULT_SETTINGS, ...settings };
  } catch (error) {
    console.error("사이트 설정 조회 중 오류:", error);
    return DEFAULT_SETTINGS;
  }
}

// 특정 설정 조회
export async function fetchSiteSetting(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      console.log(`설정 '${key}' 조회 실패, 기본값 사용:`, DEFAULT_SETTINGS[key]);
      return DEFAULT_SETTINGS[key] || null;
    }

    return data?.value || DEFAULT_SETTINGS[key] || null;
  } catch (error) {
    console.error(`설정 '${key}' 조회 중 오류:`, error);
    return DEFAULT_SETTINGS[key] || null;
  }
}

// 설정 업데이트 (upsert)
export async function updateSiteSetting(
  key: string,
  value: string,
  description?: string
): Promise<boolean> {
  try {
    const { error } = await supabase.from("site_settings").upsert(
      {
        key,
        value,
        description,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );

    if (error) {
      console.error("설정 업데이트 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("설정 업데이트 중 오류:", error);
    return false;
  }
}

// React Query hook for site settings
export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
    staleTime: 30000, // 30초간 캐시
    refetchOnWindowFocus: true,
  });
}

// 스트리밍 비활성화 상태 확인 hook
export function useStreamingDisabled() {
  const { data: settings, isLoading } = useSiteSettings();

  return {
    isDisabled: settings?.streaming_disabled === "true",
    message: settings?.streaming_disabled_message || "새 링크 준비 중입니다",
    isLoading,
  };
}
