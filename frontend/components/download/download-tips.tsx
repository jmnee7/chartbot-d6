"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export function DownloadTips() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Download className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">다운로드 팁</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 발매일 0시에 다운로드하기</li>
              <li>• 전곡 다운로드로 더 많은 포인트 획득</li>
              <li>• 이용권 구독으로 할인받기</li>
              <li>• 선물하기 기능 활용하기</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
