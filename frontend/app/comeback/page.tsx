"use client";

import {
  ExternalLink,
  Calendar,
  Gift,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchComebackData } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// TODO: 실제 날짜 계산 로직으로 변경 필요
const comebackInfo = {
  title: "Maybe Tomorrow",
  date: "2025년 5월 7일",
  daysLeft: Math.floor(
    (new Date().getTime() - new Date("2025-05-07").getTime()) /
      (1000 * 60 * 60 * 24)
  ), // 실제 날짜 계산
  status: "완료",
};

// 동적 데이터 사용 - React Query로 가져오기
interface ComebackData {
  chartRank?: Array<{ platform: string; rank: number | null; target: number }>;
  youtubeStats?: { views: number; target: number };
  streamingScore?: { current: number; target: number };
}

const getComebackGoals = (comebackData: ComebackData | undefined) => [
  {
    title: "멜론 실시간 차트",
    current: comebackData?.chartRank?.[0]?.rank,
    target: comebackData?.chartRank?.[0]?.target || 10,
    unit: "위",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: TrendingUp,
  },
  {
    title: "YouTube 조회수",
    current: comebackData?.youtubeStats?.views,
    target: comebackData?.youtubeStats?.target || 3000000,
    unit: "뷰",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: Target,
  },
  {
    title: "스트리밍 참여도",
    current: comebackData?.streamingScore?.current,
    target: comebackData?.streamingScore?.target || 100,
    unit: "점",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: Gift,
  },
];

