import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageToStorage } from "@/lib/api/image-resources";

// 단일 공지 데이터 타입
export interface Announcement {
  id: number;
  title: string;
  body: string;
  image_url: string | null;
  image_path: string | null;
  link_url: string | null;
  link_label: string | null;
  is_active: boolean;
  version: number;
  updated_at: string;
}

export const ANNOUNCEMENT_QUERY_KEY = ["announcement"] as const;

// 공지 조회 (단일 행). 없으면 null.
export async function fetchAnnouncement(): Promise<Announcement | null> {
  try {
    const { data, error } = await supabase
      .from("announcement")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("공지 조회 실패:", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("공지 조회 중 오류:", error);
    return null;
  }
}

// 공지 수정. 내용이 바뀌면 version을 증가시켜 '다시 보지 않기'를 무효화한다.
export async function updateAnnouncement(
  id: number,
  updates: Partial<Omit<Announcement, "id" | "version" | "updated_at">>,
  currentVersion: number
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("announcement")
      .update({
        ...updates,
        version: currentVersion + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("공지 수정 실패:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("공지 수정 중 오류:", error);
    return false;
  }
}

// 공지 이미지 업로드. 기존 스토리지 유틸을 재사용한다 (announcement 카테고리).
export async function uploadAnnouncementImage(
  file: File
): Promise<{ url: string; path: string } | null> {
  return uploadImageToStorage(file, "announcement");
}

// --- React Query 훅 ---

export function useAnnouncement() {
  return useQuery({
    queryKey: ANNOUNCEMENT_QUERY_KEY,
    queryFn: fetchAnnouncement,
    staleTime: 60000,
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      id: number;
      updates: Partial<Omit<Announcement, "id" | "version" | "updated_at">>;
      currentVersion: number;
    }) => updateAnnouncement(params.id, params.updates, params.currentVersion),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANNOUNCEMENT_QUERY_KEY });
    },
  });
}
