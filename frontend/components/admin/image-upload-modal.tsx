"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  Check,
  Trash2,
} from "lucide-react";
import {
  useUploadImage,
  useImagesByCategory,
  useDeleteImage,
  ImageResource,
} from "@/lib/api/image-resources";
import Image from "next/image";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: ImageResource["category"];
}

const CATEGORIES = [
  { value: "streaming_guide", label: "스트리밍 가이드" },
  { value: "banner", label: "배너" },
  { value: "voting_guide", label: "투표 가이드" },
] as const;

export function ImageUploadModal({
  isOpen,
  onClose,
  defaultCategory = "streaming_guide",
}: ImageUploadModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ImageResource["category"]>(defaultCategory);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadImage();
  const deleteMutation = useDeleteImage();
  const { data: images, isLoading: imagesLoading } =
    useImagesByCategory(selectedCategory);

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 검증 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));

      // 파일명에서 기본 제목 추출
      if (!title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setTitle(nameWithoutExt);
      }
    }
  };

  // 업로드 핸들러
  const handleUpload = async () => {
    if (!selectedFile || !title) {
      alert("파일과 제목을 입력해주세요.");
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        category: selectedCategory,
        title,
      });

      // 초기화
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle("");

      alert("이미지가 업로드되었습니다!");
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다.");
    }
  };

  // 삭제 핸들러
  const handleDelete = async (image: ImageResource) => {
    if (!confirm(`"${image.title}" 이미지를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      // tags 배열에 storage path가 저장되어 있음
      const storagePath = image.tags?.[0];
      await deleteMutation.mutateAsync({ id: image.id, storagePath });
      alert("이미지가 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // 파일 선택 초기화
  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            이미지 관리
          </DialogTitle>
        </DialogHeader>

        {/* 탭 */}
        <div className="flex gap-2 border-b pb-2">
          <Button
            variant={activeTab === "upload" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("upload")}
          >
            <Upload className="w-4 h-4 mr-1" />
            업로드
          </Button>
          <Button
            variant={activeTab === "manage" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("manage")}
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            관리 ({images?.length || 0})
          </Button>
        </div>

        {/* 카테고리 선택 */}
        <div className="space-y-2">
          <Label>카테고리</Label>
          <Select
            value={selectedCategory}
            onValueChange={(v) =>
              setSelectedCategory(v as ImageResource["category"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "upload" ? (
            <div className="space-y-4">
              {/* 파일 드롭존 */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
                  ${selectedFile ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="relative">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="max-h-48 mx-auto object-contain rounded"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="mt-2 text-sm text-gray-600">
                      {selectedFile?.name} (
                      {(selectedFile?.size || 0 / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">클릭하여 이미지 선택</p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, WEBP, GIF (최대 5MB)
                    </p>
                  </>
                )}
              </div>

              {/* 제목 입력 */}
              <div className="space-y-2">
                <Label>제목 *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="이미지 제목"
                />
              </div>
            </div>
          ) : (
          <div className="space-y-3">
            {imagesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-6 h-6 mx-auto animate-spin text-gray-400" />
              </div>
            ) : images && images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={image.file_url}
                      alt={image.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{image.title}</p>
                    {image.description && (
                      <p className="text-xs text-gray-500 truncate">
                        {image.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      {image.file_size
                        ? `${(image.file_size / 1024).toFixed(1)} KB`
                        : ""}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(image)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>등록된 이미지가 없습니다.</p>
              </div>
            )}
          </div>
          )}
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="flex gap-2 justify-end pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          {activeTab === "upload" && (
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !title || uploadMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
            >
              {uploadMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-1" />
              )}
              업로드
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
