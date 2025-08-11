"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Vote,
  ExternalLink,
  Clock,
  Trophy,
  Tv,
  Globe,
  AlertCircle,
  Calendar,
  Star,
  Zap,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVotes } from "@/lib/api";
import { VoteItem } from "@/lib/types";
import { getDaysUntil } from "@/lib/utils";
import { PageHeader } from "@/components/common/page-header";

function VoteCard({ vote }: { vote: VoteItem }) {
  const daysLeft = getDaysUntil(vote.deadline);
  const isUrgent = daysLeft <= 1;
  const isExpired = daysLeft < 0;

  const categoryIcons = {
    award: Trophy,
    music_show: Tv,
    global: Globe,
  };

  const categoryNames = {
    award: "시상식",
    music_show: "음악방송",
    global: "글로벌",
  };

  const difficultyColors = {
    easy: "bg-green-500 text-white",
    medium: "bg-yellow-500 text-white",
    hard: "bg-red-500 text-white",
  };

  const difficultyNames = {
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
  };

  const CategoryIcon = categoryIcons[vote.category];

  return (
    <Card
      className={`${isUrgent && !isExpired ? "border-red-200 bg-red-50" : ""} ${
        isExpired ? "opacity-60" : ""
      }`}
    >
      <CardContent className="p-4 shadow-md rounded-lg">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <CategoryIcon className="h-5 w-5 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {vote.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {vote.platform} • {categoryNames[vote.category]}
              </p>
            </div>
          </div>
          {isUrgent && !isExpired && (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
        </div>

        <div className="space-y-4">
          {/* 마감 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {isExpired
                  ? "마감됨"
                  : daysLeft === 0
                  ? "오늘 마감"
                  : daysLeft === 1
                  ? "내일 마감"
                  : `D-${daysLeft}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  difficultyColors[vote.difficulty]
                }`}
              >
                {difficultyNames[vote.difficulty]}
              </span>
            </div>
          </div>

          {/* 마감 날짜 */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>
              마감:{" "}
              {vote.deadline.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </span>
          </div>

          {/* 액션 버튼 */}
          <a
            href={vote.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium transition-colors ${
              isExpired
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isUrgent
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
            onClick={isExpired ? (e) => e.preventDefault() : undefined}
          >
            {isExpired ? "마감됨" : "투표하러 가기"}
            {!isExpired && <ExternalLink className="h-4 w-4" />}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function VotingGuide() {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            투표 가이드
          </h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">계정 준비</h4>
                <p className="text-sm text-gray-600">
                  각 플랫폼별 계정을 미리 생성해 두세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">정시 투표</h4>
                <p className="text-sm text-gray-600">
                  매일 정해진 시간에 투표하여 효과를 극대화하세요.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">마감 확인</h4>
                <p className="text-sm text-gray-600">
                  투표 마감 시간을 꼼꼼히 확인하세요. (한국 시간 기준)
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              투표 팁
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 여러 기기로 투표할 수 있는 경우 활용하세요</li>
              <li>• SNS 공유로 추가 투표권을 받을 수 있습니다</li>
              <li>• 매일 꾸준히 투표하여 순위를 올려보세요</li>
              <li>• 마감 임박 시 집중 투표로 순위를 올려보세요</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VotesPage() {
  const { data: votes, isLoading } = useQuery({
    queryKey: ["votes"],
    queryFn: fetchVotes,
  });

  // 긴급 투표 (24시간 이내 마감)
  const urgentVotes =
    votes
      ?.filter((v) => {
        const daysLeft = getDaysUntil(v.deadline);
        return daysLeft <= 1 && daysLeft >= 0;
      })
      .sort((a, b) => a.deadline.getTime() - b.deadline.getTime()) || [];

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-screen-sm pb-20">
        <PageHeader
          title="투표 센터"
          description="진행 중인 투표를 확인하고 DAY6를 응원해주세요!"
          enableShare={true}
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      <PageHeader
        title="투표 센터"
        description="진행 중인 투표를 확인하고 DAY6를 응원해주세요!"
        enableShare={true}
      />

      <div className="space-y-6">
        {/* 긴급 알림 */}
        {urgentVotes.length > 0 && (
          <Card className="p-4 bg-red-50 border-red-200">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-red-800 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  마감 임박! ({urgentVotes.length}개)
                </h2>
              </div>
              <p className="text-red-700 mb-4">
                24시간 이내 마감되는 투표들입니다. 지금 바로 참여하세요!
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {urgentVotes.map((vote) => (
                  <VoteCard key={vote.id} vote={vote} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 전체 투표 목록 */}
        <Card className="">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                전체 투표
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {votes?.map((vote) => (
                <VoteCard key={vote.id} vote={vote} />
              ))}
              {!votes?.length && (
                <div className="col-span-2 text-center py-12">
                  <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    진행 중인 투표가 없습니다
                  </h3>
                  <p className="text-gray-600">
                    새로운 투표가 시작되면 여기에 표시됩니다.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <VotingGuide />
      </div>
    </div>
  );
}
