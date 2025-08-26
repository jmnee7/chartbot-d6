"use client";

import { Button } from "@/components/ui/button";
import { PlatformType } from "@/lib/types";
import { useCallback, memo, useTransition } from "react";

interface PlatformFiltersProps {
  selectedPlatforms: PlatformType[];
  onPlatformChange: (
    platforms: PlatformType[] | ((prev: PlatformType[]) => PlatformType[])
  ) => void;
}

const PLATFORMS = [
  { id: "melon_top100" as const, name: "멜론 TOP100", color: "#49c4b0" },
  { id: "melon_hot100" as const, name: "멜론 HOT100", color: "#49c4b0" },
  { id: "genie" as const, name: "지니", color: "#3ba89a" },
  {
    id: "bugs" as const,
    name: "벅스",
    color: "#5bd2b8",
  },
  { id: "vibe" as const, name: "바이브", color: "#6dd5c0" },
  {
    id: "flo" as const,
    name: "플로",
    color: "#3d9fa0",
  },
];

export const PlatformFilters = memo(function PlatformFilters({
  selectedPlatforms,
  onPlatformChange,
}: PlatformFiltersProps) {
  const [, startTransition] = useTransition();

  const togglePlatform = useCallback(
    (platform: PlatformType) => {
      startTransition(() => {
        onPlatformChange((prev) => {
          if (prev.includes(platform)) {
            return prev.filter((p) => p !== platform);
          } else {
            return [...prev, platform];
          }
        });
      });
    },
    [onPlatformChange]
  );

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {PLATFORMS.map((platform) => {
        const isSelected = selectedPlatforms.includes(platform.id);
        return (
          <Button
            key={platform.id}
            variant="outline"
            size="sm"
            onClick={() => togglePlatform(platform.id)}
            style={
              isSelected
                ? {
                    backgroundColor: platform.color,
                    color: "white",
                    borderColor: platform.color,
                    transform: "translateZ(0)",
                  }
                : undefined
            }
            className={
              isSelected
                ? "border-0 transition-colors"
                : "hover:bg-gray-100 transition-colors"
            }
          >
            {platform.name}
          </Button>
        );
      })}
    </div>
  );
});
