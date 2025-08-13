"use client";

import { ExternalLink, Radio, Clock, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const radioStations = [
  {
    id: "kbs",
    name: "KBS 쿨FM",
    programs: [
      {
        name: "박명수의 라디오쇼",
        time: "평일 12:00-14:00",
        url: "https://www.kbs.co.kr/radio/coolfm/radioshow",
      },
      {
        name: "옥상달빛의 밤편지",
        time: "평일 24:00-02:00",
        url: "https://www.kbs.co.kr/radio/coolfm/letter",
      },
    ],
    color: "bg-blue-500",
  },
  {
    id: "mbc",
    name: "MBC FM4U",
    programs: [
      {
        name: "정오의 희망곡",
        time: "평일 12:00-14:00",
        url: "https://www.imbc.com/broad/radio/fm4u/hope",
      },
      {
        name: "배철수의 음악캠프",
        time: "평일 20:00-22:00",
        url: "https://www.imbc.com/broad/radio/fm/camp",
      },
    ],
    color: "bg-green-500",
  },
  {
    id: "sbs",
    name: "SBS 파워FM",
    programs: [
      {
        name: "두시탈출 컬투쇼",
        time: "평일 14:00-16:00",
        url: "https://www.sbs.co.kr/radio/cultwoshow",
      },
      {
        name: "이국주의 영스트리트",
        time: "평일 18:00-20:00",
        url: "https://www.sbs.co.kr/radio/youngstreet",
      },
    ],
    color: "bg-red-500",
  },
];

const radioTips = [
  "사연과 함께 신청하면 선곡 확률이 높아져요",
  "여러 프로그램에 동시 신청 가능해요",
  "매일 꾸준히 신청하는 것이 중요해요",
  "최신곡과 인기곡을 골고루 신청해주세요",
];

export default function RadioPage() {
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              라디오 신청
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              각종 라디오 프로그램에 DAY6 신곡 신청
            </p>
          </div>
          <div className="text-gray-300"></div>
        </div>

        {/* Current Status */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Radio className="w-4 h-4" />
                <span>라디오 신청</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                DAY6 신곡 라디오 신청
              </h3>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">매일 신청 가능</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Radio Stations Grid */}
        <div className="grid grid-cols-1 gap-4">
          {radioStations.map((station) => (
            <Card
              key={station.id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-0">
                <div className="p-3 md:p-6 space-y-4">
                  {/* Station Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${station.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <Radio className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {station.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {station.programs.length}개 프로그램
                      </p>
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {station.programs.map((program, index) => (
                      <Button
                        key={index}
                        asChild
                        variant="ghost"
                        className="justify-between p-3 h-auto border border-gray-100 hover:border-gray-200"
                      >
                        <a
                          href={program.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="text-left">
                            <div className="text-sm font-medium text-gray-700">
                              {program.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {program.time}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Radio Request Tips */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 mb-2">
                  라디오 신청 팁
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  {radioTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Contact Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">전화 신청</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• KBS 쿨FM: 02-781-1007</div>
                  <div>• MBC FM4U: 02-789-2580</div>
                  <div>• SBS 파워FM: 02-2061-0103</div>
                  <div className="text-xs text-blue-600 mt-2">
                    ※ 프로그램 방송 시간에만 연결됩니다
                  </div>
                </div>
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
