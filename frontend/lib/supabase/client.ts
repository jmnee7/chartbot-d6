import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// 일반 클라이언트 (브라우저용)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 관리자용 서버 클라이언트 (서버 사이드에서만 사용)
// service_role key가 필요한 경우에만 사용
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for admin operations"
    );
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// DB 타입 정의 (나중에 Supabase CLI로 자동 생성 가능)
export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string;
          key: string;
          value: unknown;
          description: string | null;
          category: string | null;
          updated_at: string;
          updated_by: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          key: string;
          value: unknown;
          description?: string | null;
          category?: string | null;
          updated_at?: string;
          updated_by?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          key?: string;
          value?: unknown;
          description?: string | null;
          category?: string | null;
          updated_at?: string;
          updated_by?: string | null;
          is_active?: boolean;
        };
      };
      platform_links: {
        Row: {
          id: number;
          platform_id: string;
          device_type: string;
          link_index: number;
          url: string;
          label: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          platform_id: string;
          device_type: string;
          link_index: number;
          url: string;
          label?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          platform_id?: string;
          device_type?: string;
          link_index?: number;
          url?: string;
          label?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      radio_stations: {
        Row: {
          id: number;
          name: string;
          url: string;
          logo: string | null;
          description: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          url: string;
          logo?: string | null;
          description?: string | null;
          is_active?: boolean;
          display_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          url?: string;
          logo?: string | null;
          description?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      music_shows: {
        Row: {
          id: number;
          show_id: string;
          name: string;
          channel: string;
          schedule: string;
          voting_method: string;
          voting_app: string;
          app_download_android: string | null;
          app_download_ios: string | null;
          app_download_web: string | null;
          program_url: string | null;
          icon: string;
          color: string;
          description: string;
          voting_period: string | null;
          voting_windows: string[] | null;
          notes: string | null;
          has_voting: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          show_id: string;
          name: string;
          channel: string;
          schedule: string;
          voting_method: string;
          voting_app: string;
          app_download_android?: string | null;
          app_download_ios?: string | null;
          app_download_web?: string | null;
          program_url?: string | null;
          icon: string;
          color: string;
          description: string;
          voting_period?: string | null;
          voting_windows?: string[] | null;
          notes?: string | null;
          has_voting: boolean;
          is_active?: boolean;
          display_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          show_id?: string;
          name?: string;
          channel?: string;
          schedule?: string;
          voting_method?: string;
          voting_app?: string;
          app_download_android?: string | null;
          app_download_ios?: string | null;
          app_download_web?: string | null;
          program_url?: string | null;
          icon?: string;
          color?: string;
          description?: string;
          voting_period?: string | null;
          voting_windows?: string[] | null;
          notes?: string | null;
          has_voting?: boolean;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      quick_links_content: {
        Row: {
          id: number;
          content_type: string;
          title: string;
          description: string;
          songs: string[] | null;
          radio_stations: unknown | null;
          vote_sms: unknown | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          content_type: string;
          title: string;
          description: string;
          songs?: string[] | null;
          radio_stations?: unknown | null;
          vote_sms?: unknown | null;
          is_active?: boolean;
          display_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          content_type?: string;
          title?: string;
          description?: string;
          songs?: string[] | null;
          radio_stations?: unknown | null;
          vote_sms?: unknown | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      crawler_logs: {
        Row: {
          id: string;
          platform: string;
          status: string;
          execution_time: number | null;
          songs_found: number | null;
          error_message: string | null;
          error_type: string | null;
          github_run_id: string | null;
          created_at: string;
          metadata: unknown | null;
        };
        Insert: {
          id?: string;
          platform: string;
          status: string;
          execution_time?: number | null;
          songs_found?: number | null;
          error_message?: string | null;
          error_type?: string | null;
          github_run_id?: string | null;
          created_at?: string;
          metadata?: unknown | null;
        };
        Update: {
          id?: string;
          platform?: string;
          status?: string;
          execution_time?: number | null;
          songs_found?: number | null;
          error_message?: string | null;
          error_type?: string | null;
          github_run_id?: string | null;
          created_at?: string;
          metadata?: unknown | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
