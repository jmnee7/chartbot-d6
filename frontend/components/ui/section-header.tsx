"use client";

import { Clock } from "lucide-react";
import { getLastUpdateDateTime } from "@/lib/utils/index";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface SectionHeaderProps {
  title: string;
  showDateTime?: boolean;
  showMoreButton?: boolean;
  moreButtonText?: string;
  moreButtonHref?: string;
}

export function SectionHeader({
  title,
  showDateTime = false,
}: SectionHeaderProps) {
  const [updateDateTime, setUpdateDateTime] = useState<{
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    if (showDateTime) {
      getLastUpdateDateTime().then(setUpdateDateTime);
    }
  }, [showDateTime]);

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
      {showDateTime && updateDateTime && (
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <span className="text-xs text-gray-500">{updateDateTime.date}</span>
          <Clock className="h-3 w-3 text-mint-primary" />
          <span>{updateDateTime.time} 기준</span>
        </div>
      )}
    </div>
  );
}
