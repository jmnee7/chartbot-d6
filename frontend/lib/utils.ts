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
    melon: "bg-green-500",
    genie: "bg-blue-500",
    bugs: "bg-orange-500",
    vibe: "bg-purple-500",
    flo: "bg-pink-500",
  };
  return colors[platform.toLowerCase()] || "bg-gray-500";
}

export function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    melon: "멜론",
    genie: "지니",
    bugs: "벅스",
    vibe: "바이브",
    flo: "플로",
    melon_top100: "멜론 TOP100",
    melon_hot100: "멜론 HOT100",
  };
  return names[platform.toLowerCase()] || platform;
}
