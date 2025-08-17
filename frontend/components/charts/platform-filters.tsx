"use client";

import { Button } from "@/components/ui/button";
import { PlatformType } from "@/lib/types";
import { useCallback, memo } from "react";

interface PlatformFiltersProps {
  selectedPlatforms: PlatformType[];
  onPlatformChange: (
    platforms: PlatformType[] | ((prev: PlatformType[]) => PlatformType[])
  ) => void;
}

const PLATFORMS = [
  { id: "melon" as const, name: "멜론 실시간", color: "bg-[#49c4b0]" },
  { id: "melon_top100" as const, name: "멜론 TOP100", color: "bg-[#49c4b0]" },
  { id: "melon_hot100" as const, name: "멜론 HOT100", color: "bg-[#49c4b0]" },
  { id: "genie" as const, name: "지니", color: "bg-[#3ba89a]" },
  {
    id: "bugs" as const,
    name: "벅스",
    color: "bg-gradient-to-r from-[#49c4b0] to-[#6dd5c0]",
  },
  { id: "vibe" as const, name: "바이브", color: "bg-[#6dd5c0]" },
  {
    id: "flo" as const,
    name: "플로",
    color: "bg-gradient-to-br from-[#49c4b0] to-[#1e3a8a]",
  },
];

export const PlatformFilters = memo(function PlatformFilters({
  selectedPlatforms,
  onPlatformChange,
}: PlatformFiltersProps) {
  const togglePlatform = useCallback(
    (platform: PlatformType) => {
      onPlatformChange((prev) => {
        if (prev.includes(platform)) {
          return prev.filter((p) => p !== platform);
        } else {
          return [...prev, platform];
        }
      });
    },
    [onPlatformChange]
  );

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {PLATFORMS.map((platform) => (
        <Button
          key={platform.id}
          variant={
            selectedPlatforms.includes(platform.id) ? "default" : "outline"
          }
          size="sm"
          onClick={() => togglePlatform(platform.id)}
          className={
            selectedPlatforms.includes(platform.id)
              ? `${platform.color} text-white hover:opacity-90`
              : ""
          }
        >
          {platform.name}
        </Button>
      ))}
    </div>
  );
});
