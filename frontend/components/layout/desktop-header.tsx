"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "./mobile-app-layout";
import Link from "next/link";

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

        <div className="flex items-end gap-3">
          <Link href="/">
            <h1 className="font-montserrat text-2xl lg:text-2xl xl:text-3xl font-bold text-gray-900 tracking-tight leading-none m-0 hover:opacity-80 transition-opacity cursor-pointer">
              DAY<span className="text-[#49c4b0]">6</span> STRM
            </h1>
          </Link>
          <span className="text-base lg:text-lg text-gray-500 ml-2 leading-none">
            데이식스 음원정보팀
          </span>
        </div>
      </div>

      {/* Right side - could add navigation or user menu later */}
      <div className="flex items-center gap-4">
        {/* Future: Add navigation links, user profile, etc */}
      </div>
    </header>
  );
}
