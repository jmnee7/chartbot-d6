import { supabase } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 이미지 리소스 타입
export interface ImageResource {
  id: string;
  title: string;
  description?: string;
  category: "streaming_guide" | "banner" | "voting_guide";
  file_url: string;
  file_size?: number;
  mime_type?: string;
  display_order: number;
  is_active: boolean;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  updated_by: string;
}

// 카테고리별 이미지 조회
export async function fetchImagesByCategory(
  category: ImageResource["category"]
): Promise<ImageResource[]> {
  try {
    const { data, error } = await supabase
      .from("image_resources")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("이미지 조회 실패:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("이미지 조회 중 오류:", error);
    return [];
  }
}

// 모든 이미지 조회 (관리자용)
export async function fetchAllImages(): Promise<ImageResource[]> {
  try {
    const { data, error } = await supabase
      .from("image_resources")
      .select("*")
      .order("category")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("이미지 전체 조회 실패:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("이미지 전체 조회 중 오류:", error);
    return [];
  }
}

// 이미지 파일 업로드 (Storage)
export async function uploadImageToStorage(
  file: File,
  category: string
): Promise<{ url: string; path: string } | null> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${category}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("streaming-guides")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Storage 업로드 실패:", error);
      return null;
    }

    // Public URL 생성
    const {
      data: { publicUrl },
    } = supabase.storage.from("streaming-guides").getPublicUrl(data.path);

    return { url: publicUrl, path: data.path };
  } catch (error) {
    console.error("Storage 업로드 중 오류:", error);
    return null;
  }
}

// 이미지 파일 삭제 (Storage)
export async function deleteImageFromStorage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from("streaming-guides")
      .remove([path]);

    if (error) {
      console.error("Storage 삭제 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Storage 삭제 중 오류:", error);
    return false;
  }
}

// 이미지 리소스 추가 (DB)
export async function addImageResource(
  resource: Omit<ImageResource, "id" | "created_at" | "updated_at">
): Promise<ImageResource | null> {
  try {
    const { data, error } = await supabase
      .from("image_resources")
      .insert([resource])
      .select()
      .single();

    if (error) {
      console.error("이미지 리소스 추가 실패:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("이미지 리소스 추가 중 오류:", error);
    return null;
  }
}

// 이미지 리소스 수정 (DB)
export async function updateImageResource(
  id: string,
  updates: Partial<Omit<ImageResource, "id" | "created_at">>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("image_resources")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("이미지 리소스 수정 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("이미지 리소스 수정 중 오류:", error);
    return false;
  }
}

// 이미지 리소스 삭제 (DB + Storage)
export async function deleteImageResource(
  id: string,
  storagePath?: string
): Promise<boolean> {
  try {
    // Storage에서 파일 삭제
    if (storagePath) {
      await deleteImageFromStorage(storagePath);
    }

    // DB에서 삭제 (soft delete)
    const { error } = await supabase
      .from("image_resources")
      .update({ is_active: false })
      .eq("id", id);

    if (error) {
      console.error("이미지 리소스 삭제 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("이미지 리소스 삭제 중 오류:", error);
    return false;
  }
}

// React Query Hooks
export function useImagesByCategory(category: ImageResource["category"]) {
  return useQuery({
    queryKey: ["images", category],
    queryFn: () => fetchImagesByCategory(category),
    staleTime: 60000, // 1분 캐시
  });
}

export function useAllImages() {
  return useQuery({
    queryKey: ["images", "all"],
    queryFn: fetchAllImages,
    staleTime: 60000,
  });
}

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      category,
      title,
      description,
    }: {
      file: File;
      category: ImageResource["category"];
      title: string;
      description?: string;
    }) => {
      // 1. Storage에 업로드
      const uploadResult = await uploadImageToStorage(file, category);
      if (!uploadResult) {
        throw new Error("파일 업로드 실패");
      }

      // 2. DB에 레코드 추가
      const resource = await addImageResource({
        title,
        description,
        category,
        file_url: uploadResult.url,
        file_size: file.size,
        mime_type: file.type,
        display_order: 0,
        is_active: true,
        tags: [uploadResult.path], // storage path 저장 (삭제용)
        updated_by: "admin",
      });

      if (!resource) {
        // 업로드된 파일 롤백
        await deleteImageFromStorage(uploadResult.path);
        throw new Error("DB 저장 실패");
      }

      return resource;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      storagePath,
    }: {
      id: string;
      storagePath?: string;
    }) => {
      return deleteImageResource(id, storagePath);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
