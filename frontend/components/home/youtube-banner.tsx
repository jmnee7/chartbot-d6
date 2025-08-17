"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface YouTubeBannerProps {
  onMenuClick: () => void;
  videoId?: string;
}

export default function YouTubeBanner({
  onMenuClick,
  videoId = "0fyZqS0N19o", // DAY6 - Maybe Tomorrow
}: YouTubeBannerProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
      {/* Menu Button - positioned over the video */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* YouTube Embedded Video */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
        title="DAY6 Music Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
