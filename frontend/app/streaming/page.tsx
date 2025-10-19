"use client";

import { Play, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MUSIC_PLATFORMS, FEATURED_MVS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import { StreamingLinkEditModal } from "@/components/admin/streaming-link-edit-modal";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { usePlatformLinks } from "@/lib/api/platform-links";
import Image from "next/image";

export default function StreamingPage() {
  const { isAdminMode } = useAdminMode();
  const { data: platformLinks } = usePlatformLinks();


  // 항상 모든 플랫폼을 표시하되, PlatformCard에서 DB 데이터 유무에 따라 처리
  const platformsToShow = MUSIC_PLATFORMS;

  return (
    <div>
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              원클릭 담기 / 스트리밍 리스트
            </h2>
          </div>
          <div className="text-gray-300"></div>
        </div>

        {/* Mobile Divider */}

        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">음원 스트리밍</TabsTrigger>
            <TabsTrigger value="mv">MV 스트리밍</TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {platformsToShow.map((platform) => (
                      <PlatformCard
                        key={platform.id}
                        platform={platform}
                        variant="grid"
                        platformLinks={platformLinks}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 스트리밍 리스트 이미지 */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative w-full">
                    <Image
                      src="/streaming/streaming-list.png"
                      alt="스트리밍 리스트"
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Divider */}
              <div
                className="md:hidden -mx-9"
                style={{ borderBottom: "0.6rem solid #f7f8f9" }}
              ></div>
            </div>
          </TabsContent>

          <TabsContent value="mv" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4 space-y-3">
                  {FEATURED_MVS.map((mv) => (
                    <div
                      key={mv.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">
                            {mv.title}
                          </div>
                          {mv.subtitle && (
                            <div className="text-xs text-gray-500">
                              {mv.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white text-xs w-full sm:w-auto"
                        onClick={() => window.open(mv.youtubeUrl, "_blank")}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        재생
                      </Button>
                    </div>
                  ))}
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
