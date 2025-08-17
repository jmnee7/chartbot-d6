"use client";

import { ExternalLink, Play, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MUSIC_PLATFORMS,
  OTHER_MUSIC_PLATFORMS,
  MV_PLATFORMS,
} from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  getBestStreamingLink,
  getDeviceLabel,
} from "@/lib/utils/device-detection";
import { useDeviceAndAppType } from "@/lib/hooks/useDeviceType";

// const streamingPlatforms = [
//   {
//     name: "멜론",
//     url: "https://www.melon.com/album/detail.htm?albumId=11796328",
//     color: "bg-green-500",
//   },
//   {
//     name: "지니",
//     url: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
//     color: "bg-blue-500",
//   },
//   {
//     name: "벅스",
//     url: "https://music.bugs.co.kr/album/20724195",
//     color: "bg-red-500",
//   },
//   {
//     name: "플로",
//     url: "http://bit.ly/4iNKK4I",
//     color: "bg-purple-500",
//   },
//   {
//     name: "유튜브",
//     url: "https://www.youtube.com/watch?v=0fyZqS0N19o",
//     color: "bg-red-600",
//   },
//   {
//     name: "애플뮤직",
//     url: "https://music.apple.com/us/album/maybe-tomorrow-single/1810090445",
//     color: "bg-gray-800",
//   },
//   {
//     name: "스포티파이",
//     url: "https://open.spotify.com/album/2HhzHLoaQWdkvPQjoopUy6",
//     color: "bg-green-600",
//   },
//   {
//     name: "스테이션헤드",
//     url: "https://stationhead.com/day6strmteam",
//     color: "bg-indigo-500",
//   },
// ];

export default function StreamingPage() {
  const { deviceType, appType } = useDeviceAndAppType();
  const deviceLabel = getDeviceLabel(deviceType, appType);

  const handleOneClickStreaming = () => {
    // 각 플랫폼에 대해 최적의 링크 열기
    MUSIC_PLATFORMS.forEach((platform) => {
      const bestLink = getBestStreamingLink(
        platform.id,
        platform.urls,
        platform.url
      );
      if (bestLink) {
        window.open(bestLink, "_blank");
      }
    });
  };

  return (
    <div>
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              스트리밍
            </h2>
          </div>
          <div className="text-gray-300"></div>
        </div>

        <Card className="bg-gradient-to-r from-mint-primary/10 to-mint-light/5 border-mint-primary/30">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-mint-primary" />
                  <span className="font-medium">원클릭 스트리밍</span>
                  <Badge variant="secondary" className="text-xs">
                    {deviceLabel}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="bg-mint-primary hover:bg-mint-dark text-white text-xs px-3 py-1 h-7"
                  onClick={handleOneClickStreaming}
                >
                  원클릭 스트리밍
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Divider */}
        <div
          className="md:hidden -mx-9"
          style={{ borderBottom: "0.6rem solid #f7f8f9" }}
        ></div>

        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">음원 스트리밍</TabsTrigger>
            <TabsTrigger value="mv">MV 스트리밍</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="music" className="mt-6">
              <motion.div
                key="music"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-4">
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

                {/* 기타 음악 플랫폼 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      기타 플랫폼
                    </h3>
                    <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                      {OTHER_MUSIC_PLATFORMS.map((platform) => (
                        <PlatformCard
                          key={platform.id}
                          platform={platform}
                          variant="grid"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src="/streaming/streaming.jpeg"
                        alt="DAY6 음원차트 공략 스트리밍 가이드"
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
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

                <Card className="bg-gradient-to-r from-mint-50 to-mint-100/50 border-mint-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-mint-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-mint-primary rounded-lg flex items-center justify-center">
                          <Music className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            DAY6.kr
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-mint-primary hover:bg-mint-dark text-white"
                        onClick={() =>
                          window.open("https://day6.kr/", "_blank")
                        }
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        방문하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="mv" className="mt-6">
              <motion.div
                key="mv"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border-2 border-mint-primary/30 bg-mint-primary/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-mint-primary to-mint-dark rounded-lg flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              The DECADE Trailer Film
                              <Badge
                                variant="secondary"
                                className="text-xs bg-mint-primary text-white"
                              >
                                NEW
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-mint-primary hover:bg-mint-dark text-white"
                          onClick={() =>
                            window.open(
                              "https://www.youtube.com/watch?v=0zdkvGDDnQg",
                              "_blank"
                            )
                          }
                        >
                          <Play className="w-4 h-4 mr-1" />
                          시청하기
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              Maybe Tomorrow
                            </div>
                            <div className="text-xs text-gray-500">
                              Official MV
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                          onClick={() =>
                            window.open(
                              "https://www.youtube.com/watch?v=I1gI9ZCcSJs",
                              "_blank"
                            )
                          }
                        >
                          <Play className="w-3 h-3 mr-1" />
                          재생
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Divider */}
                <div
                  className="md:hidden -mx-9"
                  style={{ borderBottom: "0.6rem solid #f7f8f9" }}
                ></div>

                <Card className="bg-gradient-to-r from-red-50 to-red-100/50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            DAY6 모든 뮤직비디오
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() =>
                          window.open(
                            "https://www.youtube.com/jypentertainment",
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        채널 방문
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Divider */}
                <div
                  className="md:hidden -mx-9"
                  style={{ borderBottom: "0.6rem solid #f7f8f9" }}
                ></div>

                <Card>
                  <CardContent className="p-4">
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
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      <div className="h-20 md:h-8"></div>
    </div>
  );
}
