export type DeepLinkStep = {
  label: string;
  uri: string;
  idParamKey?:
    | "cid"
    | "cList"
    | "landing_target"
    | "track_ids"
    | "trackIds"
    | "xgnm"
    | "trackId";
  idSeparator?: string;
  dedupeIds?: boolean;
};

export interface Platform {
  id: string;
  name: string;
  logo: string;
  url: string;
  urls?: {
    android?: string[];
    iphone?: string[];
    pc?: string[];
  };
  color: string;
  category: "music" | "mv" | "download";
  note?: string;
  deeplinks?: {
    android?: DeepLinkStep[];
    ios?: DeepLinkStep[];
    pc?: DeepLinkStep[];
  };
}

// 주요 딥링크 지원 플랫폼 (홈페이지와 스트리밍 페이지 메인)
export const MUSIC_PLATFORMS: Platform[] = [
  {
    id: "melon",
    name: "멜론",
    logo: "/streaming/melon-logo.png",
    urls: {
      android: ["https://tinyurl.com/3v5rjazs"],
      iphone: ["https://tinyurl.com/2x4hn7kh", "https://tinyurl.com/dekaadx3"],
      pc: ["https://tinyurl.com/yx6n7nhz", "https://tinyurl.com/yc4wvr7p"],
    },
    url: "https://www.melon.com/album/detail.htm?albumId=11796328",
    color: "bg-[var(--mint-primary)]",
    category: "music",
    note: "중복곡 허용X, 순서대로 클릭",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/streaming/genie-logo.jpg",
    urls: {
      android: ["https://tinyurl.com/yckxfz2x"],
      iphone: ["https://tinyurl.com/mu8jsz4z"],
      pc: ["https://tinyurl.com/yp5ahze8"],
    },
    url: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
    color: "bg-[var(--mint-dark)]",
    category: "music",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    urls: {
      android: ["https://tinyurl.com/2s43z2aa"],
      iphone: ["https://tinyurl.com/4kcyctpm"],
      pc: ["https://tinyurl.com/48j7h2uv"],
    },
    url: "https://music.bugs.co.kr/album/20724195",
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/streaming/vibe-logo.png",
    urls: {
      android: ["https://tinyurl.com/ywjbu4rj"],
      iphone: [
        "https://tinyurl.com/bdcjjjck",
        "https://tinyurl.com/4p3v7ufh",
        "https://tinyurl.com/2j29rz9z",
      ],
    },
    url: "https://vibe.naver.com/search?query=DAY6",
    color: "bg-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/streaming/FLO-logo.png",
    urls: {
      android: ["https://tinyurl.com/57yctn5f"],
      iphone: ["https://tinyurl.com/ysrh9fzm"],
    },
    url: "https://tinyurl.com/dekaadx3",
    color: "bg-gradient-to-br from-[var(--mint-primary)] to-[var(--navy-dark)]",
    category: "music",
  },
];

// 기타 음악 플랫폼 (딥링크 미지원)
export const OTHER_MUSIC_PLATFORMS: Platform[] = [
  {
    id: "youtube-music-vedio",
    name: "유튜브 뮤비",
    logo: "/streaming/youtube-music-logo.png",
    url: "https://www.youtube.com/watch?v=0fyZqS0N19o",
    color: "bg-[var(--mint-dark)]",
    category: "music",
  },
  {
    id: "spotify",
    name: "스포티파이",
    logo: "/streaming/spotify-logo.png",
    url: "https://open.spotify.com/album/2HhzHLoaQWdkvPQjoopUy6",
    color: "bg-[var(--mint-primary)]",
    category: "music",
  },
  {
    id: "apple-music",
    name: "애플뮤직",
    logo: "/streaming/apple-music-logo.png",
    url: "https://music.apple.com/us/album/maybe-tomorrow-single/1810090445",
    color: "bg-gray-800",
    category: "music",
  },
  {
    id: "stationhead",
    name: "스테이션헤드",
    logo: "/download/music/Guide_stationhead.png",
    url: "https://stationhead.com/day6strmteam",
    color: "bg-indigo-500",
    category: "music",
  },
];

export const MV_PLATFORMS: Platform[] = [
  {
    id: "melon-mv",
    name: "멜론",
    logo: "/streaming/melon-logo.png",
    url: "https://www.melon.com/video/detail2.htm?mvId=50280400&menuId=26020105",
    color: "bg-[var(--mint-primary)]",
    category: "mv",
  },
  {
    id: "bugs-mv",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    url: "https://music.bugs.co.kr/mv/632091",
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "mv",
  },
];

export const DOWNLOAD_PLATFORMS: Platform[] = [
  {
    id: "melon",
    name: "멜론",
    logo: "/streaming/melon-logo.png",
    url: "https://www.melon.com/song/detail.htm?songId=38892497",
    color: "bg-[var(--mint-primary)]",
    category: "download",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/streaming/genie-logo.jpg",
    url: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
    color: "bg-[var(--mint-dark)]",
    category: "download",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    url: "https://music.bugs.co.kr/track/33526777",
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "download",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/streaming/vibe-logo.png",
    url: "https://vibe.naver.com/artist/455339",
    color: "bg-[var(--mint-light)]",
    category: "download",
  },
  {
    id: "kakao-music",
    name: "카카오뮤직",
    logo: "/streaming/kakao-logo.png",
    url: "https://kakaomusic.kakao.com/bridge/music_room?mrId=18952246&version=v11&channelId=URL&contentId=18952246",
    color: "bg-yellow-500",
    category: "download",
  },
  {
    id: "vcoloring",
    name: "V컬러링",
    logo: "/streaming/v-coloring.png",
    url: "https://www.vcoloring.com/outlink/join_pc.html",
    color: "bg-purple-600",
    category: "download",
  },
];

export const ALL_PLATFORMS = [
  ...MUSIC_PLATFORMS,
  ...OTHER_MUSIC_PLATFORMS,
  ...MV_PLATFORMS,
  ...DOWNLOAD_PLATFORMS,
];

export function getPlatformById(id: string): Platform | undefined {
  return ALL_PLATFORMS.find((platform) => platform.id === id);
}

export function getPlatformsByCategory(
  category: Platform["category"]
): Platform[] {
  return ALL_PLATFORMS.filter((platform) => platform.category === category);
}
