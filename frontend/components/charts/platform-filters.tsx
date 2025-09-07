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
  // 멜론 최신 차트 (매시간 업데이트)
  { id: "melon_top100" as const, name: "멜론 TOP100", color: "#49c4b0", group: "최신" },
  { id: "melon_hot100" as const, name: "멜론 HOT100", color: "#49c4b0", group: "최신" },
  
  // 멜론 기간별 차트
  { id: "melon_daily" as const, name: "멜론 일간", color: "#2d9cdb", group: "기간별" },
  { id: "melon_weekly" as const, name: "멜론 주간", color: "#3742fa", group: "기간별" },
  { id: "melon_monthly" as const, name: "멜론 월간", color: "#5f27cd", group: "기간별" },
  
  // 다른 플랫폼 (매시간 업데이트)
  { id: "genie" as const, name: "지니", color: "#3ba89a", group: "최신" },
  { id: "bugs" as const, name: "벅스", color: "#5bd2b8", group: "최신" },
  { id: "vibe" as const, name: "바이브", color: "#6dd5c0", group: "최신" },
  { id: "flo" as const, name: "플로", color: "#3d9fa0", group: "최신" },
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

  // 그룹별로 플랫폼 분류
  const groupedPlatforms = PLATFORMS.reduce((acc, platform) => {
    if (!acc[platform.group]) {
      acc[platform.group] = [];
    }
    acc[platform.group].push(platform);
    return acc;
  }, {} as Record<string, typeof PLATFORMS>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedPlatforms).map(([groupName, platforms]) => (
        <div key={groupName}>
          <h4 className="text-sm font-medium text-gray-700 mb-2">{groupName} 차트</h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {platforms.map((platform) => {
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
        </div>
      ))}
    </div>
  );
});
