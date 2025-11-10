import { supabase } from "@/lib/supabase/client";

// Comeback Schedule 타입 정의
export interface ComebackSchedule {
  id: number;
  date: string; // "2025.09.14" 형식
  event: string;
  status: "upcoming" | "ongoing" | "completed";
  description?: string;
  datetime: string; // "2025-09-14" 형식 (ISO date)
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// 컴백 스케줄 목록 가져오기
export async function fetchComebackSchedules(): Promise<ComebackSchedule[]> {
  try {
    const { data, error } = await supabase
      .from("comeback_schedule")
      .select("*")
      .eq("is_active", true)
      .order("datetime", { ascending: true });

    if (error) {
      console.error("Comeback schedules 조회 실패:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Comeback schedules 조회 중 오류:", error);
    return [];
  }
}

// 컴백 스케줄 추가
export async function addComebackSchedule(
  schedule: Omit<ComebackSchedule, "id" | "created_at" | "updated_at">
): Promise<boolean> {
  try {
    const { error } = await supabase.from("comeback_schedule").insert([
      {
        ...schedule,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Comeback schedule 추가 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Comeback schedule 추가 중 오류:", error);
    return false;
  }
}

// 컴백 스케줄 업데이트
export async function updateComebackSchedule(
  id: number,
  updates: Partial<Omit<ComebackSchedule, "id" | "created_at">>
): Promise<boolean> {
  try {
    console.log("업데이트 시도 중:", { id, updates });

    // 먼저 해당 ID의 데이터가 존재하는지 확인
    const { data: existingData } = await supabase
      .from("comeback_schedule")
      .select("*")
      .eq("id", id);

    const { data, error } = await supabase
      .from("comeback_schedule")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(); // 업데이트된 데이터 반환

    if (error) {
      console.error("Comeback schedule 업데이트 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Comeback schedule 업데이트 중 오류:", error);
    return false;
  }
}

// 컴백 스케줄 삭제 (soft delete)
export async function deleteComebackSchedule(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("comeback_schedule")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Comeback schedule 삭제 실패:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Comeback schedule 삭제 중 오류:", error);
    return false;
  }
}

// D-Day 계산 유틸리티
export function calculateDDay(datetime: string): number {
  const targetDate = new Date(datetime);
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 날짜 형식 변환 유틸리티
export function formatDateDisplay(datetime: string): string {
  return datetime.replace(/-/g, ".");
}

export function formatDateInput(displayDate: string): string {
  return displayDate.replace(/\./g, "-");
}
