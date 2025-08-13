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
            </div>
          </TabsContent>

          <TabsContent value="awards" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-yellow-900 mb-2">
                        시상식 투표 안내
                      </h3>
                      <p className="text-sm text-yellow-700">
                        현재 진행 중인 시상식 투표가 있을 때 이곳에 표시됩니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AWARDS.map((award) => (
                  <AwardCard key={award.id} award={award} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
