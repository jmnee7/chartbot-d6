"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMVStats } from "@/lib/api";
import { fetchTrackingVideos, fetchVideoStats } from "@/lib/api/youtube";
import { useEffect, useState } from "react";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { MVStatsEditModal } from "@/components/admin/mv-stats-edit-modal";

export default function MVStatsCard() {
  const { isAdminMode } = useAdminMode();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  
  const { data: mvStats } = useQuery({
    queryKey: ["mvStats"],
    queryFn: fetchMVStats,
  });

  const { data: trackingVideos } = useQuery({
    queryKey: ["trackingVideos"],
    queryFn: fetchTrackingVideos,
  });

  // 첫 번째 추적 비디오를 메인으로 표시
  useEffect(() => {
    if (trackingVideos && trackingVideos.length > 0) {
      setCurrentVideo(trackingVideos[0]);
    } else {
      // 기본값
      setCurrentVideo({
        video_id: "-N-pmPKS-bE",
        title: "DAY6 - INSIDE OUT"
      });
    }
  }, [trackingVideos]);

  const videoId = currentVideo?.video_id || "-N-pmPKS-bE";
  const videoTitle = currentVideo?.title || "DAY6 - INSIDE OUT";

  return (
    <Card className="md:p-6">
      <CardContent className="p-0">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base">
            {videoTitle}
          </h3>
          {/* 관리자 편집 버튼 */}
          {isAdminMode && (
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-full shadow-lg transition-colors"
              title="MV 통계 편집"
            >
              <Edit className="h-3 w-3" />
            </button>
          )}
        </div>
        {/* 유튜브 임베드 */}
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* 제목 */}

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* 조회수 카드 */}
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className=" bg-red-100 rounded-lg">
                <Eye className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">조회수</p>
                <p className="text-base font-bold text-gray-900">
                  {mvStats?.[0]?.views
                    ? mvStats[0].views.toLocaleString()
                    : "로딩중..."}
                </p>
                {mvStats?.[0]?.viewsDelta24h ? (
                  <p className="text-xs text-red-600 font-medium">
                    +{mvStats[0].viewsDelta24h.toLocaleString()}
                  </p>
                ) : null}
              </div>
            </div>
          </Card>

          {/* 좋아요 카드 */}
          <Card className="p-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 rounded-lg">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">좋아요</p>
                <p className="text-base font-bold text-gray-900">
                  {mvStats?.[0]?.likes
                    ? mvStats[0].likes.toLocaleString()
                    : "로딩중..."}
                </p>
                {mvStats?.[0]?.likesDelta24h ? (
                  <p className="font-medium text-sm truncate text-gray-900">
                    +{mvStats[0].likesDelta24h.toLocaleString()}
                  </p>
                ) : null}
              </div>
            </div>
          </Card>
        </div>

        {/* 업데이트 시간 */}
        
        {/* MV 통계 편집 모달 */}
        {showEditModal && (
          <MVStatsEditModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onUpdate={() => {
              // 비디오 다시 로드
              setCurrentVideo(null);
              // React Query 캐시 무효화
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
