"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  slug?: string;
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = slug
      ? `${window.location.origin}/guide/${slug}`
      : window.location.href;
    const shareData = {
      title: slug ? `DAY6 응원 가이드 - ${title}` : `DAY6 - ${title}`,
      text: slug
        ? `DAY6 ${title} 가이드를 확인해보세요!`
        : `DAY6 ${title} 페이지를 확인해보세요!`,
      url: url,
    };

    try {
      // Web Share API가 지원되는 경우 (주로 모바일)
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }

      // 그렇지 않으면 URL 복사
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("공유하기 실패:", error);
      // fallback: URL 복사 시도
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        console.log("클립보드 복사 실패:", clipboardError);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="가이드 공유하기"
      className="rounded p-2 hover:bg-gray-100 transition-colors relative text-gray-500"
    >
      <Share2 className="h-4 w-4" />
      {copied && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          링크 복사됨
        </div>
      )}
    </button>
  );
}
