"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import Image from "next/image";
import { ChartTable } from "./chart-table";
import { ChartData, PlatformType } from "@/lib/types";
import { getPlatformName } from "@/lib/utils";

interface ChartSectionProps {
  selectedPlatforms: PlatformType[];
  chartData: ChartData | undefined;
  isLoading: boolean;
}

function EmptyPlatformState() {
  return (
    <Card className="p-4">
      <CardContent className="p-0 text-center py-8">
        <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          플랫폼을 선택해주세요
        </h3>
        <p className="text-gray-500">
          위의 필터에서 확인하고 싶은 플랫폼을 선택하세요.
        </p>
      </CardContent>
    </Card>
  );
}

function PlatformChart({
  platform,
  chartData,
  isLoading,
}: {
  platform: PlatformType;
  chartData: ChartData | undefined;
  isLoading: boolean;
}) {
  const getPlatformLogo = (platform: PlatformType) => {
    const logos: Record<PlatformType, string> = {
      melon: "/melone.webp",
      genie: "/Geenie.png",
      bugs: "/bucks.png",
      vibe: "/vibe.jpeg",
      flo: "/fillo.png",
    };
    return logos[platform];
  };

  return (
    <Card key={platform} className="">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative">
              <Image
                src={getPlatformLogo(platform)}
                alt={getPlatformName(platform)}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {getPlatformName(platform)}
            </h2>
          </div>
          <span className="text-xs md:text-sm text-gray-500">
            {chartData?.collectedAtKST}
          </span>
        </div>
        <ChartTable
          songs={chartData?.[platform] || []}
          platform={platform}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}

export function ChartSection({
  selectedPlatforms,
  chartData,
  isLoading,
}: ChartSectionProps) {
  if (selectedPlatforms.length === 0) {
    return <EmptyPlatformState />;
  }

  return (
    <div className="space-y-4">
      {selectedPlatforms.map((platform) => (
        <PlatformChart
          key={platform}
          platform={platform}
          chartData={chartData}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
