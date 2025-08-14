"use client";

import {
  ExternalLink,
  Play,
  Volume2,
  Target,
  Music,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <p className="text-xs md:text-sm text-gray-500">
              DAY6 음원 및 뮤직비디오 스트리밍
            </p>
          </div>
          <div className="text-gray-300"></div>
        </div>

        {/* 오늘의 스트리밍 목표 */}
        <Card className="bg-gradient-to-r from-mint-primary/10 to-mint-light/5 border-mint-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-mint-dark">
              <Target className="w-5 h-5" />
              오늘의 스트리밍 목표
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
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
            <div className="mt-4 p-3 bg-white/50 rounded-lg">
              <p className="text-sm text-mint-dark flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <strong>오늘의 목표:</strong> 각 플랫폼에서 30분씩 스트리밍하기
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 가이드 안내 카드 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📖</span>
                </div>
                <div>
                  <div className="font-medium text-blue-900">
                    스트리밍 가이드
                  </div>
                  <div className="text-sm text-blue-700">
                    효과적인 스트리밍 방법을 확인하세요
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => window.open("/guide", "_blank")}
              >
                가이드 보기
              </Button>
            </div>
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

                {/* 스트리밍 가이드 이미지 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Volume2 className="w-5 h-5" />
                      음원차트 공략 스트리밍 가이드
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
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
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      📊 공식 팬사이트 제공 스트리밍 가이드
                    </p>
                  </CardContent>
                </Card>

                {/* 추천 음원 스트리밍 리소스 */}
                <Card className="bg-gradient-to-r from-mint-50 to-mint-100/50 border-mint-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-mint-dark">
                      <Music className="w-5 h-5" />
                      추천 스트리밍 사이트
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-mint-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-mint-primary rounded-lg flex items-center justify-center">
                          <Music className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            DAY6.kr
                          </div>
                          <div className="text-sm text-gray-500">
                            플레이리스트 & 디스코그래피
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

                <Card className="bg-gradient-to-r from-[var(--mint-primary)]/10 to-[var(--mint-light)]/5 border-[var(--mint-primary)]/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--mint-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                        <Volume2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--mint-dark)] mb-2">
                          추가 스트리밍 팁
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
                {/* DAY6 최신 뮤직비디오 */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Play className="w-5 h-5" />
                      DAY6 최신 뮤직비디오
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
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
                            <div className="text-sm text-gray-500">
                              4th Full Album • 2025.09.05 발매
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

                {/* JYP 공식 YouTube 채널 */}
                <Card className="bg-gradient-to-r from-red-50 to-red-100/50 border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <Play className="w-5 h-5" />
                      JYP Entertainment 공식 채널
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            DAY6 모든 뮤직비디오
                          </div>
                          <div className="text-sm text-gray-500">
                            JYP Entertainment Official
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
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      <div className="h-20 md:h-8"></div>
    </div>
  );
}
