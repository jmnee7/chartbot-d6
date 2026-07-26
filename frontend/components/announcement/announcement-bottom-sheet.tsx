"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useAnnouncement } from "@/lib/api/announcement";

// 특정 version의 공지를 '다시 보지 않기' 했는지 저장하는 localStorage 키
const dismissKey = (version: number) => `d6_announcement_dismissed_v${version}`;

export function AnnouncementBottomSheet() {
  const { data: announcement } = useAnnouncement();

  // 노출 여부. 마운트 시 localStorage를 확인해 결정한다.
  const [visible, setVisible] = useState(false);
  // 슬라이드업 애니메이션용 (마운트 후 한 프레임 뒤 true)
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!announcement || !announcement.is_active) {
      setVisible(false);
      return;
    }
    // 이 version을 이미 닫았으면 노출하지 않음
    const dismissed =
      typeof window !== "undefined" &&
      localStorage.getItem(dismissKey(announcement.version)) === "true";
    if (dismissed) {
      setVisible(false);
      return;
    }
    setVisible(true);
    // 다음 프레임에 애니메이션 진입
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [announcement]);

  if (!visible || !announcement) return null;

  const close = () => {
    setEntered(false);
    // 애니메이션이 끝난 뒤 언마운트
    setTimeout(() => setVisible(false), 300);
  };

  // '다시 보지 않기' — 현재 version을 기록. 새 공지(version 증가)는 다시 노출됨.
  const dismissForever = () => {
    try {
      localStorage.setItem(dismissKey(announcement.version), "true");
    } catch {
      // localStorage 접근 불가 시 무시
    }
    close();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={announcement.title || "공지"}
    >
      {/* 백드롭 */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />

      {/* 바텀시트 본문 */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out ${
          entered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={close}
          aria-label="닫기"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 앨범 사진 */}
        {announcement.image_url && (
          <div className="relative w-full aspect-square rounded-t-2xl overflow-hidden bg-gray-100">
            <Image
              src={announcement.image_url}
              alt={announcement.title || "공지 이미지"}
              fill
              className="object-cover"
              sizes="(max-width: 448px) 100vw, 448px"
              priority
            />
          </div>
        )}

        {/* 텍스트 영역 */}
        <div className="p-5 space-y-2">
          {announcement.title && (
            <h2 className="text-lg font-bold text-gray-900">
              {announcement.title}
            </h2>
          )}
          {announcement.body && (
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {announcement.body}
            </p>
          )}

          {/* 링크 버튼 (선택) */}
          {announcement.link_url && (
            <Link
              href={announcement.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center bg-mint-primary hover:bg-mint-dark text-white font-medium py-3 rounded-xl transition-colors"
              onClick={close}
            >
              {announcement.link_label || "자세히 보기"}
            </Link>
          )}
        </div>

        {/* 하단 액션 */}
        <div className="flex items-center border-t border-gray-100">
          <button
            type="button"
            onClick={dismissForever}
            className="flex-1 py-3.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            다시 보지 않기
          </button>
          <div className="w-px h-5 bg-gray-100" />
          <button
            type="button"
            onClick={close}
            className="flex-1 py-3.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