const comebackSchedule = [
  {
    date: "2025.05.07",
    event: "디지털 싱글 발매",
    status: "completed",
    description: "Maybe Tomorrow + 끝났지 공개",
    dDay: 0, // 완료됨
  },
  {
    date: "2025.05.09",
    event: "KSPO 돔 콘서트",
    status: "completed",
    description: "첫 K-밴드 돔 공연 성공",
    dDay: 0, // 완료됨
  },
  {
    date: "2025.09.05",
    event: "정규 4집 발매",
    status: "upcoming",
    description: "데뷔 10주년 기념 앨범 'The DECADE'",
    dDay: Math.ceil(
      (new Date("2025-09-05").getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    ),
  },
  {
    date: "2025.09.20",
    event: "정규 4집 활동 시작",
    status: "upcoming",
    description: "음악방송 및 프로모션 활동",
    dDay: Math.ceil(
      (new Date("2025-09-20").getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    ),
  },
];

const comebackMissions = [
  {
    priority: 1,
    title: "정규 4집 대비 스트리밍",
    description: "9월 정규 4집 발매 전까지 꾸준한 스트리밍이 필요해요",
    href: "/streaming",
    action: "지금 스트리밍하기",
  },
  {
    priority: 2,
    title: "Maybe Tomorrow 조회수",
    description: "현재 185만뷰, 300만뷰 목표까지 함께해주세요",
    href: "/streaming?tab=mv",
    action: "MV 보러가기",
  },
  {
    priority: 3,
    title: "10주년 응원 준비",
    description: "데뷔 10주년 기념 정규 4집을 함께 응원해요",
    href: "/guide",
    action: "응원 가이드 보기",
  },
];

export default function ComebackPage() {
  // React Query로 실시간 데이터 가져오기
  const { data: comebackData, isLoading } = useQuery({
    queryKey: ["comebackData"],
    queryFn: fetchComebackData,
    refetchInterval: 5 * 60 * 1000, // 5분마다 새로고침
  });

  const comebackGoals = getComebackGoals(comebackData);
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              컴백 지원 센터
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              DAY6 &apos;Maybe Tomorrow&apos; 현재 활동 및 정규 4집 대비
            </p>
          </div>
          <div className="text-gray-300"></div>
        </div>

        {/* Comeback Status Banner */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="bg-gradient-to-r from-[#49c4b0] to-[#6dd5c0] text-white rounded-lg"
        >
          {/* Maybe Tomorrow 카드 */}
          <SwiperSlide className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6" />
                  <Badge className="bg-white/20 text-white border-white/30">
                    {comebackInfo.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  {comebackInfo.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {comebackInfo.date} 발매
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {comebackInfo.daysLeft}
                </div>
                <div className="text-sm text-white/80">일 경과</div>
              </div>
            </div>
          </SwiperSlide>

          {/* 정규 4집 발매 카드 */}
          <SwiperSlide className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-6 h-6" />
                  <Badge className="bg-white/20 text-white border-white/30">
                    D-{comebackSchedule[2].dDay}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">정규 4집 발매</h3>
                <p className="text-white/80 text-sm">
                  {comebackSchedule[2].date} - {comebackSchedule[2].description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {comebackSchedule[2].dDay}
                </div>
                <div className="text-sm text-white/80">일 남음</div>
              </div>
            </div>
          </SwiperSlide>

          {/* 정규 4집 활동 시작 카드 */}
          <SwiperSlide className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6" />
                  <Badge className="bg-white/20 text-white border-white/30">
                    D-{comebackSchedule[3].dDay}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">정규 4집 활동 시작</h3>
                <p className="text-white/80 text-sm">
                  {comebackSchedule[3].date} - {comebackSchedule[3].description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {comebackSchedule[3].dDay}
                </div>
                <div className="text-sm text-white/80">일 남음</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Current Goals */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            현재 목표 달성률
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading
              ? // 로딩 상태
                Array.from({ length: 3 }, (_, index) => (
                  <Card key={index} className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4">
                      <div className="animate-pulse space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gray-200 rounded" />
                          <div className="h-4 bg-gray-200 rounded w-24" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-8 bg-gray-200 rounded w-16" />
                          <div className="w-full bg-gray-200 rounded-full h-2" />
                          <div className="h-3 bg-gray-200 rounded w-20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : comebackGoals.map((goal, index) => {
                  const IconComponent = goal.icon;
                  const hasData =
                    goal.current !== null && goal.current !== undefined;
                  const progress = hasData
                    ? Math.min((goal.current! / goal.target) * 100, 100)
                    : 0;

                  return (
                    <Card
                      key={index}
                      className={`${goal.borderColor} ${goal.bgColor}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent
                              className={`w-5 h-5 ${goal.color}`}
                            />
                            <h4 className="font-medium text-gray-900 text-sm">
                              {goal.title}
                            </h4>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`text-2xl font-bold ${goal.color}`}
                            >
                              {hasData
                                ? goal.unit === "뷰"
                                  ? goal.current!.toLocaleString()
                                  : goal.current!
                                : "-"}
                            </span>
                            <span className="text-sm text-gray-500">
                              /{" "}
                              {goal.unit === "뷰"
                                ? (goal.target / 1000000).toFixed(1) + "M"
                                : goal.target}
                              {goal.unit}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${goal.color.replace("text-", "bg-")}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600">
                            {hasData
                              ? `${Math.round(progress)}% 달성`
                              : "데이터 수집 중..."}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        </div>

        {/* Mobile Divider */}
        <div
          className="md:hidden -mx-9"
          style={{ borderBottom: "0.6rem solid #f7f8f9" }}
        ></div>

        {/* Comeback Schedule */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            컴백 일정
          </h3>
          <div className="space-y-3">
            {comebackSchedule.map((item, index) => (
              <Card
                key={index}
                className={
                  item.status === "completed"
                    ? "bg-green-50 border-green-200"
                    : item.status === "active"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.status === "completed" ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      ) : item.status === "active" ? (
                        <Clock className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Calendar className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">
                          {item.event}
                        </h4>
                        {item.status === "active" && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            진행중
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{item.date}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile Divider */}
        <div
          className="md:hidden -mx-9"
          style={{ borderBottom: "0.6rem solid #f7f8f9" }}
        ></div>

        {/* Priority Missions */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            우선순위 미션
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {comebackMissions.map((mission, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#49c4b0] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                        {mission.priority}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {mission.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {mission.description}
                        </p>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="w-full border-[#49c4b0] text-[#49c4b0] hover:bg-[#49c4b0] hover:text-white transition-all duration-200"
                        >
                          <a href={mission.href}>{mission.action}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}
