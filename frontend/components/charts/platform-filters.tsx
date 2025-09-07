"use client";

import { Button } from "@/components/ui/button";
import { PlatformType } from "@/lib/types";
import { useCallback, memo, useTransition, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PlatformFiltersProps {
  selectedPlatforms: PlatformType[];
  onPlatformChange: (
    platforms: PlatformType[] | ((prev: PlatformType[]) => PlatformType[])
  ) => void;
}

const MELON_CHARTS = [
  { id: "melon_top100" as const, name: "TOP100", color: "#49c4b0" },
  { id: "melon_hot100" as const, name: "HOT100", color: "#49c4b0" },
  { id: "melon_daily" as const, name: "일간", color: "#2d9cdb" },
  { id: "melon_weekly" as const, name: "주간", color: "#3742fa" },
  { id: "melon_monthly" as const, name: "월간", color: "#5f27cd" },
];

const OTHER_PLATFORMS = [
  { id: "genie" as const, name: "지니", color: "#3ba89a" },
  { id: "bugs" as const, name: "벅스", color: "#5bd2b8" },
  { id: "vibe" as const, name: "바이브", color: "#6dd5c0" },
  { id: "flo" as const, name: "플로", color: "#3d9fa0" },
];

export const PlatformFilters = memo(function PlatformFilters({
  selectedPlatforms,
  onPlatformChange,
}: PlatformFiltersProps) {
  const [, startTransition] = useTransition();
  const [isMelonExpanded, setIsMelonExpanded] = useState(true);

  const handleMelonSectionClick = useCallback(() => {
    const newExpanded = !isMelonExpanded;
    setIsMelonExpanded(newExpanded);
    
    // 멜론 섹션을 처음 펼칠 때, 아무것도 선택되어 있지 않다면 TOP100을 기본 선택
    if (newExpanded && !selectedPlatforms.some(p => p.startsWith('melon_'))) {
      startTransition(() => {
        onPlatformChange((prev) => [...prev, 'melon_top100']);
      });
    }
  }, [isMelonExpanded, selectedPlatforms, onPlatformChange]);

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

  const hasMelonSelected = selectedPlatforms.some(p => p.startsWith('melon_'));
  const hasOtherSelected = selectedPlatforms.some(p => !p.startsWith('melon_'));

  return (
    <div className="space-y-4">
      {/* Melon Section */}
      <div>
        <div 
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={handleMelonSectionClick}
        >
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            멜론 차트
            {hasMelonSelected && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </h4>
          {isMelonExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
        {isMelonExpanded && (
          <div className="flex flex-wrap gap-2 sm:gap-3 ml-4">
            {MELON_CHARTS.map((platform) => {
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
        )}
      </div>

      {/* Other Platforms Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          다른 플랫폼
          {hasOtherSelected && (
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </h4>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {OTHER_PLATFORMS.map((platform) => {
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
    </div>
  );
});
