// 가이드 데이터/타입 (필요 시 이 파일만 수정)
export type GuideCategory = {
  slug: string; // 2뎁스 라우트용 (/guide/[slug])
  label: string; // 탭 라벨
  date?: string; // YYYY.MM.DD (없으면 자동 오늘 표기)
  link?: string; // 헤더의 링크 아이콘 대상(공지/원문 등)
  heroImage?: string; // 1뎁스 큰 이미지
  images?: string[]; // 2뎁스 상세 이미지들
  cta?: { label: string; href: string; external?: boolean }; // 하단 버튼
  category?: "streaming" | "download" | "voting" | "radio" | "support"; // 카테고리 분류
  subcategory?:
    | "streaming-list"
    | "music-streaming"
    | "mv-streaming"
    | "music-download"
    | "mv-download"
    | "music-show"
    | "awards"; // 서브카테고리
  subcategories?: GuideCategory[]; // 서브 카테고리 (투표 하위 항목들)
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  // ===== 1. 스트리밍 가이드 (음원 스트리밍) =====
  {
    slug: "melon",
    label: "멜론",
    heroImage: "/streaming/music/Guide_melon.png",
    images: ["/streaming/music/Guide_melon.png"],
    cta: {
      label: "멜론으로 이동",
      href: "https://www.melon.com/album/detail.htm?albumId=11796328",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "genie",
    label: "지니",
    heroImage: "/streaming/music/Guide_Genie.png",
    images: ["/streaming/music/Guide_Genie.png"],
    cta: {
      label: "지니로 이동",
      href: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "bugs",
    label: "벅스",
    heroImage: "/streaming/music/Guide_Bugs.png",
    images: ["/streaming/music/Guide_Bugs.png"],
    cta: {
      label: "벅스로 이동",
      href: "https://music.bugs.co.kr/album/20724195",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "vibe",
    label: "바이브",
    heroImage: "/streaming/music/Guide_Vibe.png",
    images: ["/streaming/music/Guide_Vibe.png"],
    cta: {
      label: "바이브로 이동",
      href: "https://vibe.naver.com/search?query=DAY6",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "flo",
    label: "플로",
    heroImage: "/streaming/music/Guide_Flo.png",
    images: ["/streaming/music/Guide_Flo.png"],
    cta: {
      label: "플로로 이동",
      href: "http://bit.ly/4iNKK4I",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "youtube",
    label: "유튜브 뮤직",
    heroImage: "/streaming/music/Guide_youtube.png",
    images: ["/streaming/music/Guide_youtube.png"],
    cta: {
      label: "YouTube로 이동",
      href: "https://www.youtube.com/watch?v=0fyZqS0N19o",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "apple-music",
    label: "애플뮤직",
    heroImage: "/guide/apple-music-streming.jpg",
    images: ["/guide/apple-music-streming.jpg"],
    cta: {
      label: "Apple Music으로 이동",
      href: "https://music.apple.com/us/album/maybe-tomorrow-single/1810090445",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "spotify",
    label: "스포티파이",
    heroImage: "/guide/spotify-streamint.jpg",
    images: ["/guide/spotify-streamint.jpg"],
    cta: {
      label: "Spotify로 이동",
      href: "https://open.spotify.com/album/2HhzHLoaQWdkvPQjoopUy6",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "station-head",
    label: "스테이션헤드",
    heroImage: "/streaming/music/Guide_stationhead.png",
    images: ["/streaming/music/Guide_stationhead.png"],
    cta: {
      label: "스테이션헤드 다운로드",
      href: "https://stationhead.com/day6strmteam",
      external: true,
    },
    category: "streaming",
  },

  // ===== 2. 다운로드 가이드 =====
  // 2-1. 음원 다운로드
  {
    slug: "download-melon",
    label: "멜론",
    heroImage: "/download/music/melon-download-1.jpg",
    images: [
      "/download/music/melon-download-1.jpg",
      "/download/music/melon-download-2.jpg",
    ],
    cta: {
      label: "멜론 다운로드",
      href: "https://www.melon.com/song/detail.htm?songId=38892497",
      external: true,
    },
    category: "download",
  },
  {
    slug: "download-genie",
    label: "지니",
    heroImage: "/download/music/genie-download-1.jpg",
    images: [
      "/download/music/genie-download-1.jpg",
      "/download/music/genie-download-2.jpg",
    ],
    cta: {
      label: "지니 다운로드",
      href: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
      external: true,
    },
    category: "download",
  },
  {
    slug: "download-bugs",
    label: "벅스",
    heroImage: "/download/music/bugs-download-1.jpg",
    images: [
      "/download/music/bugs-download-1.jpg",
      "/download/music/bugs-download-2.jpg",
    ],
    cta: {
      label: "벅스 다운로드",
      href: "https://music.bugs.co.kr/track/33526777",
      external: true,
    },
    category: "download",
  },
  {
    slug: "download-vibe",
    label: "바이브",
    heroImage: "/download/music/vibe-download.png",
    images: ["/download/music/vibe-download.png"],
    cta: {
      label: "바이브 다운로드",
      href: "https://vibe.naver.com/artist/455339",
      external: true,
    },
    category: "download",
  },

  {
    slug: "download-kakao",
    label: "카카오뮤직",
    heroImage: "/download/music/kakao-music-download.jpg",
    images: ["/download/music/kakao-music-download.jpg"],
    cta: {
      label: "카카오뮤직 다운로드",
      href: "https://kakaomusic.kakao.com/bridge/music_room?mrId=18952246&version=v11&channelId=URL&contentId=18952246",
      external: true,
    },
    category: "download",
  },
  {
    slug: "vcoloring",
    label: "V컬러링",
    heroImage: "/download/music/v-coloring-download.png",
    images: ["/download/music/v-coloring-download.png"],
    cta: {
      label: "V컬러링 설정하기",
      href: "https://www.vcoloring.com/outlink/join_pc.html",
      external: true,
    },
    category: "download",
  },

  // 2-2. MV 다운로드
  {
    slug: "download-mv-melon",
    label: "멜론 뮤비",
    heroImage: "/download/mv/melon-mv-download.png",
    images: ["/download/mv/melon-mv-download.png"],
    cta: {
      label: "멜론 뮤비 다운로드",
      href: "https://www.melon.com/video/detail2.htm?mvId=50280400&menuId=26020105",
      external: true,
    },
    category: "download",
  },
  {
    slug: "download-mv-bugs",
    label: "벅스 뮤비",
    heroImage: "/download/mv/bugs-mv-download.png",
    images: ["/download/mv/bugs-mv-download.png"],
    cta: {
      label: "벅스 뮤비 다운로드",
      href: "https://music.bugs.co.kr/mv/632091",
      external: true,
    },
    category: "download",
  },

  // ===== 3. 투표 가이드 =====
  // 3-1. 음악방송 투표 (사이드바 순서대로)
  {
    slug: "theshow-vote",
    label: "더쇼 투표",
    date: "2025.08.15",
    heroImage: "/vote/music-shows/the-show.png",
    images: ["/vote/music-shows/the-show.png"],
    cta: {
      label: "더쇼 앱 다운로드",
      href: "https://apps.apple.com/kr/app/%EC%8A%A4%ED%83%80-%ED%94%8C%EB%9E%98%EB%8B%9B-sbs-m-%EB%8D%94-%EC%87%BC-%EB%8D%94-%ED%8A%B8%EB%A1%AF%EC%87%BC-%ED%88%AC%ED%91%9C/id1377584935",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "showchampion-vote",
    label: "쇼챔 투표",
    date: "2025.08.15",
    heroImage: "/vote/music-shows/show-champion.png",
    images: ["/vote/music-shows/show-champion.png"],
    cta: {
      label: "쇼챔피언 투표하기",
      href: "https://m.mbcplus.com/web/program/contentList.do?searchCondition=001002&programMenuSeq=176&programInfoSeq=67",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "mcount-vote",
    label: "엠카 투표",
    date: "2025.08.15",
    heroImage: "/vote/music-shows/mcountdown.png",
    images: ["/vote/music-shows/mcountdown.png"],
    cta: {
      label: "엠넷플러스 앱 다운로드",
      href: "https://share.mnetplus.world/download?hl=en",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "musicbank-vote",
    label: "뮤뱅 투표",
    date: "2025.08.15",
    heroImage: "/vote/music-shows/music-bank.png",
    images: ["/vote/music-shows/music-bank.png"],
    cta: {
      label: "뮤직뱅크 투표하기",
      href: "https://program.kbs.co.kr/2tv/enter/musicbank/pc/index.html",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "musiccore-vote",
    label: "음중 투표",
    date: "2025.08.15",
    heroImage: "/vote/music-shows/music-core.png",
    images: ["/vote/music-shows/music-core.png"],
    cta: {
      label: "음악중심 투표하기",
      href: "https://program.imbc.com/Info/musiccore?seq=5",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "inkigayo-vote",
    label: "인가 투표",
    date: "2025.08.15",
    heroImage: "/vote/music-shows/inkigayo.png",
    images: ["/vote/music-shows/inkigayo.png"],
    cta: {
      label: "SBS NOW 앱 다운로드",
      href: "https://now.sbs.co.kr/now_web/main.html",
      external: true,
    },
    category: "voting",
  },

  // ===== 4. 라디오 신청 가이드 =====
  {
    slug: "radio-sbs",
    label: "SBS 라디오",
    heroImage: "/radio/sbs-radio.jpg",
    images: ["/radio/sbs-radio.jpg"],
    cta: {
      label: "SBS 라디오 신청하기",
      href: "https://www.sbs.co.kr/",
      external: true,
    },
    category: "radio",
  },
  {
    slug: "radio-kbs",
    label: "KBS 라디오",
    heroImage: "/radio/kbs-radio.jpg",
    images: ["/radio/kbs-radio.jpg"],
    cta: {
      label: "KBS 라디오 신청하기",
      href: "https://www.kbs.co.kr/",
      external: true,
    },
    category: "radio",
  },
  {
    slug: "radio-mbc",
    label: "MBC 라디오",
    heroImage: "/radio/mbc-radio.jpg",
    images: ["/radio/mbc-radio.jpg"],
    cta: {
      label: "MBC 라디오 신청하기",
      href: "https://www.imbc.com/",
      external: true,
    },
    category: "radio",
  },

  // ===== 5. 서포트 가이드 =====
  {
    slug: "album-group-order",
    label: "앨범 구매처",
    heroImage: "/support/album-group-order.jpg",
    images: ["/support/album-group-order.jpg"],
    cta: {
      label: "앨범 구매처 참여하기",
      href: "#",
      external: false,
    },
    category: "support",
  },
  {
    slug: "id-donation",
    label: "아이디 기부",
    heroImage: "/support/id-donation.jpg",
    images: ["/support/id-donation.jpg"],
    cta: {
      label: "아이디 기부 참여하기",
      href: "#",
      external: false,
    },
    category: "support",
  },
];
