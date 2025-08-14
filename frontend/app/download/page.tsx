"use client";

import { Music, Video, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DOWNLOAD_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";

export default function DownloadPage() {
  return (
    <div>
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              다운로드
            </h2>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-blue-600 hover:text-blue-700 p-0"
            onClick={() => window.open("/guide", "_blank")}
          >
            가이드 <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
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
              {/* Mobile Divider */}

              {/* Featured Download Section */}
              <Card className="bg-gradient-to-r from-mint-primary/10 to-mint-light/5 border-mint-primary/30">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-mint-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-mint-primary rounded-lg flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              Maybe Tomorrow
                            </div>
                            <div className="text-xs text-gray-500">대표곡</div>
                          </div>
                        </div>
                        <button
                          className="bg-mint-primary hover:bg-mint-dark text-white text-xs px-3 py-1 h-7 rounded"
                          onClick={() => {
                            const urls = [
                              "https://www.melon.com/search/total/index.htm?q=Day6+Maybe+Tomorrow&section=&mwkLogType=T",
                              "https://www.genie.co.kr/search/searchMain?query=day6+maybe+tomorrow",
                              "https://music.bugs.co.kr/search/track?q=day6+maybe+tomorrow",
                            ];
                            urls.forEach((url) => window.open(url, "_blank"));
                          }}
                        >
                          원클릭 다운
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-mint-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-mint-primary rounded-lg flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              끝났지 (game over)
                            </div>
                            <div className="text-xs text-gray-500">인기곡</div>
                          </div>
                        </div>
                        <button
                          className="bg-mint-primary hover:bg-mint-dark text-white text-xs px-3 py-1 h-7 rounded"
                          onClick={() => {
                            const urls = [
                              "https://www.melon.com/search/total/index.htm?q=Day6+끝났지&section=&mwkLogType=T",
                              "https://www.genie.co.kr/search/searchMain?query=day6+끝났지",
                              "https://music.bugs.co.kr/search/track?q=day6+끝났지",
                            ];
                            urls.forEach((url) => window.open(url, "_blank"));
                          }}
                        >
                          원클릭 다운
                        </button>
                      </div>
                    </div>
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

              {/* Mobile Divider */}
              <div
                className="md:hidden -mx-9"
                style={{ borderBottom: "0.6rem solid #f7f8f9" }}
              ></div>

              <Card className="bg-gradient-to-r from-mint-50 to-mint-100/50 border-mint-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold  mb-2">추천 다운로드 사이트</h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-mint-100 mt-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mint-primary rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">DAY6.kr</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-mint-primary hover:bg-mint-dark text-white"
                      onClick={() => window.open("https://day6.kr/", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      방문하기
                    </Button>
                  </div>
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
