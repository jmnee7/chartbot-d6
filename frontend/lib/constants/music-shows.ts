export interface MusicShow {
  id: string;
  name: string;
  channel: string;
  schedule: string;
  votingMethod: string;
  votingApp: string;
  appDownload: {
    android?: string;
    ios?: string;
    web?: string;
  };
  programUrl?: string;
  icon: string;
  color: string;
  description: string;
  votingPeriod?: string;
  hasVoting: boolean;
  notes?: string;
  votingWindows?: string[];
}

export const MUSIC_SHOWS: MusicShow[] = [
  {
    id: "the-show",
    name: "더쇼",
    channel: "SBS M",
    schedule: "매주 화요일 오후 6시",
    votingMethod: "STAR PLANET",
    votingApp: "STAR PLANET",
    appDownload: {
      web: "https://www.thestarplanet.com/",
      android:
        "https://play.google.com/store/apps/details?id=inc.rowem.passicon",
      ios: "https://apps.apple.com/us/app/스타-플래닛-sbs-m-더-쇼-더-트롯쇼-투표/id1377584935",
    },
    icon: "🟦",
    color: "bg-purple-500",
    description: "젤리(Heart Jelly) 소모형 투표",
    votingPeriod: "(통상) 금 20:00 ~ 월 14:00 KST",
    votingWindows: ["사전투표: 금 20:00 ~ 월 14:00 KST", "실시간: 화 생방 중"],
    notes: "편성/특집에 따라 변동 가능",
    hasVoting: true,
  },
  {
    id: "show-champion",
    name: "쇼챔피언",
    channel: "MBC M",
    schedule: "매주 수요일 오후 6시",
    votingMethod: "IDOL CHAMP",
    votingApp: "IDOL CHAMP",
    appDownload: {
      web: "https://promo-web.idolchamp.com/app_proxy.html?type=vote&vote_id=vote_4473_1101&=",
      android:
        "https://play.google.com/store/apps/details?id=com.nwz.ichampclient",
      ios: "https://apps.apple.com/us/app/idolchamp/id1185735018",
    },
    icon: "🟩",
    color: "bg-blue-500",
    description: "Ruby/Time 하트 → 티켓 교환 후 투표",
    votingPeriod: "(통상) 금 20:00 ~ 월 15:00 KST",
    votingWindows: ["사전투표: 금 20:00 ~ 월 15:00 KST"],
    notes: "라이브 투표 없음(사전투표 중심)",
    hasVoting: true,
  },
  {
    id: "mcountdown",
    name: "엠카운트다운",
    channel: "Mnet",
    schedule: "매주 목요일 오후 6시",
    votingMethod: "Mnet Plus",
    votingApp: "Mnet Plus",
    appDownload: {
      web: "https://www.mnetplus.world/ko/program/m-countdown/",
    },
    icon: "🟪",
    color: "bg-pink-500",
    description: "주차별 투표 공지 페이지에서 바로 참여",
    votingPeriod: "주차별 'PRE-VOTE' 게시",
    votingWindows: [
      "사전투표: 주차별 'PRE-VOTE'",
      "실시간: 생방 중 라이브 투표",
    ],
    notes: "계정당 일일 5회 등 제한 공지 확인",
    hasVoting: true,
  },
  {
    id: "music-bank",
    name: "뮤직뱅크",
    channel: "KBS2",
    schedule: "매주 금요일 오후 5시",
    votingMethod: "ALL CHART",
    votingApp: "ALL CHART",
    appDownload: {
      web: "https://link.inpock.co.kr/allchart",
      android:
        "https://play.google.com/store/apps/details?id=com.vlending.apps.mubeat",
    },
    icon: "🟥",
    color: "bg-red-500",
    description: "ALL CHART 앱에서 투표 참여",
    votingPeriod: "월 11:00 ~ 수 11:00 KST",
    votingWindows: ["Fan Voting: 월 11:00 ~ 수 11:00 KST"],
    notes:
      "K-Chart 최종 반영 지표는 KBS 방송 후 공지(디지털/음반/방송점수 중심)",
    hasVoting: true,
  },
  {
    id: "show-music-core",
    name: "쇼! 음악중심",
    channel: "MBC",
    schedule: "매주 토요일 오후 3시 15분",
    votingMethod: "Mubeat Global Pre-Vote",
    votingApp: "Mubeat",
    appDownload: {
      web: "https://mubeat.tv/",
      android:
        "https://play.google.com/store/apps/details?id=com.vlending.apps.mubeat",
    },
    programUrl: "https://program.imbc.com/Info/musiccore?seq=5",
    icon: "🟧",
    color: "bg-green-500",
    description: "공지 기간 내 Mubeat에서 진행",
    votingPeriod: "공지 기간 내",
    votingWindows: ["사전투표: 공지 기간 내"],
    notes: "정확한 오픈/마감은 앱 공지 확인",
    hasVoting: true,
  },
  {
    id: "inkigayo",
    name: "인기가요",
    channel: "SBS",
    schedule: "매주 일요일 오후 3시 40분",
    votingMethod: "SBS 공식 게시판",
    votingApp: "SBS 프로그램 홈페이지",
    appDownload: {
      web: "https://programs.sbs.co.kr/enter/gayo/board/54771?cmd=view&page=1&board_no=8442&board_notice=Y",
    },
    programUrl: "https://programs.sbs.co.kr/enter/gayo/",
    icon: "🟥",
    color: "bg-yellow-500",
    description: "투표 공지 확인 후 참여",
    votingPeriod: "공지 확인 필요",
    votingWindows: ["투표: SBS 공식 공지 확인"],
    notes: "디지털/음반/SNS 지표도 중요 - 스트리밍·구매·MV 조회 집중",
    hasVoting: true,
  },
];

export function getMusicShowById(id: string): MusicShow | undefined {
  return MUSIC_SHOWS.find((show) => show.id === id);
}

export function getMusicShowsWithVoting(): MusicShow[] {
  return MUSIC_SHOWS.filter((show) => show.hasVoting);
}
