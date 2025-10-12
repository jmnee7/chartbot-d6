"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

// Mock data - 나중에 실제 데이터로 교체
type ChangeType = "positive" | "negative" | "neutral";

const stats: Array<{
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: any;
}> = [
  {
    title: "총 링크 수",
    value: "24",
    change: "+2",
    changeType: "positive" as const,
    icon: ExternalLink,
  },
  {
    title: "활성 곡",
    value: "3",
    change: "0",
    changeType: "neutral" as const,
    icon: TrendingUp,
  },
  {
    title: "크롤러 상태",
    value: "5/5",
    change: "정상",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "이미지 파일",
    value: "156",
    change: "+12",
    changeType: "positive" as const,
    icon: Users,
  },
];

const recentActivity = [
  {
    id: 1,
    action: "바이브 안드로이드 링크 수정",
    user: "관리자",
    time: "5분 전",
    status: "success",
  },
  {
    id: 2,
    action: "메인 페이지 HAPPY 순서 변경",
    user: "관리자",
    time: "1시간 전",
    status: "success",
  },
  {
    id: 3,
    action: "스트리밍 가이드 이미지 업로드",
    user: "관리자",
    time: "2시간 전",
    status: "success",
  },
];

const crawlerStatus = [
  { platform: "멜론", status: "success", lastRun: "2분 전", songs: 2 },
  { platform: "지니", status: "success", lastRun: "2분 전", songs: 3 },
  { platform: "벅스", status: "success", lastRun: "3분 전", songs: 1 },
  { platform: "바이브", status: "success", lastRun: "3분 전", songs: 2 },
  { platform: "플로", status: "warning", lastRun: "1시간 전", songs: 0 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          대시보드
        </h2>
        <p className="text-muted-foreground">
          D6 음원 차트 시스템 관리자 콘솔
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600 dark:text-green-400"
                      : stat.changeType === "negative"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  {stat.change}
                </span>{" "}
                지난 업데이트 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                  {activity.status === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crawler Status */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>크롤러 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crawlerStatus.map((crawler) => (
                <div
                  key={crawler.platform}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        crawler.status === "success"
                          ? "bg-green-500"
                          : crawler.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{crawler.platform}</p>
                      <p className="text-xs text-muted-foreground">
                        {crawler.lastRun}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      crawler.songs > 0 ? "default" : "secondary"
                    }
                  >
                    {crawler.songs}곡
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Activity className="mr-2 h-4 w-4" />
                자세히 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <ExternalLink className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm">링크 관리</span>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm">메인 곡 설정</span>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm">이미지 업로드</span>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <Activity className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm">시스템 상태</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}