"use client";

import {
  ExternalLink,
  ShoppingBag,
  Heart,
  Users,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const supportItems = [
  {
    title: "앨범 공구",
    description: "함께 모여 대량 구매",
    icon: ShoppingBag,
    color: "bg-purple-500",
    links: [
      {
        name: "트위터 공구방",
        url: "https://twitter.com/search?q=DAY6%20공구",
      },
      { name: "카페 공구", url: "https://cafe.daum.net/DAY6" },
    ],
  },
  {
    title: "아이디 기부",
    description: "스트리밍 계정 기부",
    icon: Heart,
    color: "bg-red-500",
    links: [
      { name: "아이디 기부 양식", url: "#" },
      { name: "기부 현황", url: "#" },
    ],
  },
  {
    title: "헬퍼 지원",
    description: "다운로드 헬퍼 활동",
    icon: Users,
    color: "bg-blue-500",
    links: [
      { name: "헬퍼 신청", url: "#" },
      { name: "헬퍼 모집", url: "#" },
    ],
  },
  {
    title: "모금",
    description: "팬덤 모금 활동 참여",
    icon: DollarSign,
    color: "bg-yellow-500",
    subItems: [
      { name: "총공 모금", url: "#" },
      { name: "투표 모금", url: "#" },
    ],
  },
];

export default function SupportPage() {
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              서포트 활동
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6를 응원하는 다양한 방법들
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Support Grid - similar to QuickAccessCard style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <div className="p-3 md:p-6 space-y-4">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Links or Sub-items */}
                    {item.links ? (
                      <div className="grid grid-cols-1 gap-2">
                        {item.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            asChild
                            variant="ghost"
                            className="justify-between p-3 h-auto border border-gray-100 hover:border-gray-200"
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="text-sm font-medium text-gray-700">
                                {link.name}
                              </span>
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : item.subItems ? (
                      <div className="grid grid-cols-1 gap-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <Button
                            key={subIndex}
                            asChild
                            variant="ghost"
                            className="justify-between p-3 h-auto border border-gray-100 hover:border-gray-200"
                          >
                            <a href={subItem.url}>
                              <span className="text-sm font-medium text-gray-700">
                                {subItem.name}
                              </span>
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips Section - similar to homepage's alert banner style */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">
                  서포트 참여 안내
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 공식 채널을 통해서만 참여해주세요</li>
                  <li>• 개인정보 보호에 주의하며 기부해주세요</li>
                  <li>• 소액 참여도 큰 도움이 됩니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}
