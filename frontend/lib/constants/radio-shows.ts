export interface RadioShow {
  id: string;
  name: string;
  station: string;
  requestType: "web" | "sms" | "phone";
  requestUrl?: string;
  smsNumber?: string;
  phoneNumber?: string;
  schedule: string;
  description: string;
  color: string;
  icon: string;
}

export const RADIO_SHOWS: RadioShow[] = [
  {
    id: "kbs-kpop-connection",
    name: "K-POP Connection",
    station: "KBS World",
    requestType: "web",
    requestUrl:
      "https://world.kbs.co.kr/service/program_songrequest_view.htm?bbs=kpop_conn_song&lang=e&no=48370&procode=kpop_conn",
    schedule: "글로벌 프로그램",
    description: "영어로도 신청 가능한 글로벌 K-POP 신청 프로그램",
    color: "bg-blue-500",
    icon: "🌏",
  },
  {
    id: "mbc-good-morning-fm",
    name: "굿모닝 FM 테이입니다",
    station: "MBC",
    requestType: "web",
    requestUrl:
      "https://www.imbc.com/broad/radio/fm4u/morningfm/requestsong/index.html",
    smsNumber: "8000",
    schedule: "평일 아침",
    description: "문자 #8000으로도 참여 가능",
    color: "bg-green-500",
    icon: "☀️",
  },
  {
    id: "mbc-idol-station",
    name: "아이돌 스테이션",
    station: "MBC",
    requestType: "web",
    requestUrl:
      "https://www.imbc.com/broad/radio/fm/idolstation/request/index.html",
    schedule: "아이돌 전문 프로그램",
    description: "아이돌 팬들을 위한 전용 신청 코너",
    color: "bg-purple-500",
    icon: "💫",
  },
  {
    id: "sbs-power-time",
    name: "파워타임",
    station: "SBS",
    requestType: "web",
    requestUrl: "https://programs.sbs.co.kr/radio/powertime/boards/57973",
    schedule: "매일 진행",
    description: "사연과 신청곡을 받는 대표 프로그램",
    color: "bg-red-500",
    icon: "⚡",
  },
  {
    id: "sbs-cultwo-show",
    name: "두시탈출 컬투쇼",
    station: "SBS",
    requestType: "web",
    requestUrl: "https://programs.sbs.co.kr/radio/cultwoshow/boards/58047",
    schedule: "평일 오후 2시",
    description: "사연 접수 및 생방송 방청 신청 가능",
    color: "bg-orange-500",
    icon: "🎭",
  },
  {
    id: "sbs-king-castle-power",
    name: "황제성의 황제파워",
    station: "SBS",
    requestType: "web",
    requestUrl: "https://programs.sbs.co.kr/radio/kingcastlepower/main",
    schedule: "주말 프로그램",
    description: "문자 사연, 전화 연결 등 다양한 참여 방식",
    color: "bg-yellow-500",
    icon: "👑",
  },
];

export function getRadioShowById(id: string): RadioShow | undefined {
  return RADIO_SHOWS.find((show) => show.id === id);
}

export function getRadioShowsByType(
  type: RadioShow["requestType"]
): RadioShow[] {
  return RADIO_SHOWS.filter((show) => show.requestType === type);
}
