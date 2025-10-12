"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "./mobile-app-layout";
import Link from "next/link";
import Image from "next/image";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { useState, useRef } from "react";

export function DesktopHeader() {
  const { openSidebar } = useSidebar();
  const { setIsAuthModalOpen } = useAdminMode();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 로고 클릭 핸들러 (6번 연속 클릭 감지)
  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    
    // 기존 타이머 초기화
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newCount === 6) {
      // 6번 클릭 완료 - 인증 모달 열기
      e.preventDefault(); // 홈 이동 방지
      setIsAuthModalOpen(true);
      setClickCount(0);
    } else if (newCount === 1) {
      // 첫 번째 클릭 - 홈으로 이동 (기본 Link 동작)
      setClickCount(1);
      // 3초 후 카운트 리셋
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);
    } else {
      // 2~5번째 클릭 - 홈 이동 방지하고 카운트만 증가
      e.preventDefault();
      setClickCount(newCount);
      // 3초 후 카운트 리셋
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-8 xl:px-12 h-16 bg-white border-b border-gray-100">
      {/* Left - Menu button and Title */}
      <div className="flex items-center gap-4">
        {/* Menu Button */}
        <button
          onClick={openSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1">
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
              className={`font-sans text-2xl lg:text-2xl xl:text-3xl font-bold text-[#666] tracking-tight leading-none m-0 hover:opacity-80 transition-all cursor-pointer select-none ${
                clickCount > 0 ? 'scale-105' : ''
              }`}
              onClick={handleLogoClick}
              title={clickCount > 0 ? `관리자 모드 활성화 (${clickCount}/6)` : undefined}
            >
              데이식스 음원총공팀
            </h1>
          </Link>
        </div>
      </div>

      {/* Right side - could add navigation or user menu later */}
      <div className="flex items-center gap-4">
        {/* Future: Add navigation links, user profile, etc */}
      </div>
    </header>
  );
}
