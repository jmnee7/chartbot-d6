"use client";

import { Menu, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
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

      {/* Center - Title */}
      <div className="flex items-center gap-2">
        <Music className="h-5 w-5 text-blue-600" />
        <h1 className="text-lg font-bold text-gray-900">DAY6 STRM</h1>
      </div>

      {/* Right side - Balance for layout */}
      <div className="w-8" />
    </header>
  );
}
