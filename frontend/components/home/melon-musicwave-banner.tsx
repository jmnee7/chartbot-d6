"use client";

import { ExternalLink } from "lucide-react";

export function MelonMusicwaveBanner() {
  return (
    <div className="w-full">
      <a
        href="https://musicwave.melon.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-colors rounded-lg shadow-md"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">멜론 뮤직웨이브</h3>
              <p className="text-sm opacity-90">실시간 음악 스트리밍 참여하기</p>
            </div>
          </div>
          <ExternalLink className="h-5 w-5 opacity-80" />
        </div>
      </a>
    </div>
  );
}