import { supabase } from "@/lib/supabase/client";

// 플랫폼 링크 타입 정의
export interface PlatformLink {
  id: number;
  platform_id: string;
  device_type: 'android' | 'iphone' | 'pc';
  link_index: number;
  url: string;
  label?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// 플랫폼별 링크 그룹 타입
export interface PlatformLinksGroup {
  platform_id: string;
  android: PlatformLink[];
  iphone: PlatformLink[];
  pc: PlatformLink[];
  base_url?: string;
}

// 플랫폼 링크 목록 조회
export async function fetchPlatformLinks(platformId?: string): Promise<PlatformLinksGroup[]> {
  try {
    let query = supabase
      .from('platform_links')
      .select('*')
      .eq('is_active', true)
      .order('platform_id')
      .order('device_type')
      .order('link_index');

    if (platformId) {
      query = query.eq('platform_id', platformId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('플랫폼 링크 조회 실패:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log('플랫폼 링크 데이터가 없습니다.');
      return [];
    }

    // 플랫폼별로 그룹화
    const grouped = data.reduce((acc, link) => {
      const existing = acc.find(group => group.platform_id === link.platform_id);
      
      if (existing) {
        existing[link.device_type as keyof typeof existing].push(link);
      } else {
        acc.push({
          platform_id: link.platform_id,
          android: link.device_type === 'android' ? [link] : [],
          iphone: link.device_type === 'iphone' ? [link] : [],
          pc: link.device_type === 'pc' ? [link] : [],
        });
      }
      
      return acc;
    }, [] as PlatformLinksGroup[]);

    // 각 디바이스 타입별로 link_index 순서로 정렬
    grouped.forEach(group => {
      group.android.sort((a, b) => a.link_index - b.link_index);
      group.iphone.sort((a, b) => a.link_index - b.link_index);
      group.pc.sort((a, b) => a.link_index - b.link_index);
    });

    return grouped;

  } catch (error) {
    console.error('플랫폼 링크 조회 중 오류:', error);
    return [];
  }
}

// 특정 플랫폼의 링크 조회
export async function fetchPlatformLinksById(platformId: string): Promise<PlatformLinksGroup | null> {
  const groups = await fetchPlatformLinks(platformId);
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
      .from('platform_links')
      .update({ is_active: false })
      .eq('platform_id', platformId);

    if (deactivateError) {
      console.error('기존 링크 비활성화 실패:', deactivateError);
      return false;
    }

    // 2. 새 링크들 추가
    const newLinks: Omit<PlatformLink, 'id' | 'created_at' | 'updated_at'>[] = [];

    // Android 링크 추가
    links.android.forEach((url, index) => {
      if (url.trim()) {
        newLinks.push({
          platform_id: platformId,
          device_type: 'android',
          link_index: index,
          url: url.startsWith('http') ? url : `https://tinyurl.com/${url}`,
          label: `링크 ${index + 1}`,
          is_active: true,
        });
      }
    });

    // iPhone 링크 추가
    links.iphone.forEach((url, index) => {
      if (url.trim()) {
        newLinks.push({
          platform_id: platformId,
          device_type: 'iphone',
          link_index: index,
          url: url.startsWith('http') ? url : `https://tinyurl.com/${url}`,
          label: `링크 ${index + 1}`,
          is_active: true,
        });
      }
    });

    // PC 링크 추가
    links.pc.forEach((url, index) => {
      if (url.trim()) {
        newLinks.push({
          platform_id: platformId,
          device_type: 'pc',
          link_index: index,
          url: url.startsWith('http') ? url : `https://tinyurl.com/${url}`,
          label: `링크 ${index + 1}`,
          is_active: true,
        });
      }
    });

    if (newLinks.length > 0) {
      const { error: insertError } = await supabase
        .from('platform_links')
        .insert(newLinks);

      if (insertError) {
        console.error('새 링크 추가 실패:', insertError);
        return false;
      }
    }

    console.log(`${platformId} 플랫폼 링크 업데이트 완료`);
    return true;

  } catch (error) {
    console.error('플랫폼 링크 업데이트 중 오류:', error);
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
    const { error } = await supabase
      .from('platform_links')
      .upsert({
        platform_id: platformId,
        device_type: 'pc',
        link_index: -1,
        url: baseUrl,
        label: 'base_url',
        is_active: true,
      });

    if (error) {
      console.error('기본 URL 업데이트 실패:', error);
      return false;
    }

    return true;

  } catch (error) {
    console.error('기본 URL 업데이트 중 오류:', error);
    return false;
  }
}

// 테이블 존재 확인 및 초기 데이터 생성
export async function initializePlatformLinks(): Promise<boolean> {
  try {
    // 테이블 존재 확인
    const { data, error } = await supabase
      .from('platform_links')
      .select('id')
      .limit(1);

    if (error) {
      console.error('platform_links 테이블이 존재하지 않습니다:', error.message);
      return false;
    }

    console.log('platform_links 테이블이 존재합니다.');
    return true;

  } catch (error) {
    console.error('플랫폼 링크 초기화 중 오류:', error);
    return false;
  }
}