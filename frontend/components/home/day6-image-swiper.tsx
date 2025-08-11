"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

interface DAY6ImageSwiperProps {
  onMenuClick?: () => void;
}

export default function DAY6ImageSwiper({ onMenuClick }: DAY6ImageSwiperProps) {
  return (
    <div className="relative w-full">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        {/* Title */}
        <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
          DAY6 STRM
        </h1>

        {/* Balance */}
        <div className="w-9"></div>
      </div>

      {/* Banner Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-gradient-to-b from-gray-100 to-gray-200">
        <Image
          src="/day6-banner.jpeg"
          alt="DAY6 Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      </div>
    </div>
  );
}