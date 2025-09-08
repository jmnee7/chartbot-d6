"use client";

import { Button } from "@/components/ui/button";
import { PlatformType } from "@/lib/types";
import { useCallback, memo, useTransition, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlatformFiltersProps {
  selectedPlatforms: PlatformType[];
  onPlatformChange: (
    platforms: PlatformType[] | ((prev: PlatformType[]) => PlatformType[])
  ) => void;
}

const MAIN_PLATFORMS = [
  { id: "melon" as const, name: "멜론", color: "#49c4b0" },
  { id: "genie" as const, name: "지니", color: "#3ba89a" },
  { id: "bugs" as const, name: "벅스", color: "#5bd2b8" },
  { id: "vibe" as const, name: "바이브", color: "#6dd5c0" },
  { id: "flo" as const, name: "플로", color: "#3d9fa0" },
];

const MELON_SUB_CHARTS = [
  { id: "melon_top100" as const, name: "멜론 TOP100", color: "#49c4b0" },
  { id: "melon_hot100" as const, name: "멜론 HOT100", color: "#49c4b0" },
  { id: "melon_daily" as const, name: "일간", color: "#2d9cdb" },
  { id: "melon_weekly" as const, name: "주간", color: "#3742fa" },
  { id: "melon_monthly" as const, name: "월간", color: "#5f27cd" },
];

export const PlatformFilters = memo(function PlatformFilters({
  selectedPlatforms,
  onPlatformChange,
}: PlatformFiltersProps) {
  const [, startTransition] = useTransition();
  const [selectedMainPlatform, setSelectedMainPlatform] = useState<
    string | null
  >(null);
  const [showMelonSubCharts, setShowMelonSubCharts] = useState(false);
  const [selectedMelonChart, setSelectedMelonChart] =
    useState<PlatformType>("melon_top100");

  const handleMainPlatformClick = useCallback(
    (platformId: string) => {
      if (platformId === "melon") {
        if (selectedMainPlatform === "melon") {
          // 멜론이 이미 선택되어 있다면 서브차트 토글
          setShowMelonSubCharts(!showMelonSubCharts);
        } else {
          // 멜론을 새로 선택
          setSelectedMainPlatform("melon");
          setShowMelonSubCharts(true);

          // 기존 선택된 플랫폼들 제거하고 멜론 TOP100만 선택
          setSelectedMelonChart("melon_top100");
          startTransition(() => {
            onPlatformChange(["melon_top100"]);
          });
        }
      } else {
        // 다른 플랫폼 선택
        setSelectedMainPlatform(platformId);
        setShowMelonSubCharts(false);

        startTransition(() => {
          onPlatformChange([platformId as PlatformType]);
        });
      }
    },
    [selectedMainPlatform, showMelonSubCharts, onPlatformChange]
  );

  const selectMelonSubChart = useCallback(
    (platform: PlatformType) => {
      setSelectedMelonChart(platform);
      startTransition(() => {
        onPlatformChange([platform]);
      });
    },
    [onPlatformChange]
  );

  // 현재 선택된 플랫폼에 따라 selectedMainPlatform 동기화
  useEffect(() => {
    const melonPlatform = selectedPlatforms.find((p) => p.startsWith("melon_"));
    const otherPlatform = selectedPlatforms.find((p) =>
      ["genie", "bugs", "vibe", "flo"].includes(p)
    );

    const currentMainPlatform = melonPlatform ? "melon" : otherPlatform;

    if (currentMainPlatform !== selectedMainPlatform) {
      setSelectedMainPlatform(currentMainPlatform || null);
      setShowMelonSubCharts(currentMainPlatform === "melon");
    }

    // 멜론 서브차트 선택 동기화
    if (melonPlatform && melonPlatform !== selectedMelonChart) {
      setSelectedMelonChart(melonPlatform as PlatformType);
    }
  }, [selectedPlatforms, selectedMainPlatform, selectedMelonChart]);

  return (
    <div className="space-y-4">
      {/* Main Platforms */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">플랫폼 선택</h4>
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {MAIN_PLATFORMS.map((platform, index) => {
            const isSelected = selectedMainPlatform === platform.id;
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.2,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMainPlatformClick(platform.id)}
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
                      ? "border-0 transition-all duration-200 flex items-center gap-2"
                      : "hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                  }
                >
                  {platform.name}
                  {platform.id === "melon" && isSelected && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: showMelonSubCharts ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Melon Sub Charts with Animation */}
      <AnimatePresence mode="wait">
        {selectedMainPlatform === "melon" && showMelonSubCharts && (
          <motion.div
            key="melon-sub-charts"
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              height: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              멜론 차트 종류
            </h4>

            {/* 모바일에서 스와이프 가능한 탭 목록 */}
            <div className="md:hidden overflow-x-auto">
              <motion.div
                className="flex gap-2 pb-2 min-w-max"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {MELON_SUB_CHARTS.map((platform, index) => {
                  const isSelected = selectedMelonChart === platform.id;
                  return (
                    <motion.div
                      key={platform.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.15 + index * 0.05,
                        duration: 0.2,
                      }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => selectMelonSubChart(platform.id)}
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
                            ? "border-0 transition-all duration-200 whitespace-nowrap flex-shrink-0 transform hover:scale-105"
                            : "hover:bg-gray-100 transition-all duration-200 whitespace-nowrap flex-shrink-0 hover:scale-105"
                        }
                      >
                        {platform.name}
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* 데스크톱에서 기존 레이아웃 */}
            <motion.div
              className="hidden md:flex flex-wrap gap-2 sm:gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {MELON_SUB_CHARTS.map((platform, index) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.15 + index * 0.05,
                      duration: 0.2,
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectMelonSubChart(platform.id)}
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
                          ? "border-0 transition-all duration-200 transform hover:scale-105"
                          : "hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                      }
                    >
                      {platform.name}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
