"use client";

import { Radio, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";

export function QuickLinksBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* 라디오 신청 */}
      <Link
        href="/guide?category=voting"
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-colors rounded-lg shadow-md text-white"
      >
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Radio className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold">라디오 신청</h3>
          <p className="text-sm opacity-90">DAY6 라디오 신청하기</p>
        </div>
        <ExternalLink className="h-4 w-4 opacity-80" />
      </Link>

      {/* 음중 문자 투표 */}
      <Link
        href="/streaming"
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors rounded-lg shadow-md text-white"
      >
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold">음중 문자 투표</h3>
          <p className="text-sm opacity-90">음악중심 투표 참여</p>
        </div>
        <ExternalLink className="h-4 w-4 opacity-80" />
      </Link>
    </div>
  );
}
