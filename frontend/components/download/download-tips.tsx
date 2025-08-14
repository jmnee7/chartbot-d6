"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export function DownloadTips() {
  return (
    <div className="space-y-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-2">다운로드 팁</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 발매일 0시에 즉시 다운로드하기</li>
                <li>• 전곡 다운로드로 더 많은 차트 점수 획득</li>
                <li>• 멜론, 지니, 벅스 등 주요 플랫폼에서 동시 다운</li>
                <li>• 이용권 구독으로 할인된 가격 이용</li>
                <li>• 선물하기 기능으로 팬들과 함께 응원</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-mint-50 border-mint-200">
        <CardContent className="p-4">
          <div className="text-sm text-mint-dark">
            <div className="font-bold mb-2">💳 주요 플랫폼 이용료</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>• 멜론: 곡당 600원, 이용권 월 10,900원</div>
              <div>• 지니: 곡당 600원, 이용권 월 9,900원</div>
              <div>• 벅스: 곡당 500원, 이용권 월 7,900원</div>
              <div>• 플로: 곡당 600원, 이용권 월 9,900원</div>
            </div>
            <div className="text-xs text-mint-600 mt-2">
              ※ 가격은 변동될 수 있으니 각 플랫폼에서 확인해주세요
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
