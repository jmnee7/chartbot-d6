"use client";

import { ExternalLink, Radio, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const radioStations = [
  {
    id: "kbs",
    name: "KBS",
    programs: [
      {
        name: "K-POP Connection",
        time: "글로벌 프로그램",
        url: "https://world.kbs.co.kr/service/program_songrequest_list.htm?bbs=kpop_conn_song&lang=e&procode=kpop_conn",
        description: "영어로도 신청 가능한 글로벌 K-POP 신청 프로그램",
        icon: "🌏",
      },
      {
        name: "키스 더 라디오",
        time: "KBS Cool FM",
        url: "https://program.kbs.co.kr/2fm/radio/hanhaekiss/pc/board.html?smenu=858a12&bbs_loc=R2025-0082-03-947487,list,none,1,0",
        description: "KBS 대표 아이돌·K-POP 신청 창구",
        icon: "💋",
      },
    ],
    color: "bg-blue-500",
  },
  {
    id: "mbc",
    name: "MBC",
    programs: [
      {
        name: "굿모닝 FM 테이입니다",
        time: "평일 아침",
        url: "https://www.imbc.com/broad/radio/fm4u/morningfm/requestsong/index.html",
        description: "문자 #8000으로도 참여 가능",
        icon: "☀️",
      },
      {
        name: "아이돌 스테이션",
        time: "아이돌 전문 프로그램",
        url: "https://www.imbc.com/broad/radio/fm/idolstation/request/index.html",
        description: "아이돌 팬들을 위한 전용 신청 코너",
        icon: "💫",
      },
    ],
    color: "bg-green-500",
  },
  {
    id: "sbs",
    name: "SBS",
    programs: [
      {
        name: "파워타임",
        time: "매일 진행",
        url: "https://programs.sbs.co.kr/radio/powertime/boards/57973",
        description: "사연과 신청곡을 받는 대표 프로그램",
        icon: "⚡",
      },
      {
        name: "두시탈출 컬투쇼",
        time: "평일 오후 2시",
        url: "https://programs.sbs.co.kr/radio/cultwoshow/boards/58047",
        description: "사연 접수 및 생방송 방청 신청 가능",
        icon: "🎭",
      },
      {
        name: "황제성의 황제파워",
        time: "주말 프로그램",
        url: "https://programs.sbs.co.kr/radio/kingcastlepower/boards/74230",
        description: "드디어 신청곡 받습니다 - 다양한 참여 방식 지원",
        icon: "👑",
      },
    ],
    color: "bg-red-500",
  },
];

const radioTips = [
  "DAY6 곡과 함께 짧은 사연을 작성해 주세요",
  "신청곡명과 아티스트명을 정확히 입력해 주세요",
  "방송 시간대를 확인하고 적절한 시간에 신청하세요",
  "문자 신청 시 요금이 발생할 수 있습니다",
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
                  <div className="grid grid-cols-1 gap-2">
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
                          <div className="text-left flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{program.icon}</span>
                              <div className="text-sm font-medium text-gray-700">
                                {program.name}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                              <Clock className="w-3 h-3" />
                              {program.time}
                            </div>
                            <div className="text-xs text-gray-400">
                              {program.description}
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

        {/* SMS Request Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">문자 신청</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• MBC 굿모닝 FM: 문자 #8000</div>
                  <div>• 기타 프로그램은 웹사이트에서 신청</div>
                  <div className="text-xs text-blue-600 mt-2">
                    ※ 문자 요금이 발생할 수 있습니다
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
