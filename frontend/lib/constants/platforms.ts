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
    url: "https://www.melon.com/artist/timeline.htm?artistId=261143",
    color: "bg-[var(--mint-primary)]",
    category: "music",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/streaming/genie-logo.jpg",
    url: "https://www.genie.co.kr/detail/artistInfo?xxartistId=80240",
    color: "bg-[var(--mint-dark)]",
    category: "music",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    url: "https://music.bugs.co.kr/artist/80086",
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/streaming/vibe-logo.png",
    url: "https://vibe.naver.com/artist/12055",
    color: "bg-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/streaming/FLO-logo.png",
    url: "https://www.music-flo.com/detail/artist/eyunnqoyqx",
    color: "bg-gradient-to-br from-[var(--mint-primary)] to-[var(--navy-dark)]",
    category: "music",
  },
  {
    id: "youtube-music",
    name: "유튜브뮤직",
    logo: "/streaming/youtube-music-logo.png",
    url: "https://music.youtube.com/channel/UCp-pqXsizklX3ZHvLxXyhxw",
    color: "bg-[var(--mint-dark)]",
    category: "music",
  },
  {
    id: "spotify",
    name: "스포티파이",
    logo: "/streaming/spotify-logo.png",
    url: "https://open.spotify.com/artist/5TnQc2N1iKlFjYD7CPGvFc",
    color: "bg-[var(--mint-primary)]",
    category: "music",
  },
];

export const MV_PLATFORMS: Platform[] = [
  {
    id: "youtube",
    name: "유튜브",
    logo: "/streaming/youtube-logo.avif",
    url: "https://www.youtube.com/@day6official",
    color: "bg-[var(--mint-dark)]",
    category: "mv",
  },
];

export const DOWNLOAD_PLATFORMS: Platform[] = [
  {
    id: "melon",
    name: "멜론",
    logo: "/streaming/melon-logo.png",
    url: "https://www.melon.com/artist/song.htm?artistId=261143",
    color: "bg-[var(--mint-primary)]",
    category: "download",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/streaming/genie-logo.jpg",
    url: "https://www.genie.co.kr/detail/artistInfo?xxartistId=80240",
    color: "bg-[var(--mint-dark)]",
    category: "download",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    url: "https://music.bugs.co.kr/artist/80086",
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "download",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/streaming/vibe-logo.png",
    url: "https://vibe.naver.com/artist/12055",
    color: "bg-[var(--mint-light)]",
    category: "download",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/streaming/FLO-logo.png",
    url: "https://www.music-flo.com/detail/artist/eyunnqoyqx",
    color: "bg-gradient-to-br from-[var(--mint-primary)] to-[var(--navy-dark)]",
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
