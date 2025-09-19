"use client";

import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MUSIC_PLATFORMS, FEATURED_MVS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function StreamingPage() {
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
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

                {/* 스트리밍 리스트 이미지 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="relative w-full">
                      <Image
                        src="/streaming/10th_anniversary.jpg"
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
                  <CardContent className="p-4 space-y-3">
                    {FEATURED_MVS.map((mv) => (
                      <div
                        key={mv.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {mv.thumbnail ? (
                            <div className="relative w-20 h-12 flex-shrink-0 rounded overflow-hidden">
                              <Image
                                src={mv.thumbnail}
                                alt={mv.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <Play className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                          )}
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
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      <div className="h-20 md:h-8"></div>
    </div>
  );
}
