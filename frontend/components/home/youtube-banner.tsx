"use client";

import { useEffect, useState } from "react";
import { fetchFeaturedVideo } from "@/lib/api/youtube";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { Edit } from "lucide-react";
import { YouTubeEditModal } from "@/components/admin/youtube-edit-modal";

interface YouTubeBannerProps {
  videoId?: string;
}

export default function YouTubeBanner({ videoId }: YouTubeBannerProps) {
  const { isAdminMode } = useAdminMode();
  const [featuredVideo, setFeaturedVideo] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      const video = await fetchFeaturedVideo();
      if (video) {
        setFeaturedVideo(video);
      } else {
        // 기본 비디오 (DB에서 못 가져올 경우)
        setFeaturedVideo({ video_id: "-N-pmPKS-bE" });
      }
    };
    loadVideo();
  }, []);

  const displayVideoId = videoId || featuredVideo?.video_id || "-N-pmPKS-bE";
  
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {/* 관리자 편집 버튼 */}
      {isAdminMode && (
        <button
          onClick={() => setShowEditModal(true)}
          className="absolute top-4 right-4 z-10 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-lg transition-colors"
          title="YouTube 배너 편집"
        >
          <Edit className="h-4 w-4" />
        </button>
      )}
      
      {/* YouTube Embedded Video */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${displayVideoId}?autoplay=1&mute=1&loop=1&playlist=${displayVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
        title="DAY6 Music Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
      
      {/* YouTube 편집 모달 */}
      {showEditModal && (
        <YouTubeEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            // 비디오 다시 로드
            const loadVideo = async () => {
              const video = await fetchFeaturedVideo();
              if (video) {
                setFeaturedVideo(video);
              }
            };
            loadVideo();
          }}
        />
      )}
    </div>
  );
}
