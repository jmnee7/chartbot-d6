"use client";

import { ExternalLink, Play, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MUSIC_PLATFORMS, MV_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function StreamingPage() {
  const [activeTab, setActiveTab] = useState("music");

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
                  <span className="font-medium">Maybe Tomorrow</span>
                  <Badge variant="secondary" className="text-xs">
                    대표곡
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="bg-mint-primary hover:bg-mint-dark text-white text-xs px-3 py-1 h-7"
                  onClick={() => {
                    // 여러 플랫폼 동시에 열기
                    const urls = [
                      "https://www.melon.com/song/detail.htm?songId=31650949",
                      "https://www.genie.co.kr/detail/songInfo?xgnm=31650949",
                      "https://music.bugs.co.kr/track/20447162",
                      "https://www.youtube.com/watch?v=I1gI9ZCcSJs",
                    ];
                    urls.forEach((url) => window.open(url, "_blank"));
                  }}
                >
                  원클릭 스트리밍
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-mint-primary" />
                  <span className="font-medium">끝났지</span>
                  <Badge variant="secondary" className="text-xs">
                    인기곡
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="bg-mint-primary hover:bg-mint-dark text-white text-xs px-3 py-1 h-7"
                  onClick={() => {
                    const urls = [
                      "https://www.melon.com/song/detail.htm?songId=32841635",
                      "https://www.genie.co.kr/detail/songInfo?xgnm=32841635",
                      "https://music.bugs.co.kr/track/20985432",
                      "https://www.youtube.com/watch?v=RZr3EcLeT_k",
                    ];
                    urls.forEach((url) => window.open(url, "_blank"));
                  }}
                >
                  원클릭 스트리밍
                </Button>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/50 rounded-lg"></div>
          </CardContent>
        </Card>

        <Tabs
          defaultValue="music"
          className="w-full"
          onValueChange={setActiveTab}
        >
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                Official
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

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                끝났지 (game over)
                              </div>
                              <div className="text-xs text-gray-500">
                                Official
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=RZr3EcLeT_k",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">HAPPY</div>
                              <div className="text-xs text-gray-500">
                                Official Audio
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://m.youtube.com/watch?v=2o1zdX72400",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                녹아내려요 (Melt Down)
                              </div>
                              <div className="text-xs text-gray-500">
                                Official
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=bShOVeYi_vg",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                한 페이지가 될 수 있게
                              </div>
                              <div className="text-xs text-gray-500">
                                Time of Our Life
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=-9fC6oDFl5k",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                그녀가 웃었다
                              </div>
                              <div className="text-xs text-gray-500">
                                She Smiled
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=iXEKXoReuA0",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">예뻤어</div>
                              <div className="text-xs text-gray-500">
                                You Were Beautiful
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=BS7tz2rAOSA",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                Welcome to the Show
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
                                "https://www.youtube.com/watch?v=RowlrvmyFEk",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                Congratulations
                              </div>
                              <div className="text-xs text-gray-500">
                                Official
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 h-7"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=siF3GM68IDE",
                                "_blank"
                              )
                            }
                          >
                            <Play className="w-3 h-3 mr-1" />
                            재생
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
