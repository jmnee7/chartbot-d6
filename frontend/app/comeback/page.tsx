"use client";

import { Calendar, Smartphone, Heart, Star, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchComebackSchedules, calculateDDay } from "@/lib/api/comeback";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { ComebackScheduleEditModal } from "@/components/admin/comeback-schedule-edit-modal";


export default function ComebackPage() {
  const { isAdminMode } = useAdminMode();
  const [showEditModal, setShowEditModal] = useState(false);
  
  // DB에서 컴백 스케줄 가져오기
  const { data: dbSchedules } = useQuery({
    queryKey: ["comebackSchedules"],
    queryFn: fetchComebackSchedules,
    staleTime: 60000,
  });

  // DB 데이터만 사용 (기본값 없음)
  const schedules = dbSchedules || [];
  
  // 날짜순 정렬하고 D-Day 계산
  const comebackSchedule = schedules
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .map((schedule) => ({
      ...schedule,
      dDay: calculateDDay(schedule.datetime),
    }));

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
          <div className="flex items-center gap-2">
            {/* 관리자 편집 버튼 */}
            {isAdminMode && (
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-lg transition-colors"
                title="컴백 스케줄 편집"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
            <div className="text-gray-300"></div>
          </div>
        </div>

        {/* Comeback Status Banner */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="bg-gradient-to-r from-[#49c4b0] to-[#6dd5c0] text-white rounded-lg"
        >
          {/* 오늘 이후 일정만 표시 */}
          {comebackSchedule.filter((schedule) => schedule.dDay >= 0).length > 0 ? (
            comebackSchedule
              .filter((schedule) => schedule.dDay >= 0)
              .map((schedule, index) => (
              <SwiperSlide key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-6 h-6" />
                      <Badge className="bg-white/20 text-white border-white/30">
                        {schedule.dDay === 0 ? "D-DAY" : `D-${schedule.dDay}`}
                      </Badge>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 leading-tight">
                      {schedule.event}
                    </h3>
                    <p className="text-white/80 text-sm">{schedule.date}</p>
                    <p className="text-white/80 text-sm">
                      {schedule.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold whitespace-nowrap">
                      {schedule.dDay === 0 ? "D-DAY" : `${schedule.dDay}일`}
                    </div>
                    <div className="text-sm text-white whitespace-nowrap">
                      {schedule.dDay === 0 ? "오늘" : "남음"}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            // 일정이 없을 때 메시지 표시
            <SwiperSlide className="p-6">
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-70" />
                <h3 className="text-xl font-bold mb-2">예정된 일정이 없습니다</h3>
                <p className="text-white/80">
                  {isAdminMode ? '관리자 모드에서 새로운 일정을 추가할 수 있습니다.' : '곧 새로운 소식을 전해드릴게요!'}
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Mobile Divider */}
        <div
          className="md:hidden -mx-9"
          style={{ borderBottom: "0.6rem solid #f7f8f9" }}
        ></div>

        {/* 매일 재화 모으기 */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            매일 재화 모으기
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 음악중심 뮤빗 */}
            <Link
              href="/guide/musiccore-vote"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-mint-primary to-mint-dark hover:from-mint-dark hover:to-mint-primary transition-colors rounded-lg shadow-md text-white w-full text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">음악중심</h3>
                <p className="text-sm opacity-90">뮤빗 모으기</p>
              </div>
            </Link>

            {/* 인기가요 하이어 */}
            <Link
              href="/guide/inkigayo-vote"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-colors rounded-lg shadow-md text-white w-full text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">인기가요</h3>
                <p className="text-sm opacity-90">하이어 루비 모으기</p>
              </div>
            </Link>

            {/* 인기가요 링크 */}
            <Link
              href="/guide/inkigayo-vote"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 transition-colors rounded-lg shadow-md text-white w-full text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">인기가요</h3>
                <p className="text-sm opacity-90">링크 팬 포인트 모으기</p>
              </div>
            </Link>
          </div>
        </div>
        
        {/* 컴백 스케줄 편집 모달 */}
        {showEditModal && (
          <ComebackScheduleEditModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onUpdate={() => {
              // React Query 캐시 무효화로 데이터 새로고침
            }}
          />
        )}
      </div>

      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}
