"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Volume2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { GUIDE_CATEGORIES } from "@/content/guide.config";
import Link from "next/link";
import Image from "next/image";

// 스트리밍 관련 가이드 카테고리들 필터링
const streamingGuides = {
  "streaming-list": GUIDE_CATEGORIES.filter((c) => c.subcategory === "streaming-list"),
  "music-streaming": GUIDE_CATEGORIES.filter((c) => c.subcategory === "music-streaming"),
  "mv-streaming": GUIDE_CATEGORIES.filter((c) => c.subcategory === "mv-streaming"),
};

// 플랫폼 데이터 정의
const STREAMING_PLATFORMS = {
  music: [
    { 
      id: "melon", 
      name: "멜론", 
      logo: "/ico_melon.png", 
      url: "https://www.melon.com/artist/timeline.htm?artistId=261143",
      color: "bg-green-500"
    },
    { 
      id: "genie", 
      name: "지니", 
      logo: "/Geenie.png", 
      url: "https://www.genie.co.kr/detail/artistInfo?xxartistId=80240",
      color: "bg-blue-500"
    },
    { 
      id: "bugs", 
      name: "벅스", 
      logo: "/bucks.png", 
      url: "https://music.bugs.co.kr/artist/80086",
      color: "bg-red-500"
    },
    { 
      id: "vibe", 
      name: "바이브", 
      logo: "/vibe.jpeg", 
      url: "https://vibe.naver.com/artist/12055",
      color: "bg-purple-500"
    },
    { 
      id: "flo", 
      name: "플로", 
      logo: "/fillo.png", 
      url: "https://www.music-flo.com/detail/artist/eyunnqoyqx",
      color: "bg-orange-500"
    },
    { 
      id: "youtube-music", 
      name: "유튜브뮤직", 
      logo: "/file.svg", 
      url: "https://music.youtube.com/channel/UCp-pqXsizklX3ZHvLxXyhxw",
      color: "bg-red-600"
    },
    { 
      id: "apple-music", 
      name: "애플뮤직", 
      logo: "/file.svg", 
      url: "https://music.apple.com/kr/artist/day6/1039275369",
      color: "bg-gray-800"
    },
    { 
      id: "spotify", 
      name: "스포티파이", 
      logo: "/file.svg", 
      url: "https://open.spotify.com/artist/5TnQc2N1iKlFjYD7CPGvFc",
      color: "bg-green-600"
    },
  ],
  mv: [
    { 
      id: "youtube", 
      name: "유튜브", 
      logo: "/file.svg", 
      url: "https://www.youtube.com/@day6official",
      color: "bg-red-600"
    },
  ]
};

const getPlatformLogo = (platform: string) => {
  const logos: Record<string, string> = {
    melon: "/ico_melon.png",
    genie: "/Geenie.png", 
    bugs: "/bucks.png",
    vibe: "/vibe.jpeg",
    flo: "/fillo.png",
    "apple-music": "/file.svg",
    spotify: "/file.svg",
    "youtube-music": "/file.svg",
    youtube: "/file.svg",
  };
  return logos[platform] || "/file.svg";
};

