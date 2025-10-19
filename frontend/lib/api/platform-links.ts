import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

// 플랫폼 링크 타입 정의 (실제 테이블 구조에 맞춤)
export interface PlatformLink {
  id: string; // uuid
  platform: string;
  platform_id: string;
  song_title: string;
  device_type: string;
  urls: Record<string, string>; // jsonb
  is_active: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  updated_by: string;
  link_index?: number;
}

// 플랫폼별 링크 그룹 타입 (실제 구조에 맞춤)
export interface PlatformLinksGroup {
  platform_id: string;
  android: string[];
  iphone: string[];
  pc: string[];
}

// 플랫폼 링크 목록 조회
export async function fetchPlatformLinks(
  platformId?: string
): Promise<PlatformLinksGroup[]> {
  try {
    let query = supabase
      .from("platform_links")
      .select("*")
      .order("platform_id")
      .order("device_type")
      .order("link_index");

    // 무조건 모든 링크 조회 (is_active 상관없이)
    // if (!includeInactive) {
    //   query = query.eq('is_active', true);
    // }

    if (platformId) {
      query = query.eq("platform_id", platformId);
    }

    const { data, error } = await query;

    console.log("플랫폼 링크 조회 데이터:", data);
    if (error) {
      console.error("플랫폼 링크 조회 실패:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("플랫폼 링크 데이터가 없습니다.");
      return [];
    }

    // 플랫폼별로 그룹화하고 URL 추출
    const grouped = data.reduce((acc, link) => {
      const existing = acc.find(
        (group) => group.platform_id === link.platform_id
      );

      // URL 추출 (실제 DB 구조에 맞춤)
      const extractedUrl = link.urls?.redirect || link.url || "";
      const linkWithUrl = { ...link, url: extractedUrl };

      if (existing) {
        // 안전하게 배열에 추가
        if (link.device_type === "android") {
          existing.android.push(linkWithUrl);
        } else if (link.device_type === "iphone") {
          existing.iphone.push(linkWithUrl);
        } else if (link.device_type === "pc") {
          existing.pc.push(linkWithUrl);
        }
      } else {
        acc.push({
          platform_id: link.platform_id,
          android: link.device_type === "android" ? [linkWithUrl] : [],
          iphone: link.device_type === "iphone" ? [linkWithUrl] : [],
          pc: link.device_type === "pc" ? [linkWithUrl] : [],
        });
      }

      return acc;
    }, [] as PlatformLinksGroup[]);

    // 각 디바이스 타입별로 link_index 순서로 정렬
    grouped.forEach((group) => {
      group.android.sort((a, b) => a.link_index - b.link_index);
      group.iphone.sort((a, b) => a.link_index - b.link_index);
      group.pc.sort((a, b) => a.link_index - b.link_index);
    });

    return grouped;
  } catch (error) {
    console.error("플랫폼 링크 조회 중 오류:", error);
    return [];
  }
}

// 특정 플랫폼의 링크 조회
export async function fetchPlatformLinksById(
  platformId: string,
  includeInactive?: boolean
): Promise<PlatformLinksGroup | null> {
  const groups = await fetchPlatformLinks(platformId, includeInactive);
  return groups.length > 0 ? groups[0] : null;
}

// 플랫폼 링크 업데이트 (전체 교체)
export async function updatePlatformLinks(
  platformId: string,
  links: {
    android: string[];
    iphone: string[];
    pc: string[];
  }
): Promise<boolean> {
  try {
    // 트랜잭션 시뮬레이션: 기존 링크 삭제 후 새로 추가

    // 1. 기존 링크 비활성화
    const { error: deactivateError } = await supabase
      .from("platform_links")
      .update({ is_active: false })
      .eq("platform_id", platformId);

    if (deactivateError) {
      console.error("기존 링크 비활성화 실패:", deactivateError);
      return false;
    }

    // 2. 새 링크들 추가
    const newLinks: any[] = [];

    // Android 링크 추가
    links.android.forEach((url, index) => {
      if (url.trim()) {
        newLinks.push({
          platform_id: platformId,
          device_type: "android",
          link_index: index,
          urls: {
            redirect: url.startsWith("http")
              ? url
              : `https://tinyurl.com/${url}`,
          },
          is_active: true,
        });
      }
    });

    // iPhone 링크 추가
    links.iphone.forEach((url, index) => {
      if (url.trim()) {
        newLinks.push({
          platform_id: platformId,
          device_type: "iphone",
          link_index: index,
          urls: {
            redirect: url.startsWith("http")
              ? url
              : `https://tinyurl.com/${url}`,
          },
          is_active: true,
        });
      }
    });

    // PC 링크 추가
    links.pc.forEach((url, index) => {
      if (url.trim()) {
        newLinks.push({
          platform_id: platformId,
          device_type: "pc",
          link_index: index,
          urls: {
            redirect: url.startsWith("http")
              ? url
              : `https://tinyurl.com/${url}`,
          },
          is_active: true,
        });
      }
    });

    if (newLinks.length > 0) {
      const { error: insertError } = await supabase
        .from("platform_links")
        .insert(newLinks);

      if (insertError) {
        console.error("새 링크 추가 실패:", insertError);
        return false;
      }
    }

    console.log(`${platformId} 플랫폼 링크 업데이트 완료`);
    return true;
  } catch (error) {
    console.error("플랫폼 링크 업데이트 중 오류:", error);
    return false;
  }
}

// 플랫폼 기본 URL 업데이트 (별도 테이블이 있다면)
export async function updatePlatformBaseUrl(
  platformId: string,
  baseUrl: string
): Promise<boolean> {
  try {
    // 현재는 platform_links 테이블에만 저장
    // 나중에 platforms 테이블이 생기면 그쪽에 저장

    // 임시로 특별한 link_index (-1)로 기본 URL 저장
    const { error } = await supabase.from("platform_links").upsert({
      platform_id: platformId,
      device_type: "pc",
      link_index: -1,
      urls: {
        redirect: baseUrl,
      },
      is_active: true,
    });

    if (error) {
      console.error("기본 URL 업데이트 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("기본 URL 업데이트 중 오류:", error);
    return false;
  }
}

// React Query hook for platform links
export function usePlatformLinks() {
  return useQuery({
    queryKey: ["platformLinks"],
    queryFn: () => fetchPlatformLinks(),
    staleTime: 60000, // 1분간 캐시
  });
}

// 테이블 존재 확인 및 초기 데이터 생성
export async function initializePlatformLinks(): Promise<boolean> {
  try {
    // 테이블 존재 확인
    const { data, error } = await supabase
      .from("platform_links")
      .select("id")
      .limit(1);

    if (error) {
      console.error(
        "platform_links 테이블이 존재하지 않습니다:",
        error.message
      );
      return false;
    }

    console.log("platform_links 테이블이 존재합니다.");
    return true;
  } catch (error) {
    console.error("플랫폼 링크 초기화 중 오류:", error);
    return false;
  }
}
