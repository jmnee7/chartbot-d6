"use client";

import { Menu, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminClick } from "@/lib/hooks/use-admin-click";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { clickCount, handleClick } = useAdminClick();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      {/* Left side - Menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="p-2 h-8 w-8"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Center - Title (6클릭으로 관리자 모드) */}
      <div className="flex items-center gap-2">
        <Music className="h-5 w-5 text-blue-600" />
        <h1 
          className={`text-lg font-bold text-gray-900 cursor-pointer select-none transition-all ${
            clickCount > 0 ? 'scale-105 text-blue-600' : ''
          }`}
          onClick={(e) => handleClick(e, false)} // 모바일에서는 홈 이동 없음
          title={clickCount > 0 ? `관리자 모드 활성화 (${clickCount}/6)` : undefined}
        >
          DAY6 STRM
        </h1>
      </div>

      {/* Right side - Balance for layout */}
      <div className="w-8" />
    </header>
  );
}
