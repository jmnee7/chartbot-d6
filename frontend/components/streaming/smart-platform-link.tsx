"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink, Heart } from "lucide-react";

// 컴포넌트 외부로 이동
function checkMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ["android", "iphone", "ipad", "mobile"];
  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
}

interface SmartPlatformLinkProps {
  appLink: string;
  webLink: string;
  platformName: string;
  isActive?: boolean;
}

export function SmartPlatformLink({
  appLink,
  webLink,
  platformName,
  isActive = true,
}: SmartPlatformLinkProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(checkMobile());
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isActive) {
        e.preventDefault();
        return;
      }

      if (isMobile) {
        // 모바일에서는 앱 링크 시도 → 실패 시 웹으로 fallback
        try {
          window.location.href = appLink;

          // 일정 시간 후 앱이 열리지 않으면 웹 링크로 이동
          setTimeout(() => {
            if (!document.hidden) {
              window.open(webLink, "_blank", "noopener,noreferrer");
            }
          }, 500);
        } catch {
          window.open(webLink, "_blank", "noopener,noreferrer");
        }
        e.preventDefault();
      }
      // 데스크톱은 기본적으로 webLink로 이동 (target="_blank")
    },
    [isActive, isMobile, appLink, webLink]
  );

  if (!isActive) {
    return (
      <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed">
        <Heart className="h-4 w-4" />
        서비스 준비중
        <ExternalLink className="h-4 w-4 ml-auto opacity-50" />
      </div>
    );
  }

  return (
    <a
      href={isMobile ? "#" : webLink}
      target={isMobile ? undefined : "_blank"}
      rel={isMobile ? undefined : "noopener noreferrer"}
      onClick={handleClick}
      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
    >
      <Heart className="h-4 w-4" />
      {platformName} 바로가기
      <ExternalLink className="h-4 w-4 ml-auto" />
    </a>
  );
}
