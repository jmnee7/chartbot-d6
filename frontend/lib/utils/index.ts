import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, differenceInHours } from "date-fns";
import { ko } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKST(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, "MM/dd HH:mm", { locale: ko });
  } catch {
    return "--:--";
  }
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  } catch {
    return "알 수 없음";
  }
}

export function getDeltaColor(delta: number): string {
  if (delta > 0) return "text-green-600";
  if (delta < 0) return "text-red-600";
  return "text-gray-500";
}

export function getDeltaIcon(delta: number): string {
  if (delta > 0) return "↑";
  if (delta < 0) return "↓";
  return "→";
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function calculateDaysUntil(dateString: string): number {
  try {
    const targetDate = new Date(dateString);
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

export function isUrgent(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();
    return Math.abs(differenceInHours(date, now)) <= 24;
  } catch {
    return false;
  }
}

export function getPlatformColor(platform: string): string {
  const colors = {
    melon: "#00d661",
    genie: "#f93e71",
    bugs: "#ff6600",
    vibe: "#7b68ee",
    flo: "#ff1744",
  };
  return colors[platform as keyof typeof colors] || "#6b7280";
}

export function getPlatformName(platform: string): string {
  const names = {
    melon: "멜론",
    genie: "지니",
    bugs: "벅스",
    vibe: "바이브",
    flo: "플로",
  };
  return names[platform as keyof typeof names] || platform;
}

export function getRankChangeIcon(delta: number): string {
  if (delta > 0) return "↑";
  if (delta < 0) return "↓";
  return "→";
}

export function getRankChangeColor(delta: number): string {
  if (delta > 0) return "text-green-600";
  if (delta < 0) return "text-red-600";
  return "text-gray-500";
}

export function formatKSTDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd HH:mm", { locale: ko });
  } catch {
    return "--";
  }
}

export function getRankingBadgeStyle(rank: number): string {
  if (rank <= 3) return "bg-yellow-100 text-yellow-800 border-yellow-300";
  if (rank <= 10) return "bg-blue-100 text-blue-800 border-blue-300";
  if (rank <= 50) return "bg-green-100 text-green-800 border-green-300";
  if (rank <= 100) return "bg-orange-100 text-orange-800 border-orange-300";
  return "bg-gray-100 text-gray-800 border-gray-300";
}

export function getLastUpdateTime(): string {
  const now = new Date();
  const lastHour = new Date(now);
  lastHour.setMinutes(0, 0, 0);
  return lastHour.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
