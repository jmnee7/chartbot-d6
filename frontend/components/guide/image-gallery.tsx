"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  label: string;
}

export function ImageGallery({ images, label }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // 모달 오픈/클로즈 시 body 스크롤 제어
  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // 클린업: 컴포넌트 언마운트 시 클래스 제거
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedImage]);

  const handleModalClick = (e: React.MouseEvent) => {
    // 모달 배경 클릭 시 닫기
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* 이미지 갤러리 */}
      <section className="mt-4">
        <div className="overflow-hidden rounded-lg bg-gray-50">
          <div className="w-full">
            {images.map((src, i) =>
              src ? (
                <Image
                  key={i}
                  src={src}
                  alt={`${label} 가이드 ${i + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto block cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openModal(src)}
                />
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* 이미지 팝업 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleModalClick}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="이미지 닫기"
          >
            <X className="h-6 w-6" />
          </button>

          {/* 이미지 컨테이너 */}
          <div className="relative max-w-full max-h-full">
            <Image
              src={selectedImage}
              alt={`${label} 가이드 확대`}
              width={800}
              height={1200}
              className={cn(
                "max-w-full max-h-full object-contain",
                "md:max-w-4xl md:max-h-screen",
                "sm:max-w-sm sm:max-h-[80vh]"
              )}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}