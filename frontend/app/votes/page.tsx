"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { MUSIC_SHOWS } from "@/lib/constants/music-shows";
import { AWARDS } from "@/lib/constants/awards";
import { MusicShowCard } from "@/components/voting/music-show-card";
import { AwardCard } from "@/components/voting/award-card";
import { VotingTips } from "@/components/voting/voting-tips";

export default function VotesPage() {
  return (
    <div className="min-h-screen pb-24">
      <PageHeader title="투표" description="DAY6의 1위를 위해 투표해주세요" />

      <div className="px-4 md:px-6 lg:px-8 space-y-6">
        <Tabs defaultValue="music-shows" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music-shows">음악방송</TabsTrigger>
            <TabsTrigger value="awards">시상식</TabsTrigger>
          </TabsList>

          <TabsContent value="music-shows" className="mt-6">
            <div className="space-y-6">
              <VotingTips />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MUSIC_SHOWS.map((show) => (
                  <MusicShowCard key={show.id} show={show} />
                ))}
              </div>

              {/* DAY6 투표독려팀 */}
              <Card className="bg-gradient-to-r from-mint-50 to-mint-100/50 border-mint-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mint-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">📊</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          DAY6 투표독려팀
                        </div>
                        <div className="text-sm text-gray-500">
                          투표 가이드 및 독려 정보
                        </div>
                      </div>
                    </div>
                    <button
                      className="bg-mint-primary hover:bg-mint-dark text-white px-4 py-2 rounded text-sm font-medium"
                      onClick={() =>
                        window.open("https://x.com/Day6_vote_team", "_blank")
                      }
                    >
                      팔로우하기
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="awards" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    시상식 투표 준비 중입니다
                  </h3>
                  <p className="text-sm text-gray-600">
                    연말 시상식 시즌에 맞춰 투표 정보를 준비하고 있습니다.
                    <br />
                    투표가 오픈되면 바로 안내해드릴게요!
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
