"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchTrackingVideos,
  updateVideo
} from "@/lib/api/youtube";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Youtube, Save } from "lucide-react";

interface MVStatsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export function MVStatsEditModal({ isOpen, onClose, onUpdate }: MVStatsEditModalProps) {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    video_id: '',
    title: '',
  });

  // 현재 tracking 비디오 가져오기 (첫 번째 비디오)
  const { data: trackingVideos, isLoading } = useQuery({
    queryKey: ["trackingVideos"],
    queryFn: fetchTrackingVideos,
    staleTime: 60000,
  });

  // 데이터 로드 시 form에 설정
  useEffect(() => {
    if (trackingVideos && trackingVideos.length > 0) {
      const firstVideo = trackingVideos[0];
      setCurrentVideo({
        video_id: firstVideo.video_id,
        title: firstVideo.title,
      });
    }
  }, [trackingVideos]);

  // 현재 비디오 업데이트
  const handleSave = async () => {
    if (!currentVideo.video_id || !currentVideo.title) {
      alert('YouTube ID와 제목을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    
    if (trackingVideos && trackingVideos.length > 0) {
      const firstVideo = trackingVideos[0];
      const success = await updateVideo(firstVideo.id, {
        video_id: currentVideo.video_id,
        title: currentVideo.title,
      });

      if (success) {
        queryClient.invalidateQueries({ queryKey: ["trackingVideos"] });
        queryClient.invalidateQueries({ queryKey: ["mvStats"] });
        onUpdate?.();
        onClose();
        alert('MV 통계 비디오가 업데이트되었습니다.');
      } else {
        alert('업데이트에 실패했습니다.');
      }
    }
    
    setIsSaving(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5" />
            MV 통계 편집
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">데이터를 불러오는 중...</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">YouTube 비디오 ID</Label>
              <Input
                value={currentVideo.video_id}
                onChange={(e) => setCurrentVideo({ ...currentVideo, video_id: e.target.value })}
                placeholder="-N-pmPKS-bE"
                className="mt-1"
              />
              <div className="mt-1 space-y-1">
                <p className="text-xs text-gray-500">
                  YouTube URL에서 ID 부분만 입력 (예: https://youtube.com/watch?v=<strong>ID</strong>)
                </p>
                <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  💡 크롤러 수집: ID 변경 시 다음 정각 시간에 새 조회수/좋아요 데이터가 수집됩니다
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">제목</Label>
              <Input
                value={currentVideo.title}
                onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                placeholder="DAY6 - INSIDE OUT"
                className="mt-1"
              />
            </div>

            {/* 미리보기 */}
            {currentVideo.video_id && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold">미리보기</Label>
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentVideo.video_id}`}
                    title="Preview"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving || !currentVideo.video_id || !currentVideo.title}
            className="flex-1 bg-mint-primary hover:bg-mint-dark text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}