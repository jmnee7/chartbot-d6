"use client";

import { Music } from "lucide-react";
import Image from "next/image";
import { ChartSong } from "@/lib/types";
import {
  getPlatformColor,
  getPlatformName,
  getRankChangeIcon,
  getRankChangeColor,
  formatKSTDate,
} from "@/lib/utils";

interface ChartTableProps {
  songs: ChartSong[];
  platform: string;
  isLoading?: boolean;
}

function ChartTableSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-16 bg-gray-100 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ platform }: { platform: string }) {
  return (
    <div className="text-center py-12">
      <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        데이터를 불러오는 중
      </h3>
      <p className="text-gray-500">
        {getPlatformName(platform)} 차트 데이터를 가져오고 있습니다.
      </p>
    </div>
  );
}

function SongRow({
  song,
  platform,
  index,
}: {
  song: ChartSong;
  platform: string;
  index: number;
}) {
  return (
    <div
      key={`${song.title}-${song.artist}-${index}`}
      className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
    >
      {/* 순위 */}
      <div className="flex flex-col items-center justify-center w-8 sm:w-12">
        <span
          className={`text-lg sm:text-2xl font-bold ${
            song.rank === null
              ? "text-orange-500"
              : song.rank <= 10
              ? "text-blue-600"
              : song.rank <= 50
              ? "text-gray-900"
              : "text-gray-400"
          }`}
        >
          {song.rank || "—"}
        </span>
        <div
          className={`text-xs font-medium ${
            song.rank === null
              ? "text-orange-600"
              : getRankChangeColor(song.change || 0)
          }`}
        >
          {song.rank === null ? "올려줘" : getRankChangeIcon(song.change || 0)}
        </div>
      </div>

      {/* 앨범 아트 */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
        {song.albumArt ? (
          <Image
            src={song.albumArt}
            alt={`${song.album} 앨범 아트`}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>

      {/* 곡 정보 */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
          {song.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 truncate">
          {song.artist}
        </p>
        <p className="text-xs text-gray-500 truncate hidden sm:block">
          {song.album}
        </p>
      </div>

      {/* 상태 배지 */}
      <div className="flex flex-col items-end gap-1">
        {song.rank === null && (
          <div className="text-right">
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium block">
              우리가 올려줘💪
            </span>
          </div>
        )}
        {song.rank && song.rank <= 100 && (
          <span
            className={`${getPlatformColor(
              platform
            )} text-white px-2 py-1 rounded text-xs font-medium`}
          >
            TOP 100
          </span>
        )}
        <span className="text-xs text-gray-500">
          {song.timestamp && formatKSTDate(song.timestamp)}
        </span>
      </div>
    </div>
  );
}

export function ChartTable({ songs, platform, isLoading }: ChartTableProps) {
  if (isLoading) {
    return <ChartTableSkeleton />;
  }

  if (!songs || songs.length === 0) {
    return <EmptyState platform={platform} />;
  }

  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <SongRow
          key={`${song.title}-${song.artist}-${index}`}
          song={song}
          platform={platform}
          index={index}
        />
      ))}
    </div>
  );
}
