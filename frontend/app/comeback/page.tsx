"use client";

import {
  Calendar,
  Gift,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Music,
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
import { useState } from "react";
import Link from "next/link";

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
    href: "/streaming",
    action: "지금 스트리밍하기",
  },
  {
    priority: 2,
    title: "Maybe Tomorrow 조회수",
    description: "",

    href: "/streaming?tab=mv",
    action: "MV 보러가기",
  },
  {
    priority: 3,
    title: "10주년 응원 준비",
    href: "/guide",
    action: "응원 가이드 보기",
  },
];

export default function ComebackPage() {
  const [showStreamingModal, setShowStreamingModal] = useState(false);

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
                    D-{comebackSchedule[0]?.dDay}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">정규 4집 발매</h3>
                <p className="text-white/80 text-sm">
                  {comebackSchedule[0].date} - {comebackSchedule[0].description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {comebackSchedule[0]?.dDay}
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
                    D-{comebackSchedule[1].dDay}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">정규 4집 활동 시작</h3>
                <p className="text-white/80 text-sm">
                  {comebackSchedule[1].date} - {comebackSchedule[1].description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {comebackSchedule[1].dDay}
                </div>
                <div className="text-sm text-white/80">일 남음</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div>
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
                        {mission.title === "정규 4집 대비 스트리밍" ? (
                          <Button
                            onClick={() => setShowStreamingModal(true)}
                            size="sm"
                            variant="outline"
                            className="w-full border-[#49c4b0] text-[#49c4b0] hover:bg-[#49c4b0] hover:text-white transition-all duration-200"
                          >
                            {mission.action}
                          </Button>
                        ) : mission.title === "Maybe Tomorrow 조회수" ? (
                          <Button
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=I1gI9ZCcSJs",
                                "_blank"
                              )
                            }
                            size="sm"
                            variant="outline"
                            className="w-full border-[#49c4b0] text-[#49c4b0] hover:bg-[#49c4b0] hover:text-white transition-all duration-200"
                          >
                            {mission.action}
                          </Button>
                        ) : (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="w-full border-[#49c4b0] text-[#49c4b0] hover:bg-[#49c4b0] hover:text-white transition-all duration-200"
                          >
                            <Link href={mission.href}>{mission.action}</Link>
                          </Button>
                        )}
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

      {/* 정규 4집 스트리밍 모달 */}
      {showStreamingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">정규 4집 대비 스트리밍</h2>
              <button
                onClick={() => setShowStreamingModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              정규 4집 &ldquo;The DECADE&rdquo; 9월 5일 발매! 미리 영상을 보고
              준비해보세요.
            </p>

            <div className="space-y-3 mb-4">
              <a
                href="https://www.youtube.com/watch?v=0zdkvGDDnQg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    The DECADE Trailer Film
                  </div>
                  <div className="text-xs text-red-700">
                    정규 4집 트레일러 영상 보기
                  </div>
                </div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=qmAMfh_mbBA"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Track Preview Film</div>
                  <div className="text-xs text-blue-700">트랙 프리뷰 영상</div>
                </div>
              </a>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">발매 전 준비사항</span>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 9월 5일 오후 6시 발매 - 알림 설정하기</li>
                <li>• 플랫폼별 계정 로그인 미리 확인</li>
                <li>• 스트리밍 플레이리스트 정리하기</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
