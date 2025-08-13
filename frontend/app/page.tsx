"use client";

import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompactChart } from "@/components/compact-chart";
import DAY6ImageSwiper from "@/components/home/day6-image-swiper";
import MVStatsCard from "@/components/home/mv-stats-card";
import QuickAccessCard from "@/components/home/quick-access-card";
import AlertBanner from "@/components/home/alert-banner";
import { MelonMusicwaveBanner } from "@/components/home/melon-musicwave-banner";
import { QuickLinksBanner } from "@/components/home/quick-links-banner";
import { formatKoreanDate } from "@/lib/date-utils";
import { useSidebar } from "@/components/layout/mobile-app-layout";
import { getLastUpdateTime } from "@/lib/utils/index";

export default function HomePage() {
  const currentTime = new Date();
  const { openSidebar } = useSidebar();

  return (
    <div>
      <DAY6ImageSwiper onMenuClick={openSidebar} />

      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        <AlertBanner />
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                실시간 차트 순위
              </h2>
              <p className="text-xs text-gray-500">
                {formatKoreanDate(currentTime)}
              </p>
            </div>
          </div>
          <CompactChart />
          <div
            className="mt-6 -mx-5"
            style={{ borderBottom: "0.6rem solid #f7f8f9" }}
          ></div>
        </div>

        {/* Desktop Layout */}
        <Card className="hidden md:block bg-white/60 backdrop-blur-sm border-mint-primary/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900">
                  실시간 차트 순위
                </CardTitle>
                <p className="text-xs md:text-sm text-gray-500">
                  {formatKoreanDate(currentTime)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CompactChart />
          </CardContent>
        </Card>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            원클릭 스트리밍 리스트
          </h2>
          <QuickAccessCard />
        </div>

        {/* Desktop Layout */}
        <Card className="hidden md:block bg-white/60 backdrop-blur-sm border-mint-dark/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold text-gray-900">
              원클릭 스트리밍 리스트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuickAccessCard />
          </CardContent>
        </Card>

        <MelonMusicwaveBanner />

        <QuickLinksBanner />

        {/* Mobile Divider */}
        <div
          className="md:hidden mt-6 -mx-5"
          style={{ borderBottom: "0.6rem solid #f7f8f9" }}
        ></div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              뮤직비디오 조회수
            </h2>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <span className="text-xs text-gray-500">
                {formatKoreanDate(currentTime)}
              </span>
              <Clock className="h-3 w-3 text-mint-primary" />
              <span>{getLastUpdateTime()} 기준</span>
            </div>
          </div>
          <MVStatsCard />
        </div>

        {/* Desktop Layout */}
        <Card className="hidden md:block bg-white/60 backdrop-blur-sm border-navy-dark/20 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl font-bold text-gray-900">
                뮤직비디오 조회수
              </CardTitle>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <span className="text-xs md:text-sm text-gray-500">
                  {formatKoreanDate(currentTime)}
                </span>
                <Clock className="h-3 w-3 text-mint-primary" />
                <span>{getLastUpdateTime()} 기준</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MVStatsCard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
