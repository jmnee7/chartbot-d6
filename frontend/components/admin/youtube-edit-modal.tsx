"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchFeaturedVideo,
  updateVideo,
  type YouTubeVideo
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

interface YouTubeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export function YouTubeEditModal({ isOpen, onClose, onUpdate }: YouTubeEditModalProps) {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    video_id: '',
  });

  // 현재 featured 비디오 가져오기
  const { data: featuredVideo, isLoading } = useQuery({
    queryKey: ["featuredVideo"],
    queryFn: fetchFeaturedVideo,
    staleTime: 60000,
  });

  // 데이터 로드 시 form에 설정
  useEffect(() => {
    if (featuredVideo) {
      setCurrentVideo({
        video_id: featuredVideo.video_id,
      });
    }
  }, [featuredVideo]);

  // 현재 비디오 업데이트
  const handleSave = async () => {
    if (!currentVideo.video_id) {
      alert('YouTube ID를 입력해주세요.');
      return;
    }

    setIsSaving(true);
    
    if (featuredVideo) {
      const success = await updateVideo(featuredVideo.id, {
        video_id: currentVideo.video_id,
      });

      if (success) {
        queryClient.invalidateQueries({ queryKey: ["featuredVideo"] });
        onUpdate?.();
        onClose();
        alert('YouTube 비디오가 업데이트되었습니다.');
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
            YouTube 배너 편집
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
              <p className="text-xs text-gray-500 mt-1">
                YouTube URL에서 ID 부분만 입력 (예: https://youtube.com/watch?v=<strong>ID</strong>)
              </p>
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
            disabled={isSaving || !currentVideo.video_id}
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