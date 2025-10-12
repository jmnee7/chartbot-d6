"use client";

import { CompactChart } from "@/components/compact-chart";
import { CompactChartDB } from "@/components/compact-chart-db";
import { CompactChartDBFixed } from "@/components/compact-chart-db-fixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestChartPage() {
  return (
    <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
      <h1 className="text-2xl font-bold">차트 DB 연결 테스트</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>기존 하드코딩 버전</CardTitle>
        </CardHeader>
        <CardContent>
          <CompactChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>새로운 DB 연결 버전 (수정됨)</CardTitle>
        </CardHeader>
        <CardContent>
          <CompactChartDBFixed />
        </CardContent>
      </Card>
    </div>
  );
}