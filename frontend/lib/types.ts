// ============================================
// Core Types - Single Source of Truth
// ============================================

// Track information (general track data)
export interface Track {
  title: string;
  album: string;
  releaseDate: string;
}

// Chart entry with ranking information
export interface ChartSong {
  rank: number | null; // null일 경우 차트아웃
  title: string;
  artist: string;
  change: number; // 순위 변화 (delta)
  album?: string;
  albumArt?: string;
  service?: string;
  timestamp?: string;
}

// Main chart data structure matching API response
export interface ChartData {
  collectedAtKST: string;
  artist: string;
  tracks: Track[];
  melon_top100: ChartSong[];
  melon_hot100: ChartSong[];
  melon_daily: ChartSong[];
  melon_weekly: ChartSong[];
  melon_monthly: ChartSong[];
  genie: ChartSong[];
  bugs: ChartSong[];
  vibe: ChartSong[];
  flo: ChartSong[];
  last_updated?: string;
  [key: string]: unknown; // Index signature for dynamic platform access
}

// Platform types
export type PlatformType =
  | "melon_top100"
  | "melon_hot100"
  | "melon_daily"
  | "melon_weekly"
  | "melon_monthly"
  | "genie"
  | "bugs"
  | "vibe"
  | "flo";

export type ChartPeriod = "realtime" | "daily" | "weekly" | "hot100";

// ============================================
// Feature-specific Types
// ============================================

// Todo feature
export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  link?: string;
  icon?: string;
  deepLink?: string;
  category?: "streaming" | "voting" | "social" | "mv";
}

// Voting feature
export interface VoteItem {
  id: string;
  title: string;
  category: "award" | "awards" | "music_show" | "music-shows" | "global";
  deadline: Date | string;
  difficulty: "easy" | "medium" | "hard";
  link: string;
  url?: string; // Alias for link
  platform: string;
  requiredPoints?: number;
  description?: string;
  isUrgent?: boolean; // deadline within 24h
}

// Streaming platforms
export interface StreamingPlatform {
  id: string;
  name: string;
  appLink?: string;
  webLink?: string;
  url?: string; // Can be used instead of appLink/webLink
  type?: "app" | "web";
  playlist?: string;
  playlistUrl?: string;
  lastUpdated?: string;
  icon: string;
  color?: string;
}

// MV Statistics
export interface MVStats {
  title: string;
  views: number;
  likes: number;
  viewsDelta24h: number;
  likesDelta24h: number;
  link: string;
  url?: string; // Alias for link
  thumbnail?: string;
  video_id?: string;
  last_updated?: string;
  updatedAt?: string;
}

// ============================================
// API Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  lastUpdated: string;
}

// Summary data for dashboard
export interface SummaryData {
  totalStreams: number;
  dailyGrowth: number;
  chartPositions: {
    [key: string]: number | null;
  };
  youtubeStats: {
    views: number;
    likes: number;
    dailyViews: number;
    dailyLikes: number;
  };
  lastUpdated: string;
  updatedAtKST?: string; // Alias
  alerts?: Alert[];
}

// Alert system
export interface Alert {
  type: "near_entry" | "near_exit" | "vote_deadline" | "mv_milestone";
  title: string;
  rank?: number;
  message?: string;
  urgency: "low" | "medium" | "high";
  deadline?: string;
}

// Platform data (legacy support)
export interface PlatformData {
  top: ChartSong[];
  collectedAtKST: string;
  platform: string;
}

// ============================================
// Utility Types
// ============================================

// For components that need platform info
export interface PlatformInfo {
  id: PlatformType;
  name: string;
  displayName: string;
  logo: string;
  color?: string;
}

// For chart filtering
export interface ChartFilter {
  platforms: PlatformType[];
  period?: ChartPeriod;
  artist?: string;
  showChartOut?: boolean;
}

// Happy chart data
export interface HappyChartData {
  title: string;
  artist: string;
  album: string;
  status: "in_chart" | "chart_out";
  lastUpdated: string;
  platforms: {
    [key in PlatformType]?: {
      rank: number | null;
      change: number;
      status: "in_chart" | "chart_out";
    };
  };
}

// Day6 specific chart data
export interface Day6ChartData {
  artist: string;
  lastUpdated: string;
  platforms: {
    [key in PlatformType]?: {
      name: string;
      songs: ChartSong[];
      count: number;
    };
  };
}

// YouTube stats (frontend format)
export interface YouTubeStats {
  title: string;
  views: number;
  likes: number;
  viewsDelta24h: number;
  likesDelta24h: number;
  video_id: string;
  link: string;
  last_updated: string;
}
