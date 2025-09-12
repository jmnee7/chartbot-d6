"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
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

export function CompactChart({ targetSong }: CompactChartProps = {}) {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  const [showFirstSong, setShowFirstSong] = useState(true);
  const [isManualMode, setIsManualMode] = useState(false);

  // 5초마다 곡 전환 (targetSong이 없고, 수동 모드가 아닐 때만)
  useEffect(() => {
    if (!targetSong && !isManualMode) {
      const interval = setInterval(() => {
        setShowFirstSong((prev) => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [targetSong, isManualMode]);

  // 인디케이터 클릭 핸들러
  const handleDotClick = (isFirst: boolean) => {
    setShowFirstSong(isFirst);
    setIsManualMode(true);
    // 10초 후 자동 모드로 복귀
    setTimeout(() => {
      setIsManualMode(false);
    }, 10000);
  };

  if (isLoading) {
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
    dreamBusSong: ChartSong | null;
    insideOutSong: ChartSong | null;
  }[] = [];

  platforms.forEach((platform) => {
    const songs =
      (chartData?.[platform as keyof typeof chartData] as ChartSong[]) || [];

    // 각 플랫폼에서 두 타이틀곡 모두 찾기
    const dreamBusSong = songs.find(
      (song) => song.title && song.title.includes("꿈의 버스")
    );
    const insideOutSong = songs.find(
      (song) => song.title && song.title.includes("INSIDE OUT")
    );

    platformData.push({
      platform,
      dreamBusSong: dreamBusSong || null,
      insideOutSong: insideOutSong || null,
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
    <Card>
      <CardContent className="p-0">
        {/* 타이틀곡 인디케이터 - targetSong이 없을 때만 표시 */}
        {!targetSong && (
          <div className="flex items-center gap-2 pt-3 pb-2 px-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleDotClick(false)}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  !showFirstSong
                    ? "bg-mint-primary w-4 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label="INSIDE OUT 보기"
              />
              <button
                onClick={() => handleDotClick(true)}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  showFirstSong
                    ? "bg-mint-primary w-4 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
                aria-label="꿈의 버스 보기"
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {showFirstSong ? "꿈의 버스" : "INSIDE OUT"}
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
          {platformData.map(({ platform, dreamBusSong, insideOutSong }) => {
            // targetSong이 지정된 경우 해당 곡만 표시
            let currentSong = null;
            if (targetSong === "꿈의 버스") {
              currentSong = dreamBusSong;
            } else if (targetSong === "INSIDE OUT") {
              currentSong = insideOutSong;
            } else {
              // targetSong이 없으면 롤링으로 표시
              currentSong = showFirstSong ? dreamBusSong : insideOutSong;
              // 둘 중 하나가 없으면 있는 것을 표시
              if (!currentSong) {
                currentSong = dreamBusSong || insideOutSong;
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
                          {/* 꿈의 버스 */}
                          <div
                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                              !targetSong && !isManualMode
                                ? showFirstSong
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                                : targetSong === "꿈의 버스" ||
                                    (dreamBusSong && !insideOutSong)
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                            }`}
                          >
                            {dreamBusSong && (
                              <>
                                <p className="font-medium text-sm truncate text-gray-900">
                                  {dreamBusSong.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {dreamBusSong.artist}
                                </p>
                              </>
                            )}
                          </div>

                          {/* INSIDE OUT */}
                          <div
                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                              !targetSong && !isManualMode
                                ? !showFirstSong
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                                : targetSong === "INSIDE OUT" ||
                                    (!dreamBusSong && insideOutSong)
                                  ? "transform translate-y-0 opacity-100"
                                  : "transform -translate-y-6 opacity-0"
                            }`}
                          >
                            {insideOutSong && (
                              <>
                                <p className="font-medium text-sm truncate text-gray-900">
                                  {insideOutSong.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {insideOutSong.artist}
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
