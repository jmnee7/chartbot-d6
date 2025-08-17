// 앱 설정
export const APP_CONFIG = {
  name: "",
  artist: "DAY6",
  displayName: "DAY6 STRM",
  description: "데이식스 음원총공팀",
  fullDescription: "DAY6 음원 차트 실시간 추적 및 스트리밍/투표 지원 서비스",
  copyright: `© ${new Date().getFullYear()} `,
  tagline: "DAY6 팬덤을 위한 비영리 프로젝트",
} as const;

// 소셜 미디어 해시태그
export const HASHTAGS = {
  official: "#DAY6 #데이식스",
  streaming: "#DAY6스트리밍 #MyDay",
  voting: "#DAY6투표 #MyDay응원",
} as const;

// DAY6 공식 채널 설정
export const DAY6_OFFICIAL = {
  twitter: {
    handle: "@DAY6Official",
    url: "https://twitter.com/DAY6Official",
  },
  youtube: {
    channelName: "DAY6 Official",
    url: "https://www.youtube.com/c/DAY6Official",
  },
  website: {
    name: "JYP 공식 웹사이트",
    url: "https://day6.jype.com",
  },
  wiki: {
    name: "DAY6 Wikipedia",
    url: "https://en.wikipedia.org/wiki/Day6",
  },
  // 음총팀 채널
  fanStreamTeam: {
    musicwave: {
      name: "음총팀 뮤직웨이브 채널",
      url: "https://kko.kakao.com/q2UMCC03-4",
    },
    stationhead: {
      name: "음총팀 스테이션헤드 채널",
      url: "https://stationhead.com/day6strmteam",
    },
    youtube: {
      name: "음총팀 유튜브 채널",
      url: "https://youtube.com/@day6_stream?si=Z2HBzbbAJgaNM4LM",
    },
  },
} as const;

// YouTube 설정
export const YOUTUBE_CONFIG = {
  channelUrl: DAY6_OFFICIAL.youtube.url,
  videos: [
    {
      id: "maybe-tomorrow",
      title: "Maybe Tomorrow",
      type: "MV",
      url: DAY6_OFFICIAL.youtube.url, // 최신 MV로 업데이트 예정
      isLatest: true,
    },
    {
      id: "melt-down",
      title: "Melt Down",
      type: "MV",
      url: "https://youtu.be/uFqJDgIaNNg",
    },
    {
      id: "happy",
      title: "HAPPY",
      type: "MV",
      url: "https://youtu.be/ooxqwAc1dIg",
    },
    {
      id: "welcome-to-the-show",
      title: "Welcome to the Show",
      type: "MV",
      url: "https://youtu.be/3wdWk8Ph9hQ",
    },
    {
      id: "you-were-beautiful",
      title: "You Were Beautiful",
      type: "MV",
      url: "https://youtu.be/BS7tz2rAOSA",
    },
    {
      id: "congratulations",
      title: "Congratulations",
      type: "MV",
      url: "https://youtu.be/x3sFsHrUyLQ",
    },
  ],
} as const;

// 스트리밍 플랫폼 설정
export const STREAMING_PLATFORMS = {
  melon: {
    id: "melon",
    name: "멜론",
    url: "https://www.melon.com",
    chartUrl: "https://www.melon.com/chart/index.htm",
    color: "bg-green-500",
    icon: "🎵",
    isActive: true,
  },
  genie: {
    id: "genie",
    name: "지니뮤직",
    url: "https://www.genie.co.kr",
    chartUrl: "https://www.genie.co.kr/chart/top200",
    color: "bg-blue-500",
    icon: "🎶",
    isActive: true,
  },
  bugs: {
    id: "bugs",
    name: "벅스뮤직",
    url: "https://music.bugs.co.kr",
    chartUrl: "https://music.bugs.co.kr/chart",
    color: "bg-orange-500",
    icon: "🐛",
    isActive: false,
  },
  vibe: {
    id: "vibe",
    name: "바이브",
    url: "https://vibe.naver.com",
    chartUrl: "https://vibe.naver.com/chart",
    color: "bg-purple-500",
    icon: "📻",
    isActive: false,
  },
  flo: {
    id: "flo",
    name: "FLO",
    url: "https://www.music-flo.com",
    chartUrl: "https://www.music-flo.com/chart",
    color: "bg-pink-500",
    icon: "🌊",
    isActive: false,
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    url: DAY6_OFFICIAL.youtube.url,
    color: "bg-red-500",
    icon: "📺",
    isActive: true,
  },
} as const;

// UI 설정
export const UI_CONFIG = {
  mobileMaxWidth: 375, // px
  sidebarWidth: 256, // px
  headerHeight: 64, // px
  colors: {
    primary: "blue-600",
    success: "green-600",
    warning: "yellow-500",
    danger: "red-600",
    gray: "gray-600",
  },
  animation: {
    duration: 300, // ms
  },
} as const;

// API 설정
export const API_CONFIG = {
  revalidateInterval: 300, // seconds (5분)
  chartUpdateInterval: 300000, // ms (5분)
  retryAttempts: 3,
  timeout: 10000, // ms
} as const;

// 날짜 포맷 설정
export const DATE_CONFIG = {
  defaultTimezone: "Asia/Seoul",
  formats: {
    date: "YYYY.MM.DD",
    datetime: "YYYY.MM.DD HH:mm",
    time: "HH:mm",
  },
} as const;

// 차트 순위 설정
export const CHART_CONFIG = {
  ranks: {
    top3: { max: 3, class: "bg-yellow-100 text-yellow-800 border-yellow-300" },
    top10: { max: 10, class: "bg-blue-100 text-blue-800 border-blue-300" },
    top50: { max: 50, class: "bg-green-100 text-green-800 border-green-300" },
    top100: {
      max: 100,
      class: "bg-orange-100 text-orange-800 border-orange-300",
    },
    default: { class: "bg-gray-100 text-gray-800 border-gray-300" },
  },
  colors: {
    up: "text-green-600",
    down: "text-red-600",
    same: "text-gray-500",
    topTen: "text-blue-600",
  },
} as const;
