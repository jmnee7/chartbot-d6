"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { PlatformType } from "@/lib/types";
import { PageHeader } from "@/components/common/page-header";
import { PlatformFilters } from "@/components/charts/platform-filters";
import { ChartSection } from "@/components/charts/chart-section";

export default function ChartsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    "melon",
  ]);

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      <PageHeader
        title="실시간 차트 순위"
        description="DAY6의 차트 순위 변동을 추적하세요."
        enableShare={true}
      />

      <div className="space-y-4">
        <Card className="">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                플랫폼 필터
              </h2>
            </div>
            <PlatformFilters
              selectedPlatforms={selectedPlatforms}
              onPlatformChange={setSelectedPlatforms}
            />
          </CardContent>
        </Card>

        <ChartSection
          selectedPlatforms={selectedPlatforms}
          chartData={chartData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
