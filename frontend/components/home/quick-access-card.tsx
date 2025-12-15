"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MUSIC_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import { usePlatformLinks } from "@/lib/api/platform-links";
import { useSiteSettings, updateSiteSetting } from "@/lib/api/site-settings";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { useState } from "react";
import { Power, PowerOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function QuickAccessCard() {
  const { data: platformLinks } = usePlatformLinks();
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();
  const { isAdminMode } = useAdminMode();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  // 스트리밍 비활성화 상태 확인
  const isStreamingDisabled = siteSettings?.streaming_disabled === "true";
  const disabledMessage = siteSettings?.streaming_disabled_message || "새 링크 준비 중입니다";

  // 스트리밍 활성화/비활성화 토글
  const toggleStreamingDisabled = async () => {
    setIsUpdating(true);
    try {
      const newValue = isStreamingDisabled ? "false" : "true";
      await updateSiteSetting("streaming_disabled", newValue);
      // 캐시 무효화하여 즉시 반영
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
    } catch (error) {
      console.error("스트리밍 설정 업데이트 실패:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // 항상 모든 플랫폼을 표시하되, PlatformCard에서 DB 데이터 유무에 따라 처리
  const platformsToShow = MUSIC_PLATFORMS;

  return (
    <Card>
      <CardContent className="p-0">
        {/* 관리자 모드: 스트리밍 토글 버튼 */}
        {isAdminMode && (
          <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              {isStreamingDisabled ? (
                <PowerOff className="w-4 h-4 text-red-500" />
              ) : (
                <Power className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm font-medium">
                스트리밍 링크: {isStreamingDisabled ? "비활성화됨" : "활성화됨"}
              </span>
            </div>
            <Button
              size="sm"
              variant={isStreamingDisabled ? "default" : "destructive"}
              onClick={toggleStreamingDisabled}
              disabled={isUpdating || settingsLoading}
              className="text-xs"
            >
              {isUpdating ? (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              ) : isStreamingDisabled ? (
                <Power className="w-3 h-3 mr-1" />
              ) : (
                <PowerOff className="w-3 h-3 mr-1" />
              )}
              {isStreamingDisabled ? "활성화하기" : "비활성화하기"}
            </Button>
          </div>
        )}

        {/* 스트리밍 카드 영역 */}
        <div className="relative">
          {/* 비활성화 오버레이 */}
          {isStreamingDisabled && !isAdminMode && (
            <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center p-4">
                <PowerOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">{disabledMessage}</p>
                <p className="text-xs text-gray-400 mt-1">발매 후 업데이트 예정</p>
              </div>
            </div>
          )}

          <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 overflow-visible p-3 ${isStreamingDisabled && !isAdminMode ? "pointer-events-none" : ""}`}>
            {platformsToShow.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <PlatformCard
                  platform={platform}
                  variant="grid"
                  isHome={true}
                  platformLinks={platformLinks}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
