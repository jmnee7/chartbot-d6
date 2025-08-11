// 가이드 데이터/타입 (필요 시 이 파일만 수정)
export type GuideCategory = {
  slug: string; // 2뎁스 라우트용 (/guide/[slug])
  label: string; // 탭 라벨
  date?: string; // YYYY.MM.DD (없으면 자동 오늘 표기)
  link?: string; // 헤더의 링크 아이콘 대상(공지/원문 등)
  heroImage?: string; // 1뎁스 큰 이미지
  images?: string[]; // 2뎁스 상세 이미지들
  cta?: { label: string; href: string; external?: boolean }; // 하단 버튼
  category?: "streaming" | "voting" | "support" | "donation" | "comeback"; // 카테고리 분류
  subcategory?: "streaming-list" | "music-streaming" | "mv-streaming" | "music-download" | "mv-download" | "music-show" | "awards"; // 서브카테고리
  subcategories?: GuideCategory[]; // 서브 카테고리 (투표 하위 항목들)
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  // === 스트리밍 ===
  // 국내 음원 플랫폼
  {
    slug: "melon",
    label: "멜론",
    heroImage: "/guide/melon-streaming.webp",
    images: ["/guide/melon-streaming.webp"],
    cta: {
      label: "멜론으로 이동",
      href: "https://www.melon.com",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "genie",
    label: "지니",
    heroImage: "/guide/genie-streaming.png",
    images: ["/guide/genie-streaming.png"],
    cta: {
      label: "지니로 이동",
      href: "https://www.genie.co.kr",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "bugs",
    label: "벅스",
    heroImage: "/guide/bugs-streaming.webp",
    images: ["/guide/bugs-streaming.webp"],
    cta: {
      label: "벅스로 이동",
      href: "https://music.bugs.co.kr",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "flo",
    label: "플로",
    heroImage: "/guide/flo-streaming.webp",
    images: ["/guide/flo-streaming.webp"],
    cta: {
      label: "플로로 이동",
      href: "https://www.music-flo.com",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "vibe",
    label: "바이브",
    heroImage: "/guide/vibe-streaming.webp",
    images: ["/guide/vibe-streaming.webp"],
    cta: {
      label: "바이브로 이동",
      href: "https://vibe.naver.com",
      external: true,
    },
    category: "streaming",
  },
  // 글로벌 음원 플랫폼
  {
    slug: "apple-music",
    label: "애플뮤직",
    heroImage: "/guide/apple-streaming.webp",
    images: ["/guide/apple-streaming.webp"],
    cta: {
      label: "Apple Music으로 이동",
      href: "https://music.apple.com",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "spotify",
    label: "스포티파이",
    heroImage: "/guide/spotify-streaming.webp",
    images: ["/guide/spotify-streaming.webp"],
    cta: {
      label: "Spotify로 이동",
      href: "https://open.spotify.com",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "youtube-music",
    label: "유튜브뮤직",
    heroImage: "/guide/youtube-streaming.png",
    images: ["/guide/youtube-streaming.png"],
    cta: {
      label: "YouTube Music으로 이동",
      href: "https://music.youtube.com",
      external: true,
    },
    category: "streaming",
  },
  {
    slug: "youtube",
    label: "유튜브 뮤직비디오",
    heroImage: "/guide/youtube-mv-streaming.webp",
    images: ["/guide/youtube-mv-streaming.webp"],
    cta: {
      label: "YouTube로 이동",
      href: "https://www.youtube.com",
      external: true,
    },
    category: "streaming",
  },

  // === 다운로드 ===
  // 음원 다운로드
  {
    slug: "download-melon",
    label: "멜론 음원",
    heroImage: "/guide/melon-download.webp",
    images: ["/guide/melon-download.webp"],
    cta: {
      label: "멜론 다운로드",
      href: "https://www.melon.com",
      external: true,
    },
    category: "support",
  },
  {
    slug: "download-genie",
    label: "지니 음원",
    heroImage: "/guide/genie-download.jpg",
    images: ["/guide/genie-download.jpg"],
    cta: {
      label: "지니 다운로드",
      href: "https://www.genie.co.kr",
      external: true,
    },
    category: "support",
  },
  {
    slug: "download-bugs",
    label: "벅스 음원",
    heroImage: "/guide/bugs-download.jpg",
    images: ["/guide/bugs-download.jpg"],
    cta: {
      label: "벅스 다운로드",
      href: "https://music.bugs.co.kr",
      external: true,
    },
    category: "support",
  },
  {
    slug: "download-vibe",
    label: "바이브 음원",
    heroImage: "/guide/vibe-download.webp",
    images: ["/guide/vibe-download.webp"],
    cta: {
      label: "바이브 다운로드",
      href: "https://vibe.naver.com",
      external: true,
    },
    category: "support",
  },
  {
    slug: "download-kakao",
    label: "카카오뮤직",
    heroImage: "/guide/kakao-download.webp",
    images: ["/guide/kakao-download.webp"],
    cta: {
      label: "카카오뮤직 다운로드",
      href: "https://music.kakao.com",
      external: true,
    },
    category: "support",
  },
  // 뮤비 다운로드
  {
    slug: "download-mv-melon",
    label: "멜론 뮤비",
    heroImage: "/guide/melon-music-vedio-download.webp",
    images: ["/guide/melon-music-vedio-download.webp"],
    cta: {
      label: "멜론 뮤비 다운로드",
      href: "https://www.melon.com",
      external: true,
    },
    category: "support",
  },
  {
    slug: "download-mv-bugs",
    label: "벅스 뮤비",
    heroImage: "/guide/bugs-music-vedio-download.webp",
    images: ["/guide/bugs-music-vedio-download.webp"],
    cta: {
      label: "벅스 뮤비 다운로드",
      href: "https://music.bugs.co.kr",
      external: true,
    },
    category: "support",
  },
  // 기타 다운로드
  {
    slug: "itunes-gift",
    label: "iTunes 기프트",
    heroImage: "/guide/iTunes-giftt-download.webp",
    images: ["/guide/iTunes-giftt-download.webp"],
    cta: {
      label: "iTunes로 이동",
      href: "https://www.apple.com/itunes/",
      external: true,
    },
    category: "support",
  },
  {
    slug: "melon-gift",
    label: "멜론 기프트",
    heroImage: "/guide/melon-giftt-download.webp",
    images: ["/guide/melon-giftt-download.webp"],
    cta: {
      label: "멜론 기프트샵",
      href: "https://www.melon.com",
      external: true,
    },
    category: "support",
  },
  {
    slug: "amazon-download",
    label: "아마존 뮤직",
    heroImage: "/guide/Amozon-download.webp",
    images: ["/guide/Amozon-download.webp"],
    cta: {
      label: "Amazon Music으로 이동",
      href: "https://music.amazon.com",
      external: true,
    },
    category: "support",
  },
  // v컬러링
  {
    slug: "vcoloring",
    label: "v컬러링",
    heroImage: "/guide/v-coloring-download.webp",
    images: ["/guide/v-coloring-download.webp"],
    cta: { 
      label: "v컬러링 설정하기", 
      href: "https://www.sktelecom.com/index_real.html",
      external: true
    },
    category: "support",
  },

  // === 아이디 기부 ===
  {
    slug: "genie-donation",
    label: "지니 기부",
    heroImage: "/guide/genie-streaming.png",
    images: ["/guide/genie-streaming.png"],
    cta: { 
      label: "지니 아이디 기부하기", 
      href: "https://www.genie.co.kr",
      external: true 
    },
    category: "donation",
  },
  {
    slug: "bugs-donation",
    label: "벅스 기부",
    heroImage: "/guide/bugs-streaming.webp",
    images: ["/guide/bugs-streaming.webp"],
    cta: { 
      label: "벅스 아이디 기부하기", 
      href: "https://music.bugs.co.kr",
      external: true 
    },
    category: "donation",
  },
  
  // === 음악방송 투표 ===
  {
    slug: "inkigayo",
    label: "인기가요",
    date: "2025.08.10",
    heroImage: "/guide/famous1.webp",
    images: ["/guide/famous1.webp", "/guide/famous2.webp"],
    cta: {
      label: "인기가요 투표하기",
      href: "https://www.sbs.co.kr/now/app",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "musicbank",
    label: "뮤직뱅크",
    date: "2025.08.10",
    heroImage: "/guide/music-bank1.webp",
    images: ["/guide/music-bank1.webp", "/guide/music-bank2.webp"],
    cta: {
      label: "뮤직뱅크 투표하기",
      href: "https://www.kbs.co.kr/2tv/enter/musicbank/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "musiccore",
    label: "쇼!음악중심",
    date: "2025.08.10",
    heroImage: "/guide/show1.webp",
    images: ["/guide/show1.webp", "/guide/show2.webp"],
    cta: {
      label: "음악중심 투표하기",
      href: "https://www.imbc.com/broad/tv/ent/musiccore/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "mcountdown",
    label: "엠카운트다운",
    date: "2025.08.10",
    heroImage: "/guide/m-count1.webp",
    images: ["/guide/m-count1.webp", "/guide/m-count2.webp"],
    cta: {
      label: "엠카운트다운 투표하기",
      href: "https://www.mnet.com/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "theshow",
    label: "더쇼",
    date: "2025.08.10",
    heroImage: "/guide/the-show1.webp",
    images: ["/guide/the-show1.webp", "/guide/the-show2.webp"],
    cta: {
      label: "더쇼 투표하기",
      href: "https://theshow.sbs.co.kr/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "mubeat",
    label: "뮤빗",
    date: "2025.08.10",
    heroImage: "/guide/mubeat1.webp",
    images: ["/guide/mubeat1.webp", "/guide/mubeat2.webp"],
    cta: {
      label: "뮤빗 투표하기",
      href: "https://mubeat.com/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "allchart",
    label: "올차트",
    date: "2025.08.10",
    heroImage: "/guide/all-chart1.webp",
    images: ["/guide/all-chart1.webp", "/guide/all-chart2.webp"],
    cta: {
      label: "올차트 투표하기",
      href: "https://www.allchart.co.kr/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "linc",
    label: "LiNC",
    date: "2025.08.10", 
    heroImage: "/guide/link1.webp",
    images: ["/guide/link1.webp"],
    cta: {
      label: "LiNC 투표하기",
      href: "https://linc-app.com/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "highter",
    label: "하이어",
    date: "2025.08.10",
    heroImage: "/guide/highter1.webp", 
    images: ["/guide/highter1.webp"],
    cta: {
      label: "하이어 투표하기",
      href: "https://highter.app/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "idolchamp",
    label: "아이돌챔프",
    date: "2025.08.10",
    heroImage: "/guide/idol1.webp",
    images: ["/guide/idol1.webp", "/guide/idol2.webp", "/guide/idol3.webp"],
    cta: {
      label: "아이돌챔프 투표하기",
      href: "https://idolchamp.co.kr/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "starplanet",
    label: "스타플래닛",
    date: "2025.08.10",
    heroImage: "/guide/star-planit1.webp",
    images: ["/guide/star-planit1.webp"],
    cta: {
      label: "스타플래닛 투표하기",
      href: "https://www.starplanet.kr/",
      external: true,
    },
    category: "voting",
  },
  {
    slug: "mnetplus",
    label: "엠넷플러스",
    date: "2025.08.10",
    heroImage: "/guide/m-net1.webp",
    images: ["/guide/m-net1.webp", "/guide/m-net2.webp"],
    cta: {
      label: "엠넷플러스 투표하기",
      href: "https://www.mnet.com/",
      external: true,
    },
    category: "voting",
  },
];
