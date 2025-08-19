"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "./mobile-app-layout";
import Link from "next/link";
import Image from "next/image";

export function DesktopHeader() {
  const { openSidebar } = useSidebar();

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
            <h1 className="font-sans text-2xl lg:text-2xl xl:text-3xl font-bold text-[#666] tracking-tight leading-none m-0 hover:opacity-80 transition-opacity cursor-pointer">
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
