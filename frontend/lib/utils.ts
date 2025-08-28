import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKSTDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(date);
}

export function getDaysUntil(deadline: Date): number {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getRankChangeIcon(delta: number | undefined): string {
  if (!delta || delta === 0) return "–";
  if (delta > 0) return `↑${delta}`;
  return `↓${Math.abs(delta)}`;
}

export function getRankChangeColor(delta: number | undefined): string {
  if (!delta || delta === 0) return "text-gray-500";
  if (delta > 0) return "text-green-600";
  return "text-red-600";
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    melon: "bg-gradient-to-r from-green-500 to-green-600",
    melon_top100: "bg-gradient-to-r from-green-500 to-green-600",
    melon_hot100: "bg-gradient-to-r from-green-500 to-green-600",
    genie: "bg-gradient-to-r from-sky-400 to-blue-500",
    bugs: "bg-gradient-to-r from-orange-400 to-red-500",
    vibe: "bg-gradient-to-r from-purple-500 to-pink-500",
    flo: "bg-gradient-to-r from-purple-600 to-blue-600",
  };
  return colors[platform.toLowerCase()] || "bg-gradient-to-r from-gray-400 to-gray-600";
}

export function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    genie: "지니 실시간",
    bugs: "벅스 실시간",
    vibe: "바이브 TOP100",
    flo: "플로 실시간",
    melon_top100: "멜론 TOP100",
    melon_hot100: "멜론 HOT100",
  };
  return names[platform.toLowerCase()] || platform;
}
