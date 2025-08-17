"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

interface OverlayHeaderProps {
  onMenuClick?: () => void;
  title?: string;
  variant?: "overlay" | "solid";
}

export function OverlayHeader({
  onMenuClick,
  title = "데이식스 음원총공팀",
  variant = "overlay",
}: OverlayHeaderProps) {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 h-14 ${
        isOverlay ? "bg-black/20 backdrop-blur-sm" : "bg-white shadow-sm"
      }`}
    >
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className={`p-2 rounded-lg transition-colors ${
          isOverlay
            ? "bg-black/20 backdrop-blur-sm hover:bg-black/30"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <Menu
          className={`w-5 h-5 ${isOverlay ? "text-white" : "text-gray-700"}`}
        />
      </button>

      {/* Title with DAY6 STRM branding */}
      <Link href="/" className="flex items-center gap-2">
        <h1
          className={`font-montserrat text-lg font-bold tracking-tight leading-none m-0 ${
            isOverlay ? "text-white drop-shadow-lg" : "text-gray-900"
          }`}
        >
          DAY<span className="text-[#49c4b0]">6</span> STRM
        </h1>
        <span
          className={`text-xs leading-none ${
            isOverlay ? "text-white/90" : "text-gray-500"
          }`}
        >
          데이식스 음원총공팀
        </span>
      </Link>

      {/* Balance */}
      <div className="w-9"></div>
    </div>
  );
}
