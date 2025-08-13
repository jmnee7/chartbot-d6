// Core data types based on the planning document

export interface Track {
  title: string;
  rank: number;
  delta: number;
  url: string;
  image: string;
  artist?: string;
  album?: string;
}

export interface PlatformData {
  top: Track[];
  collectedAtKST: string;
  platform: string;
}

export interface ChartData {
  collectedAtKST: string;
  artist: string;
  tracks: Track[];
  platform: string;
}

export interface SummaryData {
  updatedAtKST: string;
  platforms: {
    melon: PlatformData;
    genie: PlatformData;
    bugs: PlatformData;
    vibe: PlatformData;
    flo: PlatformData;
  };
  alerts: Alert[];
}

export interface Alert {
  type: "near_entry" | "near_exit" | "vote_deadline" | "mv_milestone";
  title: string;
  rank?: number;
  message?: string;
  urgency: "low" | "medium" | "high";
  deadline?: string;
}

export interface MVData {
  title: string;
  views: number;
  likes: number;
  viewsDelta24h: number;
  likesDelta24h: number;
  url: string;
  thumbnail: string;
  updatedAt: string;
}

export interface VoteItem {
  id: string;
  title: string;
  category: "awards" | "music-shows" | "global";
  deadline: string;
  difficulty: "easy" | "medium" | "hard";
  requiredPoints?: number;
  url: string;
  description?: string;
  isUrgent: boolean; // deadline within 24h
}

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  deepLink?: string;
  category: "streaming" | "voting" | "social" | "mv";
}

export interface StreamingPlatform {
  id: string;
  name: string;
  type: "app" | "web";
  url: string;
  playlistUrl?: string;
  icon: string;
  color: string;
}

export type Platform = "melon" | "genie" | "bugs" | "vibe" | "flo";
export type Period = "realtime" | "daily" | "weekly";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  lastUpdated: string;
}
