"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploadModal } from "@/components/admin/image-upload-modal";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { useImagesByCategory, ImageResource } from "@/lib/api/image-resources";
import { ImageGallery } from "@/components/guide/image-gallery";

interface RadioGuideGalleryProps {
  slug: string;
  label: string;
  fallbackImages: string[];
}

// 라디오 가이드 slug -> image_resources category 매핑
const RADIO_SLUG_TO_CATEGORY: Record<string, ImageResource["category"]> = {
  "radio-sbs": "radio_sbs",
  "radio-kbs": "radio_kbs",
  "radio-mbc": "radio_mbc",
};

export function RadioGuideGallery({
  slug,
  label,
  fallbackImages,
}: RadioGuideGalleryProps) {
  const { isAdminMode } = useAdminMode();
  const [showImageModal, setShowImageModal] = useState(false);

  const category = RADIO_SLUG_TO_CATEGORY[slug];
  const { data: radioImages } = useImagesByCategory(
    category ?? "radio_sbs"
  );

  if (!category) {
    return <ImageGallery images={fallbackImages} label={label} />;
  }

  const images =
    radioImages && radioImages.length > 0
      ? radioImages.map((img) => img.file_url)
      : fallbackImages;

  return (
    <>
      {isAdminMode && (
        <div className="flex justify-end mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowImageModal(true)}
            className="text-xs"
          >
            <ImagePlus className="w-4 h-4 mr-1" />
            이미지 관리
          </Button>
        </div>
      )}

      <ImageGallery images={images} label={label} />

      {showImageModal && (
        <ImageUploadModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          defaultCategory={category}
        />
      )}
    </>
  );
}
