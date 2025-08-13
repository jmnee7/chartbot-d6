"use client";

import { ExternalLink, Play, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MUSIC_PLATFORMS, MV_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";

export default function StreamingPage() {
  return (
    <div>
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              스트리밍
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6 음원 및 뮤직비디오 스트리밍
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">음원 스트리밍</TabsTrigger>
            <TabsTrigger value="mv">MV 스트리밍</TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {MUSIC_PLATFORMS.map((platform) => (
                      <PlatformCard
                        key={platform.id}
                        platform={platform}
                        variant="grid"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-[var(--mint-primary)]/10 to-[var(--mint-light)]/5 border-[var(--mint-primary)]/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[var(--mint-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Volume2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--mint-dark)] mb-2">
                        음원 스트리밍 팁
                      </h3>
                      <ul className="text-sm text-[var(--mint-dark)] space-y-1">
                        <li>• 30초 이상 재생하기</li>
                        <li>• 다양한 곡 섞어 듣기</li>
                        <li>• 적절한 간격 유지하기</li>
                        <li>• 로봇 재생 패턴 피하기</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mv" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
                    {MV_PLATFORMS.map((platform) => (
                      <PlatformCard
                        key={platform.id}
                        platform={platform}
                        variant="grid"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[var(--mint-light)]/10 to-[var(--navy-dark)]/5 border-[var(--navy-dark)]/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[var(--mint-primary)] to-[var(--navy-dark)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--navy-dark)] mb-2">
                        YouTube 스트리밍 팁
                      </h3>
                      <ul className="text-sm text-[var(--navy-dark)] space-y-1">
                        <li>• 음소거 금지, 최소 음량으로 설정</li>
                        <li>• 영상 끝까지 시청하기</li>
                        <li>• 좋아요 & 댓글 남기기</li>
                        <li>• 다른 영상들도 함께 시청</li>
                      </ul>
                    </div>
                  </div>
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
