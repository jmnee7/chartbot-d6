"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { PlatformType, ChartSong } from "@/lib/types";
import { ExternalLink, BarChart3 } from "lucide-react";
import { PlatformFilters } from "@/components/charts/platform-filters";
import { ChartSection } from "@/components/charts/chart-section";

export default function ChartsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    "melon",
  ]);

  const {
    data: chartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  // 실제 데이터에서 통계 계산
  const getChartStats = () => {
    if (!chartData) return null;

    // 플랫폼 데이터만 필터링 (메타데이터 제외)
    const validPlatforms: PlatformType[] = [
      "melon",
      "genie",
      "bugs",
      "vibe",
      "flo",
    ];

    const totalSongs = validPlatforms.reduce((sum, platform) => {
      const platformData = chartData[platform];
      return sum + (Array.isArray(platformData) ? platformData.length : 0);
    }, 0);

    const inChartPlatforms = validPlatforms.filter((platform) => {
      const platformData = chartData[platform];
      return (
        Array.isArray(platformData) &&
        platformData.some(
          (song: ChartSong) => song.rank !== null && song.rank > 0
        )
      );
    }).length;

    return {
      totalPlatforms: validPlatforms.length,
      inChartPlatforms,
      totalSongs,
      lastUpdated:
        chartData.collectedAtKST || new Date().toLocaleString("ko-KR"),
    };
  };

  const stats = getChartStats();

  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              실시간 차트
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6의 차트 순위 변동 추적
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Dynamic Chart Status */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>데이터 로딩 중</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  차트 데이터 수집 중
                </h3>
                <p className="text-blue-600 font-medium">
                  실시간 차트 정보를 가져오고 있습니다...
                </p>
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span>연결 실패</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  차트 데이터 로딩 실패
                </h3>
                <p className="text-red-600 font-medium">
                  데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
                </p>
              </div>
            ) : stats ? (
              <div className="p-6 text-center">
                {stats.inChartPlatforms > 0 ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse"></div>
                      <span>차트 진입 중</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {stats.inChartPlatforms}개 플랫폼 차트 진입
                    </h3>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                      <span>차트 모니터링</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      차트 진입 대기 중
                    </h3>
                  </>
                )}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#49c4b0]">
                      {stats.inChartPlatforms}
                    </div>
                    <div className="text-sm text-gray-600">진입 플랫폼</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#49c4b0]">
                      {stats.totalSongs}
                    </div>
                    <div className="text-sm text-gray-600">추적 곡수</div>
                  </div>
                </div>
                <p className="text-green-600 font-medium mt-3 text-sm">
                  마지막 업데이트: {stats.lastUpdated}
                </p>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>대기 중</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  차트 데이터 대기
                </h3>
                <p className="text-gray-600 font-medium">
                  차트 정보를 기다리고 있습니다...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Filters */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">
            플랫폼 필터
          </h3>
          <Card>
            <CardContent className="p-0">
              <div className="">
                <PlatformFilters
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={setSelectedPlatforms}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <ChartSection
          selectedPlatforms={selectedPlatforms}
          chartData={chartData}
          isLoading={isLoading}
        />

        {/* Chart Info Tips */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">차트 정보</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="before:content-['•'] before:text-[#49c4b0] before:mr-2">
                실시간 차트는 매시간 업데이트됩니다
              </li>
              <li className="before:content-['•'] before:text-[#49c4b0] before:mr-2">
                순위 변동은 전 시간 대비 변화량입니다
              </li>
              <li className="before:content-['•'] before:text-[#49c4b0] before:mr-2">
                여러 플랫폼을 선택하여 비교 가능합니다
              </li>
              <li className="before:content-['•'] before:text-[#49c4b0] before:mr-2">
                차트 밖으로 벗어난 곡은 &apos;-&apos; 표시됩니다
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}
