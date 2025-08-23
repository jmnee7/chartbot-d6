"use client";

import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MUSIC_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import { motion, AnimatePresence } from "framer-motion";
import { getDeviceLabel } from "@/lib/utils/device-detection";
import { useDeviceAndAppType } from "@/lib/hooks/useDeviceType";

export default function StreamingPage() {
  const { deviceType, appType } = useDeviceAndAppType();
  const deviceLabel = getDeviceLabel(deviceType, appType);

  const handleOneClickStreaming = () => {
    const urls = [
      "https://www.melon.com/album/detail.htm?albumId=11796328",
      "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
      "https://music.bugs.co.kr/album/20724195",
      "https://vibe.naver.com/search?query=DAY6",
      "https://www.music-flo.com/detail/album/437566658/albumtrack",
      "https://www.youtube.com/watch?v=0fyZqS0N19o",
      "https://open.spotify.com/album/2HhzHLoaQWdkvPQjoopUy6",
      "https://music.apple.com/us/album/maybe-tomorrow-single/1810090445",
      "https://stationhead.com/day6strmteam",
    ];
    urls.forEach((url) => window.open(url, "_blank"));
  };

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
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">
                            Maybe Tomorrow
                          </div>
                          <div className="text-xs text-gray-500">
                            Official MV
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white text-xs w-full sm:w-auto"
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
