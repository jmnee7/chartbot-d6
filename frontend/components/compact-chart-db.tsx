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

interface CompactChartProps {
  targetSong?: string;
  title?: string;
}

export function CompactChartDB({ targetSong }: CompactChartProps = {}) {
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

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isManualMode, setIsManualMode] = useState(false);

  // DB 설정에 따른 롤링 시간 (기본값 5초)
  const rollingInterval = chartSettings?.chart_rolling_interval || 5000;
  const autoRolling = chartSettings?.chart_auto_rolling ?? true;
  const maxDisplay = chartSettings?.chart_max_display || 2;

  // 활성화된 타이틀곡 목록
  const activeSongs = displayConfig?.filter(config => 
    config.is_active && config.target_song
  ).slice(0, maxDisplay) || [];

  // 자동 롤링 효과
  useEffect(() => {
    if (!targetSong && !isManualMode && autoRolling && activeSongs.length > 1) {
      const interval = setInterval(() => {
        setCurrentSongIndex((prev) => (prev + 1) % activeSongs.length);
      }, rollingInterval);
      return () => clearInterval(interval);
    }
  }, [targetSong, isManualMode, autoRolling, rollingInterval, activeSongs.length]);

  // 인디케이터 클릭 핸들러
  const handleDotClick = (index: number) => {
    setCurrentSongIndex(index);
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

  const platformData: {
    platform: string;
    songs: Map<string, ChartSong>;
  }[] = [];

  platforms.forEach((platform) => {
    const songs =
      (chartData?.[platform as keyof typeof chartData] as ChartSong[]) || [];

    // 각 플랫폼에서 설정된 타이틀곡들 찾기
    const songMap = new Map<string, ChartSong>();
    
    activeSongs.forEach(config => {
      const foundSong = songs.find((song) => 
        song.title && song.title.includes(config.target_song!)
      );
      if (foundSong) {
        songMap.set(config.target_song!, foundSong);
      }
    });

    platformData.push({
      platform,
      songs: songMap,
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

  // 현재 표시할 곡
  const currentConfig = activeSongs[currentSongIndex];
  const currentSongTitle = targetSong || currentConfig?.target_song || "";

  return (
    <Card>
      <CardContent className="p-0">
        {/* 타이틀곡 인디케이터 - targetSong이 없고 곡이 2개 이상일 때만 표시 */}
        {!targetSong && activeSongs.length > 1 && (
          <div className="flex items-center gap-2 pt-3 pb-2 px-4">
            <div className="flex items-center gap-1.5">
              {activeSongs.map((config, index) => (
                <button
                  key={config.id}
                  onClick={() => handleDotClick(index)}
                  className={`rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentSongIndex
                      ? "bg-mint-primary w-4 h-2"
                      : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                  }`}
                  aria-label={`${config.target_song} 보기`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {currentSongTitle}
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
          {platformData.map(({ platform, songs }) => {
            // 현재 곡 찾기
            const currentSong = songs.get(currentSongTitle) || 
                               Array.from(songs.values())[0];

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
                          <div className="flex flex-col justify-center">
                            <p className="font-medium text-sm truncate text-gray-900">
                              {currentSong.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentSong.artist}
                            </p>
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