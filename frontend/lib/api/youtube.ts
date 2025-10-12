import { supabase } from "@/lib/supabase/client";

// YouTube 비디오 타입 정의
export interface YouTubeVideo {
  id: number;
  video_id: string;
  title: string;
  artist?: string;
  video_type?: 'mv' | 'teaser' | 'performance' | 'behind';
  is_active: boolean;
  is_featured: boolean;
  is_tracking: boolean;
  display_order: number;
  release_date?: string;
  schedule_start?: string;
  schedule_end?: string;
  created_at?: string;
  updated_at?: string;
}

// YouTube 통계 타입
export interface YouTubeStats {
  id: number;
  video_id: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  collected_at: string;
}

// 현재 표시할 배너 비디오 가져오기
export async function fetchFeaturedVideo(): Promise<YouTubeVideo | null> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // 1. 스케줄된 비디오 찾기
    const { data: scheduled, error: scheduledError } = await supabase
      .from('youtube_videos')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .lte('schedule_start', today)
      .gte('schedule_end', today)
      .order('display_order')
      .limit(1)
      .single();
    
    if (scheduled && !scheduledError) {
      return scheduled;
    }
    
    // 2. 스케줄이 없으면 기본 featured 비디오
    const { data: featured, error: featuredError } = await supabase
      .from('youtube_videos')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order')
      .limit(1)
      .single();
    
    if (featured && !featuredError) {
      return featured;
    }
    
    return null;
  } catch (error) {
    console.error('Featured video 조회 실패:', error);
    return null;
  }
}

// MV 통계용 비디오 목록 가져오기
export async function fetchTrackingVideos(): Promise<YouTubeVideo[]> {
  try {
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .eq('is_active', true)
      .eq('is_tracking', true)
      .order('display_order');
    
    if (error) {
      console.error('Tracking videos 조회 실패:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Tracking videos 조회 중 오류:', error);
    return [];
  }
}

// 비디오 최신 통계 가져오기
export async function fetchVideoStats(videoId: string): Promise<YouTubeStats | null> {
  try {
    const { data, error } = await supabase
      .from('youtube_stats')
      .select('*')
      .eq('video_id', videoId)
      .order('collected_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.error('Video stats 조회 실패:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Video stats 조회 중 오류:', error);
    return null;
  }
}

// 모든 비디오 목록 가져오기 (관리자용)
export async function fetchAllVideos(): Promise<YouTubeVideo[]> {
  try {
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('All videos 조회 실패:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('All videos 조회 중 오류:', error);
    return [];
  }
}

// 비디오 정보 업데이트
export async function updateVideo(
  id: number, 
  updates: Partial<Omit<YouTubeVideo, 'id' | 'created_at'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('youtube_videos')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      console.error('Video 업데이트 실패:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Video 업데이트 중 오류:', error);
    return false;
  }
}

// 새 비디오 추가
export async function addVideo(video: Omit<YouTubeVideo, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('youtube_videos')
      .insert([video]);
    
    if (error) {
      console.error('Video 추가 실패:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Video 추가 중 오류:', error);
    return false;
  }
}

// 비디오 삭제 (soft delete - is_active를 false로)
export async function deleteVideo(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('youtube_videos')
      .update({ is_active: false })
      .eq('id', id);
    
    if (error) {
      console.error('Video 삭제 실패:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Video 삭제 중 오류:', error);
    return false;
  }
}