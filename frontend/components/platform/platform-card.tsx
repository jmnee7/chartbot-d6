"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  TrendingUp,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { Platform } from "@/lib/constants/platforms";
import { useDeviceType } from "@/lib/hooks/useDeviceType";
import { useState } from "react";

type DeviceType = "android" | "ios" | "pc";

interface PlatformCardProps {
  platform: Platform;
  variant?: "default" | "compact" | "grid";
  showDescription?: boolean;
  isHome?: boolean;
}

export function PlatformCard({
  platform,
  variant = "default",
  showDescription = true,
  isHome = false,
}: PlatformCardProps) {
  const deviceType = useDeviceType() as DeviceType;
  const [showDropdown, setShowDropdown] = useState(false);

  const deeplinks = platform.deeplinks?.[deviceType] || [];
  const hasDeeplinks = deeplinks.length > 0;

  if (variant === "grid") {
    return (
      <div className="relative">
        <div className="flex flex-col items-center p-3 border border-gray-100 hover:border-gray-200 rounded-lg">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-2 bg-white border border-gray-100 overflow-hidden">
            {platform.logo !== "/file.svg" ? (
              <Image
                src={platform.logo}
                alt={platform.name}
                width={28}
                height={28}
                className="rounded object-cover"
              />
            ) : (
              <TrendingUp className="w-6 h-6 text-white" />
            )}
          </div>
          <span className="text-xs lg:text-sm font-medium text-gray-700 text-center mb-2">
            {platform.name}
          </span>

          {/* 디바이스에 맞는 링크 자동 선택 */}
          {hasDeeplinks ? (
            <>
              {deeplinks.length === 1 ? (
                // 단일 딥링크인 경우 바로 표시
                <a
                  href={deeplinks[0].uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    size="sm"
                    className="w-full text-xs bg-mint-primary hover:bg-mint-dark text-white"
                  >
                    <Smartphone className="w-3 h-3 mr-1" />
                    {deeplinks[0].label}
                  </Button>
                </a>
              ) : (
                // 여러 딥링크인 경우 - 모바일/PC 모두 드롭다운 방식
                <>
                  <Button
                    size="sm"
                    className="w-full text-xs bg-mint-primary hover:bg-mint-dark text-white"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <Smartphone className="w-3 h-3 mr-1" />
                    {isHome
                      ? "앱으로"
                      : deviceType === "pc"
                        ? "앱으로 열기"
                        : "앱으로 열기"}
                    <ChevronDown
                      className={`w-3 h-3 ml-1 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1">
                      {deeplinks.map((link, index) => (
                        <Button
                          key={index}
                          asChild
                          size="sm"
                          variant="ghost"
                          className="w-full justify-start text-xs"
                        >
                          <a
                            href={link.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              )}
              {/* 플랫폼 안내 메시지 */}
              {deeplinks.length > 1 && (
                <p className="text-xs text-gray-500 text-center mt-1 px-1">
                  차례대로 모두 클릭
                </p>
              )}
            </>
          ) : (
            // 딥링크가 없으면 웹 링크 표시
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                size="sm"
                className="w-full text-xs bg-mint-primary hover:bg-mint-dark text-white"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                {isHome ? "웹" : "웹으로"}
              </Button>
            </a>
          )}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <a href={platform.url} target="_blank" rel="noopener noreferrer">
        <Card className="w-40 flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                {platform.logo !== "/file.svg" ? (
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <div className="text-2xl">
                    {platform.category === "music"
                      ? "🎵"
                      : platform.category === "mv"
                        ? "📺"
                        : "📁"}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm leading-tight">
                  {platform.name}
                </h3>
                {showDescription && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {platform.category === "music"
                      ? `${platform.name}에서 스트리밍`
                      : platform.category === "download"
                        ? `${platform.name} 다운로드`
                        : `${platform.name} 뮤직비디오`}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    );
  }

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="w-full h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center">
              {platform.logo !== "/file.svg" ? (
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <div className="text-2xl text-white">
                  {platform.category === "music"
                    ? "🎵"
                    : platform.category === "mv"
                      ? "📺"
                      : "📁"}
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm">
                {platform.name}
              </h3>
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <ExternalLink className="w-3 h-3 mr-1" />
                <span>
                  {platform.category === "music"
                    ? "바로 스트리밍"
                    : platform.category === "download"
                      ? "바로 다운로드"
                      : "바로 시청"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
