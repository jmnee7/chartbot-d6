"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { fetchChartDisplayConfig, fetchChartSettings } from "@/lib/api/chart-config";
import { ChartSong } from "@/lib/types";
import {
  getPlatformName,
  getRankChangeIcon,
  getRankChangeColor,
} from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useState, useEffect } from "react";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { ChartEditModal } from "@/components/admin/chart-edit-modal";
import { Settings } from "lucide-react";

interface CompactChartProps {
  targetSong?: string;
  title?: string;
}

export function CompactChartDBFixed({ targetSong }: CompactChartProps = {}) {
  const { isAdminMode } = useAdminMode();
  
  // 차트 데이터
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  // DB에서 타이틀곡 설정 가져오기
  const { data: displayConfig, isLoading: isConfigLoading } = useQuery({
    queryKey: ["chartDisplayConfig"],
    queryFn: fetchChartDisplayConfig,
    staleTime: 60000, // 1분간 캐시
  });

  // DB에서 차트 설정 가져오기
  const { data: chartSettings } = useQuery({
    queryKey: ["chartSettings"],
    queryFn: fetchChartSettings,
    staleTime: 60000, // 1분간 캐시
  });

  // 기존과 동일한 state 관리
  const [showFirstSong, setShowFirstSong] = useState(true);
  const [isManualMode, setIsManualMode] = useState(false);

  // DB 설정에 따른 롤링 시간 (기본값 5초)
  const rollingInterval = chartSettings?.chart_rolling_interval || 5000;

  // 활성화된 타이틀곡 목록 (우선순위 순)
  const activeSongs = displayConfig?.filter(config => 
    config.is_active && config.target_song
  ).sort((a, b) => a.priority - b.priority) || [];

  // 첫 번째, 두 번째 곡 (기존 로직과 동일)
  const firstSong = activeSongs[0]?.target_song || "꿈의 버스";
  const secondSong = activeSongs[1]?.target_song || "INSIDE OUT";

  // 기존과 동일한 롤링 효과
  useEffect(() => {
    if (!targetSong && !isManualMode && activeSongs.length > 1) {
      const interval = setInterval(() => {
        setShowFirstSong((prev) => !prev);
      }, rollingInterval);
      return () => clearInterval(interval);
    }
  }, [targetSong, isManualMode, rollingInterval, activeSongs.length]);

  // 기존과 동일한 인디케이터 클릭 핸들러
  const handleDotClick = (isFirst: boolean) => {
    setShowFirstSong(isFirst);
    setIsManualMode(true);
    // 10초 후 자동 모드로 복귀
    setTimeout(() => {
      setIsManualMode(false);
    }, 10000);
  };

  if (isChartLoading || isConfigLoading) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-100 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  const platforms = [
    "melon_top100",
    "melon_hot100",
    "genie",
    "bugs",
    "vibe",
    "flo",
  ];

  // 기존과 동일한 로직으로 수정
  const platformData: {
    platform: string;
    firstSong: ChartSong | null;
    secondSong: ChartSong | null;
  }[] = [];

  platforms.forEach((platform) => {
    const songs =
      (chartData?.[platform as keyof typeof chartData] as ChartSong[]) || [];

    // DB에서 가져온 곡명으로 검색 (기존과 동일한 방식)
    const foundFirstSong = songs.find(
      (song) => song.title && song.title.includes(firstSong)
    );
    const foundSecondSong = songs.find(
      (song) => song.title && song.title.includes(secondSong)
    );

    platformData.push({
      platform,
      firstSong: foundFirstSong || null,
      secondSong: foundSecondSong || null,
    });
  });

  const getPlatformLogo = (platform: string) => {
    const logos: Record<string, string> = {
      melon_top100: "/ico_melon.png",
      melon_hot100: "/ico_melon.png",
      genie: "/Geenie.png",
      bugs: "/bucks.png",
      vibe: "/vibe.jpeg",
      flo: "/fillo.png",
    };
    return logos[platform] || "/file.svg";
  };

  return (
    <Card className="relative">
      <CardContent className="p-0">
        {/* 관리자 편집 버튼 */}
        {isAdminMode && (
          <div className="absolute top-2 right-2 z-10">
            <ChartEditModal
              trigger={
                <button className="w-8 h-8 bg-mint-primary/10 hover:bg-mint-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Settings className="w-4 h-4 text-mint-primary" />
                </button>
              }
            />
          </div>
        )}
        
        {/* 기존과 동일한 타이틀곡 인디케이터 */}
        {!targetSong && activeSongs.length > 1 && (
          <div className="flex items-center gap-2 pt-3 pb-2 px-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleDotClick(false)}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  !showFirstSong
                    ? "bg-mint-primary w-4 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label={`${secondSong} 보기`}
              />
              <button
                onClick={() => handleDotClick(true)}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  showFirstSong
                    ? "bg-mint-primary w-4 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label={`${firstSong} 보기`}
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {showFirstSong ? firstSong : secondSong}
            </span>
          </div>
        )}
        
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={8}
          loop={true}
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="compact-chart-swiper"
        >
          {platformData.map(({ platform, firstSong: firstSongData, secondSong: secondSongData }) => {
            // 기존과 동일한 로직
            let currentSong = null;
            if (targetSong === firstSong) {
              currentSong = firstSongData;
            } else if (targetSong === secondSong) {
              currentSong = secondSongData;
            } else {
              // targetSong이 없으면 롤링으로 표시 (기존과 동일)
              currentSong = showFirstSong ? firstSongData : secondSongData;
              // 둘 중 하나가 없으면 있는 것을 표시
              if (!currentSong) {
                currentSong = firstSongData || secondSongData;
              }
            }

            return (
              <SwiperSlide key={platform}>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={getPlatformLogo(platform)}
                        alt={getPlatformName(platform)}
                        width={20}
                        height={20}
                        className="rounded-sm object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {getPlatformName(platform)}
                      </span>
                    </div>
                    {currentSong?.change !== undefined && (
                      <div
                        className={`text-xs font-medium ${getRankChangeColor(
                          currentSong.change ?? 0
                        )}`}
                      >
                        {getRankChangeIcon(currentSong.change ?? 0)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div
                        className={`text-xl font-bold ${
                          currentSong?.rank
                            ? "text-gray-900"
                            : "text-orange-500"
                        }`}
                      >
                        {currentSong?.rank || "-"}
                      </div>
                      <div className="text-xs text-gray-400">위</div>
                    </div>
                    <div className="flex-1 min-w-0 text-center">
                      {currentSong?.rank ? (
                        <div className="relative overflow-hidden h-10 flex items-center justify-center">
                          {/* 기존과 동일한 애니메이션 효과 */}
                          {/* 첫 번째 곡 */}
                          <div
                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                              !targetSong && !isManualMode
                                ? showFirstSong
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                                : targetSong === firstSong ||
                                    (firstSongData && !secondSongData)
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                            }`}
                          >
                            {firstSongData && (
                              <>
                                <p className="font-medium text-sm truncate text-gray-900">
                                  {firstSongData.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {firstSongData.artist}
                                </p>
                              </>
                            )}
                          </div>

                          {/* 두 번째 곡 */}
                          <div
                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                              !targetSong && !isManualMode
                                ? !showFirstSong
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                                : targetSong === secondSong ||
                                    (!firstSongData && secondSongData)
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                            }`}
                          >
                            {secondSongData && (
                              <>
                                <p className="font-medium text-sm truncate text-gray-900">
                                  {secondSongData.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {secondSongData.artist}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="font-medium text-sm text-orange-600">
                          ❌
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CardContent>
    </Card>
  );
}