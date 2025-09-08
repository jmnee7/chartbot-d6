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
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useState, useEffect } from "react";

interface CompactChartProps {
  targetSong?: string;
  title?: string;
}

export function CompactChart({ targetSong, title }: CompactChartProps = {}) {
  const { data: chartData, isLoading, error } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });
  
  const [showFirstSong, setShowFirstSong] = useState(true);
  const [isManualMode, setIsManualMode] = useState(false);

  // 5초마다 곡 전환 (targetSong이 없고, 수동 모드가 아닐 때만)
  useEffect(() => {
    if (!targetSong && !isManualMode) {
      const interval = setInterval(() => {
        setShowFirstSong(prev => !prev);
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
  const platformData: { platform: string; song: ChartSong | null }[] = [];

  platforms.forEach((platform) => {
    const songs =
      (chartData?.[platform as keyof typeof chartData] as ChartSong[]) || [];

    if (songs.length > 0) {
      // targetSong이 지정된 경우 해당 곡만 찾기
      let targetSongData = null;

      if (targetSong === "INSIDE OUT") {
        targetSongData = songs.find(
          (song) => song.title && song.title.includes("INSIDE OUT")
        );
      } else if (targetSong === "꿈의 버스") {
        targetSongData = songs.find(
          (song) => song.title && song.title.includes("꿈의 버스")
        );
      } else {
        // targetSong이 없으면 3초마다 전환
        const insideOutSong = songs.find(
          (song) => song.title && song.title.includes("INSIDE OUT")
        );
        const dreamBusSong = songs.find(
          (song) => song.title && song.title.includes("꿈의 버스")
        );
        // showFirstSong 상태에 따라 표시할 곡 선택
        targetSongData = showFirstSong ? dreamBusSong : insideOutSong;
        // 둘 다 없으면 있는 것을 표시
        if (!targetSongData) {
          targetSongData = insideOutSong || dreamBusSong;
        }
      }

      if (targetSongData) {
        platformData.push({ platform, song: targetSongData });
      } else {
        // 타겟 곡이 없으면 차트아웃 상태 표시
        platformData.push({
          platform,
          song: {
            title: "차트아웃",
            artist: "DAY6",
            album: "",
            rank: null,
            change: 0,
            timestamp: "",
          } as ChartSong,
        });
      }
    } else {
      // 차트에 곡이 없으면 차트아웃 상태 표시
      platformData.push({
        platform,
        song: {
          title: "차트아웃",
          artist: "DAY6",
          album: "",
          rank: null,
          change: 0,
          timestamp: "",
        } as ChartSong,
      });
    }
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
                    ? 'bg-mint-primary w-4 h-2' 
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
                aria-label="INSIDE OUT 보기"
              />
              <button
                onClick={() => handleDotClick(true)}
                className={`rounded-full transition-all duration-300 hover:scale-110 ${
                  showFirstSong 
                    ? 'bg-mint-primary w-4 h-2' 
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
                aria-label="꿈의 버스 보기"
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {showFirstSong ? '꿈의 버스' : 'INSIDE OUT'}
            </span>
          </div>
        )}
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={2}
          spaceBetween={8}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
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
          {platformData.map(({ platform, song }) => (
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
                  {song?.change !== undefined && (
                    <div
                      className={`text-xs font-medium ${getRankChangeColor(
                        song.change ?? 0
                      )}`}
                    >
                      {getRankChangeIcon(song.change ?? 0)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div
                      className={`text-xl font-bold ${
                        song?.rank ? "text-gray-900" : "text-orange-500"
                      }`}
                    >
                      {song?.rank || "-"}
                    </div>
                    <div className="text-xs text-gray-400">위</div>
                  </div>
                  <div className="flex-1 min-w-0 text-center">
                    {song?.rank ? (
                      <>
                        <p className="font-medium text-sm truncate text-gray-900">
                          {targetSong || song.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {song.artist}
                        </p>
                      </>
                    ) : (
                      <p className="font-medium text-sm text-orange-600">❌</p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CardContent>
    </Card>
  );
}
