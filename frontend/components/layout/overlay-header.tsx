"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAdminClick } from "@/lib/hooks/use-admin-click";

interface OverlayHeaderProps {
  onMenuClick?: () => void;
  title?: string;
  variant?: "overlay" | "solid";
}

export function OverlayHeader({
  onMenuClick,
  variant = "overlay",
}: OverlayHeaderProps) {
  const isOverlay = variant === "overlay";
  const { clickCount, handleClick } = useAdminClick();

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

      {/* Title */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/day6 Logo Vector.svg"
          alt="DAY6 Logo"
          width={36}
          height={36}
          className="w-9 h-9"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(60%) sepia(91%) saturate(449%) hue-rotate(118deg) brightness(96%) contrast(91%)",
          }}
        />
        <h1
          className={`font-sans text-lg font-bold tracking-tight leading-none m-0 cursor-pointer select-none transition-all ${
            isOverlay ? "text-white drop-shadow-lg" : "text-[#666]"
          } ${clickCount > 0 ? 'scale-105' : ''}`}
          onClick={handleClick}
          title={clickCount > 0 ? `관리자 모드 활성화 (${clickCount}/6)` : undefined}
        >
          데이식스 음원총공팀
        </h1>
      </Link>

      {/* Balance */}
      <div className="w-9"></div>
    </div>
  );
}
