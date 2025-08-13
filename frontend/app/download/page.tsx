"use client";

import { Download, Music, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DOWNLOAD_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import { DownloadTips } from "@/components/download/download-tips";

export default function DownloadPage() {
  return (
    <div>
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              다운로드
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6 음원 다운로드로 응원하기
            </p>
          </div>
          <div className="text-gray-300"></div>
        </div>

        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              음원 다운로드
            </TabsTrigger>
            <TabsTrigger value="mv" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              MV 다운로드
            </TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DOWNLOAD_PLATFORMS.map((platform) => (
                      <PlatformCard
                        key={platform.id}
                        platform={platform}
                        variant="grid"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <DownloadTips />

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-purple-900 mb-3">
                    음원 다운로드가 중요한 이유
                  </h3>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• 음원차트 순위 반영 (다운로드 지수)</li>
                    <li>• 음악방송 1위 점수에 포함</li>
                    <li>• 발매 첫 주 다운로드가 특히 중요</li>
                    <li>• 연말 시상식 디지털 음원 부문 수상 기준</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mv" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                    <Video className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    MV 다운로드 안내
                  </h3>
                  <p className="text-sm text-gray-600">
                    멜론, 벅스 등 일부 플랫폼에서 MV 다운로드가 가능합니다.
                    <br />
                    플랫폼별 이용권이 필요할 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-red-900 mb-2">
                    MV 다운로드 팁
                  </h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• MV 다운로드는 음원차트에 영향 없음</li>
                    <li>• 오프라인 감상용으로 활용</li>
                    <li>• 고화질 버전 다운로드 추천</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20 md:h-8"></div>
    </div>
  );
}