// 플랫폼 카드 컴포넌트
function PlatformCard({ platform }: { platform: typeof STREAMING_PLATFORMS.music[0] }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* 플랫폼 로고/아이콘 영역 */}
            <div className={`w-full h-16 ${platform.color} rounded-lg flex items-center justify-center`}>
              {platform.logo !== "/file.svg" ? (
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain filter brightness-0 invert"
                />
              ) : (
                <div className="text-2xl text-white">
                  {platform.id.includes('youtube') ? '📺' : '🎵'}
                </div>
              )}
            </div>

            {/* 플랫폼 정보 */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm">
                {platform.name}
              </h3>
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <ExternalLink className="w-3 h-3 mr-1" />
                <span>바로 스트리밍</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

// 카테고리별 섹션 컴포넌트
function StreamingCategorySection({
  categoryKey,
  items,
  title,
  description,
  icon,
}: {
  categoryKey: string;
  items: typeof GUIDE_CATEGORIES;
  title: string;
  description: string;
  icon: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      {/* 가로 스크롤 카드 컨테이너 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {items.map((item) => (
            <Link key={item.slug} href={`/guide/${item.slug}`}>
              <Card className="w-40 flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* 플랫폼 로고/아이콘 영역 */}
                    <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      {getPlatformLogo(item.slug) !== "/file.svg" ? (
                        <Image
                          src={getPlatformLogo(item.slug)}
                          alt={item.label}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="text-2xl">
                          {categoryKey === "music-streaming" ? "🎵" : "📺"}
                        </div>
                      )}
                    </div>

                    {/* 제목 및 설명 */}
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">
                        {item.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {categoryKey === "streaming-list"
                          ? "전체 스트리밍 플랫폼"
                          : categoryKey === "music-streaming"
                          ? `${item.label}에서 스트리밍`
                          : `${item.label} 뮤직비디오`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StreamingTipsSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💡</span>
          스트리밍 가이드
        </h2>
        <p className="text-sm text-gray-600 mt-1">효과적인 스트리밍을 위한 팁들</p>
      </div>

      {/* 가로 스크롤 팁 카드 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {/* YouTube 팁 카드 */}
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-red-50 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">YouTube 스트리밍</h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 음소거 금지, 최소 음량으로</div>
                    <div>• 끝까지 시청하기</div>
                    <div>• 좋아요 & 댓글 남기기</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 음원 스트리밍 팁 카드 */}
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-green-50 rounded-lg flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">음원 플랫폼</h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 30초 이상 재생</div>
                    <div>• 다양한 곡 섞어 듣기</div>
                    <div>• 적절한 간격 유지</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 주의사항 카드 */}
          <Card className="w-64 flex-shrink-0 border-red-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-red-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 text-sm">주의사항</h3>
                  <div className="mt-2 text-xs text-red-600 space-y-1">
                    <div>• 로봇 재생 패턴 금지</div>
                    <div>• 다중 계정 동시 재생 금지</div>
                    <div>• 스트리밍 프로그램 금지</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      <PageHeader
        title="스트리밍 허브"
        description="음원 플랫폼에서 DAY6 곡들을 스트리밍하여 차트 순위를 올려주세요!"
        enableShare={true}
        shareSlug=""
      />

      <div className="mt-6">
        <Tabs defaultValue="streaming-list" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="streaming-list" className="text-xs">스트리밍리스트</TabsTrigger>
            <TabsTrigger value="music-streaming" className="text-xs">음원 스트리밍</TabsTrigger>
            <TabsTrigger value="mv-streaming" className="text-xs">MV 스트리밍</TabsTrigger>
          </TabsList>

          {/* 스트리밍리스트 탭 */}
          <TabsContent value="streaming-list" className="mt-6">
            <div className="space-y-6">
              <StreamingCategorySection
                categoryKey="streaming-list"
                items={streamingGuides["streaming-list"]}
                title="전체 플랫폼"
                description="모든 스트리밍 플랫폼을 한번에 확인하세요"
                icon="📱"
              />
              <StreamingTipsSection />
            </div>
          </TabsContent>

          {/* 음원 스트리밍 탭 */}
          <TabsContent value="music-streaming" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">🎵 음원 플랫폼</h2>
                <p className="text-sm text-gray-600 mb-4">
                  각 플랫폼을 클릭하여 DAY6 아티스트 페이지로 바로 이동하세요
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {STREAMING_PLATFORMS.music.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} />
                  ))}
                </div>
              </div>
              <StreamingTipsSection />
            </div>
          </TabsContent>

          {/* MV 스트리밍 탭 */}
          <TabsContent value="mv-streaming" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">📺 뮤직비디오 스트리밍</h2>
                <p className="text-sm text-gray-600 mb-4">
                  유튜브에서 DAY6 뮤직비디오를 스트리밍해주세요
                </p>
                
                <div className="grid grid-cols-1 gap-3 max-w-xs">
                  {STREAMING_PLATFORMS.mv.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} />
                  ))}
                </div>
              </div>
              <StreamingTipsSection />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}