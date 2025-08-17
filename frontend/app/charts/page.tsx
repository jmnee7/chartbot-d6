"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { PlatformType, ChartSong } from "@/lib/types";
import { BarChart3 } from "lucide-react";
import { PlatformFilters } from "@/components/charts/platform-filters";
import { ChartSection } from "@/components/charts/chart-section";
import { SectionHeader } from "@/components/ui/section-header";
import Image from "next/image";

export default function ChartsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    "melon",
    "melon_top100",
    "melon_hot100",
  ]);

  const handlePlatformChange = useCallback(
    (
      platforms: PlatformType[] | ((prev: PlatformType[]) => PlatformType[])
    ) => {
      setSelectedPlatforms(platforms);
    },
    []
  );

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
      "melon_top100",
      "melon_hot100",
      "genie",
      "bugs",
      "vibe",
      "flo",
    ];

    const totalSongs = validPlatforms.reduce((sum, platform) => {
      const platformData = chartData[platform];
      return sum + (Array.isArray(platformData) ? platformData.length : 0);
    }, 0);

    // 각 플랫폼별 최고 순위 곡 찾기
    const platformRanks = validPlatforms.map((platform) => {
      const platformData = chartData[platform];
      if (!Array.isArray(platformData) || platformData.length === 0) {
        return { platform, rank: null, title: null };
      }

      // DAY6 곡들 중 가장 높은 순위 찾기
      const day6Songs = platformData.filter(
        (song: ChartSong) =>
          song.artist?.includes("DAY6") && song.rank !== null && song.rank > 0
      );

      if (day6Songs.length === 0) {
        return { platform, rank: null, title: null };
      }

      const bestSong = day6Songs.reduce((best, current) =>
        current.rank! < best.rank! ? current : best
      );

      return {
        platform,
        rank: bestSong.rank,
        title: bestSong.title,
      };
    });

    const inChartPlatforms = platformRanks.filter(
      (p) => p.rank !== null
    ).length;

    return {
      totalPlatforms: validPlatforms.length,
      inChartPlatforms,
      totalSongs,
      platformRanks,
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
        <SectionHeader title="차트" />

        {/* Mobile Layout */}
        <div className="md:hidden">
          {isLoading ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>데이터 로딩 중</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                차트 데이터 수집 중
              </h3>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                <span>연결 실패</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                차트 데이터 로딩 실패
              </h3>
            </div>
          ) : stats ? (
            <>
              <div className="text-center mb-6">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      차트 진입 대기 중
                    </h3>
                  </>
                )}
              </div>

              {/* 플랫폼별 순위 표시 - 모바일 */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  플랫폼별 현재 순위
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {stats.platformRanks.map((platform) => (
                    <div
                      key={platform.platform}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={
                              platform.platform === "melon"
                                ? "/ico_melon.png"
                                : platform.platform === "genie"
                                  ? "/Geenie.png"
                                  : platform.platform === "bugs"
                                    ? "/bucks.png"
                                    : platform.platform === "vibe"
                                      ? "/vibe.jpeg"
                                      : platform.platform === "flo"
                                        ? "/fillo.png"
                                        : "/file.svg"
                            }
                            alt={
                              platform.platform === "melon"
                                ? "멜론"
                                : platform.platform === "genie"
                                  ? "지니"
                                  : platform.platform === "bugs"
                                    ? "벅스"
                                    : platform.platform === "vibe"
                                      ? "바이브"
                                      : platform.platform === "flo"
                                        ? "플로"
                                        : platform.platform
                            }
                            width={20}
                            height={20}
                            className="rounded-sm object-cover"
                          />
                          <span className="text-sm font-medium text-gray-800">
                            {platform.platform === "melon"
                              ? "멜론"
                              : platform.platform === "genie"
                                ? "지니"
                                : platform.platform === "bugs"
                                  ? "벅스"
                                  : platform.platform === "vibe"
                                    ? "바이브"
                                    : platform.platform === "flo"
                                      ? "플로"
                                      : platform.platform}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div
                            className={`text-xl font-bold ${
                              platform.rank
                                ? "text-gray-900"
                                : "text-orange-500"
                            }`}
                          >
                            {platform.rank || "-"}
                          </div>
                          <div className="text-xs text-gray-400">위</div>
                        </div>
                        <div className="flex-1 min-w-0 text-center">
                          {platform.rank ? (
                            <>
                              <p className="font-medium text-sm truncate text-gray-900">
                                {platform.title || "DAY6"}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                DAY6
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="font-medium text-sm text-orange-600">
                                ❌
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                차트 아웃
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <BarChart3 className="w-4 h-4" />
                <span>대기 중</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                차트 데이터 대기
              </h3>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <Card className="hidden md:block bg-white/60 backdrop-blur-sm border-navy-dark/20 shadow-sm">
          <CardContent className="">
            {isLoading ? (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>데이터 로딩 중</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  차트 데이터 수집 중
                </h3>
              </div>
            ) : error ? (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span>연결 실패</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  차트 데이터 로딩 실패
                </h3>
              </div>
            ) : stats ? (
              <>
                <div className="text-center mb-6">
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
                  ) : null}
                </div>

                {/* 플랫폼별 순위 표시 - 데스크톱 */}
                <div className="">
                  <div className="grid grid-cols-2 gap-2">
                    {stats.platformRanks.map((platform) => (
                      <div
                        key={platform.platform}
                        className="bg-white/80 rounded-lg p-3 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Image
                              src={
                                platform.platform === "melon" ||
                                platform.platform === "melon_top100" ||
                                platform.platform === "melon_hot100"
                                  ? "/ico_melon.png"
                                  : platform.platform === "genie"
                                    ? "/Geenie.png"
                                    : platform.platform === "bugs"
                                      ? "/bucks.png"
                                      : platform.platform === "vibe"
                                        ? "/vibe.jpeg"
                                        : platform.platform === "flo"
                                          ? "/fillo.png"
                                          : "/file.svg"
                              }
                              alt={
                                platform.platform === "melon"
                                  ? "멜론"
                                  : platform.platform === "melon_top100"
                                    ? "멜론 TOP100"
                                    : platform.platform === "melon_hot100"
                                      ? "멜론 HOT100"
                                      : platform.platform === "genie"
                                        ? "지니"
                                        : platform.platform === "bugs"
                                          ? "벅스"
                                          : platform.platform === "vibe"
                                            ? "바이브"
                                            : platform.platform === "flo"
                                              ? "플로"
                                              : platform.platform
                              }
                              width={20}
                              height={20}
                              className="rounded-sm object-cover"
                            />
                            <span className="text-sm font-medium text-gray-800">
                              {platform.platform === "melon"
                                ? "멜론 실시간"
                                : platform.platform === "melon_top100"
                                  ? "멜론 TOP100"
                                  : platform.platform === "melon_hot100"
                                    ? "멜론 HOT100"
                                    : platform.platform === "genie"
                                      ? "지니"
                                      : platform.platform === "bugs"
                                        ? "벅스"
                                        : platform.platform === "vibe"
                                          ? "바이브"
                                          : platform.platform === "flo"
                                            ? "플로"
                                            : platform.platform}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div
                              className={`text-xl font-bold ${
                                platform.rank
                                  ? "text-gray-900"
                                  : "text-orange-500"
                              }`}
                            >
                              {platform.rank || "-"}
                            </div>
                            <div className="text-xs text-gray-400">위</div>
                          </div>
                          <div className="flex-1 min-w-0 text-center">
                            {platform.rank ? (
                              <>
                                <p className="font-medium text-sm truncate text-gray-900">
                                  {platform.title || "DAY6"}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  DAY6
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-sm text-orange-600">
                                  ❌
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  차트 아웃
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>대기 중</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  차트 데이터 대기
                </h3>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mobile Divider */}
        <div
          className="md:hidden mt-6 -mx-9"
          style={{ borderBottom: "0.6rem solid #f7f8f9" }}
        ></div>

        {/* Mobile Layout - Platform Filters & Chart Section */}
        <div className="md:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-4">플랫폼 필터</h3>
          <PlatformFilters
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={handlePlatformChange}
          />

          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">차트 순위</h3>
            <ChartSection
              selectedPlatforms={selectedPlatforms}
              chartData={chartData}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Desktop Layout - Platform Filters & Chart Section */}
        <Card className="hidden md:block bg-white/60 backdrop-blur-sm border-navy-dark/20 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              플랫폼 필터
            </h3>
            <PlatformFilters
              selectedPlatforms={selectedPlatforms}
              onPlatformChange={handlePlatformChange}
            />

            <div className="mt-6">
              <ChartSection
                selectedPlatforms={selectedPlatforms}
                chartData={chartData}
                isLoading={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}
