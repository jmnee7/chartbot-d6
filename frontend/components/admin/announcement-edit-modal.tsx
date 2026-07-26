"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Loader2,
  Save,
  ImageIcon,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  useAnnouncement,
  useUpdateAnnouncement,
  uploadAnnouncementImage,
} from "@/lib/api/announcement";

interface AnnouncementEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnnouncementEditModal({
  isOpen,
  onClose,
}: AnnouncementEditModalProps) {
  const { data: announcement } = useAnnouncement();
  const updateMutation = useUpdateAnnouncement();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 편집 상태
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  // 새로 선택한 파일 (아직 업로드 전)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 공지 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title || "");
      setBody(announcement.body || "");
      setLinkUrl(announcement.link_url || "");
      setLinkLabel(announcement.link_label || "");
      setIsActive(announcement.is_active);
      setImageUrl(announcement.image_url);
      setImagePath(announcement.image_path);
      setSelectedFile(null);
      setLocalPreview(null);
    }
  }, [announcement, isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    setSelectedFile(file);
    setLocalPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setLocalPreview(null);
    setImageUrl(null);
    setImagePath(null);
  };

  const handleSave = async () => {
    if (!announcement) return;
    setIsSaving(true);
    try {
      let finalUrl = imageUrl;
      let finalPath = imagePath;

      // 새 파일이 있으면 먼저 업로드
      if (selectedFile) {
        const uploaded = await uploadAnnouncementImage(selectedFile);
        if (!uploaded) {
          alert("이미지 업로드에 실패했습니다.");
          setIsSaving(false);
          return;
        }
        finalUrl = uploaded.url;
        finalPath = uploaded.path;
      }

      await updateMutation.mutateAsync({
        id: announcement.id,
        currentVersion: announcement.version,
        updates: {
          title,
          body,
          link_url: linkUrl || null,
          link_label: linkLabel || null,
          is_active: isActive,
          image_url: finalUrl,
          image_path: finalPath,
        },
      });

      onClose();
    } catch (error) {
      console.error("공지 저장 실패:", error);
      alert("저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  // 미리보기용 이미지 (새 선택 우선)
  const previewImage = localPreview || imageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            공지 바텀시트 관리
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* 활성 토글 */}
          <button
            type="button"
            onClick={() => setIsActive((v) => !v)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
              isActive
                ? "bg-mint-primary/10 border-mint-primary text-mint-dark"
                : "bg-gray-50 border-gray-200 text-gray-500"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              {isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {isActive ? "공지 노출 중" : "공지 숨김"}
            </span>
            <span
              className={`relative w-10 h-5 rounded-full transition-colors ${
                isActive ? "bg-mint-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
          </button>

          {/* 이미지 업로드 */}
          <div>
            <Label className="text-xs text-gray-600">앨범 사진 / 이미지</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {previewImage ? (
              <div className="mt-1 relative aspect-square w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={previewImage}
                  alt="공지 이미지 미리보기"
                  fill
                  className="object-cover"
                  sizes="448px"
                  unoptimized={!!localPreview}
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs bg-white/90 rounded-lg shadow hover:bg-white transition-colors flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" /> 교체
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-1.5 text-xs bg-white/90 text-red-500 rounded-lg shadow hover:bg-white transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> 삭제
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-mint-primary hover:text-mint-primary transition-colors"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">이미지 선택</span>
              </button>
            )}
          </div>

          {/* 제목 */}
          <div>
            <Label htmlFor="ann-title" className="text-xs text-gray-600">
              제목
            </Label>
            <Input
              id="ann-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 영케이 정규 2집 《YOUNGEST》 발매!"
              className="mt-1"
            />
          </div>

          {/* 본문 */}
          <div>
            <Label htmlFor="ann-body" className="text-xs text-gray-600">
              본문
            </Label>
            <textarea
              id="ann-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="예: 7월 27일 오후 6시, 타이틀곡 'Shut The Door' 발매. 많은 스밍 부탁드려요!"
              rows={4}
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint-primary/40 resize-none"
            />
          </div>

          {/* 링크 */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="ann-link" className="text-xs text-gray-600">
                링크 URL (선택)
              </Label>
              <Input
                id="ann-link"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ann-link-label" className="text-xs text-gray-600">
                버튼 문구
              </Label>
              <Input
                id="ann-link-label"
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                placeholder="자세히 보기"
                className="mt-1"
              />
            </div>
          </div>

          <p className="text-[11px] text-gray-400">
            저장하면 공지 버전이 올라가, 이전에 “다시 보지 않기”를 누른 사용자에게도 다시 노출됩니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            취소
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-mint-primary hover:bg-mint-dark"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
