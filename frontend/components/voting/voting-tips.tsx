"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function VotingTips() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">투표 팁</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 매일 꾸준히 투표하기</li>
              <li>• 투표 시간 알람 설정하기</li>
              <li>• 여러 계정 활용하기 (앱별 정책 확인)</li>
              <li>• 투표 인증 이벤트 참여하기</li>
              <li>• 팬덤과 함께 조직 투표 참여</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
