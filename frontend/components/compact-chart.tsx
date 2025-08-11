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

export function CompactChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

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

  const platforms = ["melon", "genie", "bugs", "vibe", "flo"];
  const platformData: { platform: string; song: ChartSong | null }[] = [];

  // DAY6 타겟 곡 정보
  const targetSongs = chartData?.tracks || [];
  const primaryTargetSong = targetSongs[0]; // "Maybe Tomorrow" 등

  platforms.forEach((platform) => {
    const songs =
      (chartData?.[platform as keyof typeof chartData] as ChartSong[]) || [];
    let topSong = songs.length > 0 ? songs[0] : null;

    // 차트에 곡이 없으면 타겟 곡 정보를 사용 (차트아웃 상태)
    if (!topSong && primaryTargetSong) {
      topSong = {
        title: primaryTargetSong.title,
        artist: chartData?.artist || "DAY6",
        album: primaryTargetSong.album,
        rank: null, // 차트아웃
        change: 0,
        timestamp: "",
      } as ChartSong;
    }

    platformData.push({ platform, song: topSong });
  });

  const getPlatformLogo = (platform: string) => {
    const logos: Record<string, string> = {
      melon: "/ico_melon.png",
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
        <div className="grid grid-cols-2 gap-2">
          {platformData.slice(0, 6).map(({ platform, song }) => (
            <div
              key={platform}
              className="bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
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
                      song.change
                    )}`}
                  >
                    {getRankChangeIcon(song.change)}
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
                        {song.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {song.artist}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-sm text-orange-600">
                        우리가 올려줘💪
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {song?.title || "DAY6"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
