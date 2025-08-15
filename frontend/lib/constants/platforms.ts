export interface Platform {
  id: string;
  name: string;
  logo: string;
  url: string;
  color: string;
  category: "music" | "mv" | "download";
}

export const MUSIC_PLATFORMS: Platform[] = [
  {
    id: "melon",
    name: "멜론",
    logo: "/streaming/melon-logo.png",
    url: "https://www.melon.com/album/detail.htm?albumId=11796328",
    color: "bg-[var(--mint-primary)]",
    category: "music",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/streaming/genie-logo.jpg",
    url: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
    color: "bg-[var(--mint-dark)]",
    category: "music",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    url: "https://music.bugs.co.kr/album/20724195",
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/streaming/vibe-logo.png",
    url: "https://vibe.naver.com/search?query=DAY6",
    color: "bg-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/streaming/FLO-logo.png",
    url: "http://bit.ly/4iNKK4I",
    color: "bg-gradient-to-br from-[var(--mint-primary)] to-[var(--navy-dark)]",
    category: "music",
  },
  {
    id: "youtube-music",
    name: "유튜브뮤직",
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
    logo: "/streaming/station-head-logo.webp",
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
