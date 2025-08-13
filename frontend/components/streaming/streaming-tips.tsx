"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Play, Volume2 } from "lucide-react";

export function StreamingTips() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💡</span>
          스트리밍 가이드
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          효과적인 스트리밍을 위한 팁들
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-red-50 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    YouTube 스트리밍
                  </h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 음소거 금지, 최소 음량으로</div>
                    <div>• 끝까지 시청하기</div>
                    <div>• 좋아요 & 댓글 남기기</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-green-50 rounded-lg flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    음원 플랫폼
                  </h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 30초 이상 재생</div>
                    <div>• 다양한 곡 섞어 듣기</div>
                    <div>• 적절한 간격 유지</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-64 flex-shrink-0 border-red-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-red-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 text-sm">주의사항</h3>
                  <div className="mt-2 text-xs text-red-600 space-y-1">
                    <div>• 로봇 재생 패턴 금지</div>
                    <div>• 다중 계정 동시 재생 금지</div>
                    <div>• 스트리밍 프로그램 금지</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
