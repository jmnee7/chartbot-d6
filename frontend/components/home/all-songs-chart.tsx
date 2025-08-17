"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { ChartSong, PlatformType } from "@/lib/types";
import { getPlatformName } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export function AllSongsChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-100 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  const platforms: PlatformType[] = [
    "melon_top100",
    "melon_hot100",
    "genie",
    "bugs",
    "vibe",
    "flo",
  ];

  // 모든 플랫폼에서 DAY6 곡들을 수집
  const allSongs: Array<{ song: ChartSong; platform: PlatformType }> = [];

  platforms.forEach((platform) => {
    const songs = (chartData?.[platform] as ChartSong[]) || [];
    songs.forEach((song) => {
      if (song.rank !== null) {
        allSongs.push({ song, platform });
      }
    });
  });

  // 순위별로 정렬
  allSongs.sort((a, b) => (a.song.rank || 999) - (b.song.rank || 999));

  const getPlatformLogo = (platform: PlatformType) => {
    const logos: Record<PlatformType, string> = {
      melon_top100: "/ico_melon.png",
      melon_hot100: "/ico_melon.png",
      genie: "/Geenie.png",
      bugs: "/bucks.png",
      vibe: "/vibe.jpeg",
      flo: "/fillo.png",
    };
    return logos[platform] || "/file.svg";
  };

  if (allSongs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">
            현재 차트에 진입한 DAY6 곡이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[FreeMode, Pagination]}
        spaceBetween={12}
        slidesPerView="auto"
        freeMode={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="!pb-8"
      >
        {allSongs.map(({ song, platform }, index) => (
          <SwiperSlide
            key={`${platform}-${song.title}-${index}`}
            className="!w-auto"
          >
            <Card className="w-64">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {/* 순위 */}
                  <div className="flex flex-col items-center min-w-[40px]">
                    <span className="text-xl font-bold text-gray-900">
                      {song.rank}
                    </span>
                    <span className="text-xs text-gray-400">위</span>
                  </div>

                  {/* 곡 정보 */}
                  <div className="flex-1 min-w-0">
                    {/* 플랫폼 */}
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={getPlatformLogo(platform)}
                        alt={getPlatformName(platform)}
                        width={16}
                        height={16}
                        className="rounded-sm object-cover"
                      />
                      <span className="text-xs font-medium text-gray-600">
                        {getPlatformName(platform)}
                      </span>
                    </div>

                    {/* 곡명/아티스트 */}
                    <p className="font-medium text-sm text-gray-900 truncate mb-1">
                      {song.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {song.artist}
                    </p>

                    {/* 순위 변화 */}
                    {song.change !== undefined && song.change !== 0 && (
                      <div className="mt-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            song.change > 0
                              ? "text-red-600 border-red-200"
                              : "text-green-600 border-green-200"
                          }`}
                        >
                          {song.change > 0
                            ? `▼${song.change}`
                            : `▲${Math.abs(song.change)}`}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
