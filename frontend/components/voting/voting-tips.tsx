"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function VotingTips() {
  return (
    <div className="space-y-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-2">
                음악방송 투표 가이드
              </h3>
              <div className="text-sm text-blue-700 space-y-2">
                <div>
                  <strong>시작 앱 추천:</strong> Mnet Plus, IDOL CHAMP, Mubeat
                </div>
                <div>
                  <strong>투표 화폐:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• STAR PLANET: Jelly (100 Jelly = 1표)</li>
                    <li>• IDOL CHAMP: Chamsim(❤️/💙) → 티켓 교환</li>
                    <li>• Mubeat: Heart/Star Beats → 투표</li>
                  </ul>
                </div>
                <div>
                  <strong>투표 제한:</strong> IDOL CHAMP 최대 300회/일, Mubeat
                  무제한
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-mint-50 border-mint-200">
        <CardContent className="p-4">
          <div className="text-sm text-mint-dark">
            <div className="font-bold mb-2">🗓️ 주요 투표 스케줄</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>• 더쇼: 일요일 오후 ~ 월요일 오후</div>
              <div>• 쇼챔피언: 월요일 ~ 화요일</div>
              <div>• 엠카운트다운: 금요일 ~ 월요일</div>
              <div>• 뮤직뱅크: 월요일 ~ 수요일</div>
              <div>• 쇼! 음악중심: 화요일 ~ 금요일</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
