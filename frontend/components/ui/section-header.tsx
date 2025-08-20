"use client";

import { Clock } from "lucide-react";
import { formatKoreanDate } from "@/lib/date-utils";
import { getLastUpdateTime } from "@/lib/utils/index";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  showDateTime?: boolean;
  showMoreButton?: boolean;
  moreButtonText?: string;
  moreButtonHref?: string;
}

export function SectionHeader({
  title,
  showDateTime = true,
  showMoreButton = false,
  moreButtonText = "더보기",
  moreButtonHref = "#",
}: SectionHeaderProps) {
  const currentTime = new Date();

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
      {showDateTime && (
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <span className="text-xs text-gray-500">
            {formatKoreanDate(currentTime)}
          </span>
          <Clock className="h-3 w-3 text-mint-primary" />
          <span>{getLastUpdateTime()} 기준</span>
        </div>
      )}
    </div>
  );
}
