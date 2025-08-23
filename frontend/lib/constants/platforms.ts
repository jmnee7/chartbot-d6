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
    url: "https://www.melon.com/album/detail.htm?albumId=11796328",
    deeplinks: {
      android: [
        {
          label: "#1",
          uri: "melonapp://play?menuid=0&ctype=1&cid=38892497,38892498,37323944,37946921,31927275,37946922",
          idParamKey: "cid",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#2",
          uri: "melonapp://play?menuid=0&ctype=1&cid=38892497,38892498,30232719,37946921,37323943",
          idParamKey: "cid",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#3",
          uri: "melonapp://play?menuid=0&ctype=1&cid=37946927,38892497,38892498,37323944,7844374,37946924,37946920",
          idParamKey: "cid",
          idSeparator: ",",
          dedupeIds: true,
        },
      ],
      ios: [
        {
          label: "iOS 세트",
          uri: "melonapp://play?menuid=0&ctype=1&cid=38892497,38892498,37323944,37946921,31927275,37946922,38892497,38892498,30232719,37946921,37323943,37946927,38892497,38892498,37323944,7844374,37946924,37946920",
          idParamKey: "cid",
          idSeparator: ",",
          dedupeIds: false,
        },
      ],
      pc: [
        {
          label: "#1",
          uri: "melonapp://play?ctype=1&menuid=1000002721&cList=38892497,38892498,37323944,37946921,31927275,37946922",
          idParamKey: "cList",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#2",
          uri: "melonapp://play?ctype=1&menuid=1000002721&cList=38892497,38892498,30232719,37946921,37323943",
          idParamKey: "cList",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#3",
          uri: "melonapp://play?ctype=1&menuid=1000002721&cList=37946927,38892497,38892498,37323944,7844374,37946924,37946920",
          idParamKey: "cList",
          idSeparator: ",",
          dedupeIds: true,
        },
      ],
    },
    color: "bg-[var(--mint-primary)]",
    category: "music",
    note: "중복곡 허용X, 순서대로 클릭",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/streaming/genie-logo.jpg",
    url: "https://mw.genie.co.kr/detail/albumInfo?axnm=86234533",
    deeplinks: {
      android: [
        {
          label: "지니(안드)",
          uri: "cromegenie://scan/?landing_type=31&landing_target=110009288;110009289;105757622;107632311;89220627;107632312;110009288;110009289;86931930;107632311;105757621;107632317;110009288;110009289;105757622;84964153;107632314;107632310",
          idParamKey: "landing_target",
          idSeparator: ";",
          dedupeIds: false,
        },
      ],
      ios: [
        {
          label: "지니(iOS)",
          uri: "ktolleh00167://landing/?landing_type=31&landing_target=110009288;110009289;105757622;107632311;89220627;107632312;110009288;110009289;86931930;107632311;105757621;107632317;110009288;110009289;105757622;84964153;107632314;107632310",
          idParamKey: "landing_target",
          idSeparator: ";",
          dedupeIds: false,
        },
      ],
      pc: [
        {
          label: "지니(PC)",
          uri: "https://www.genie.co.kr/player/shareProcessV2?xgnm=110009288;110009289;105757622;107632311;89220627;107632312;110009288;110009289;86931930;107632311;105757621;107632317;110009288;110009289;105757622;84964153;107632314;107632310",
          idParamKey: "xgnm",
          idSeparator: ";",
          dedupeIds: false,
        },
      ],
    },
    color: "bg-[var(--mint-dark)]",
    category: "music",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/streaming/bugs-logo.jpeg",
    url: "https://music.bugs.co.kr/album/20724195",
    deeplinks: {
      android: [
        {
          label: "벅스(모바일앱)",
          uri: "bugs3://app/tracks/lists?title=전체듣기&miniplay=Y&track_ids=33526777|33526778|33122825|33284304|31650949|33284305|33526777|33526778|30540153|33284304|33122824|33284310|33526777|33526778|33122825|4551006|33284307|33284303",
          idParamKey: "track_ids",
          idSeparator: "|",
          dedupeIds: false,
        },
      ],
      ios: [
        {
          label: "벅스(모바일앱)",
          uri: "bugs3://app/tracks/lists?title=전체듣기&miniplay=Y&track_ids=33526777|33526778|33122825|33284304|31650949|33284305|33526777|33526778|30540153|33284304|33122824|33284310|33526777|33526778|33122825|4551006|33284307|33284303",
          idParamKey: "track_ids",
          idSeparator: "|",
          dedupeIds: false,
        },
      ],
      pc: [
        {
          label: "벅스(PC)",
          uri: "https://music.bugs.co.kr/newPlayer?trackId=33526777,33526778,33122825,33284304,31650949,33284305,33526777,33526778,30540153,33284304,33122824,33284310,33526777,33526778,33122825,4551006,33284307,33284303",
          idParamKey: "trackId",
          idSeparator: ",",
          dedupeIds: false,
        },
      ],
    },
    color: "bg-gradient-to-r from-[var(--mint-primary)] to-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/streaming/vibe-logo.png",
    url: "https://vibe.naver.com/search?query=DAY6",
    deeplinks: {
      android: [
        {
          label: "#1",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,83681270,86961440,27852478,86961441",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#2",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,16081363,86961440,83681269,86961446",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#3",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,83681270,5701361,86961443,86961439",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
      ],
      ios: [
        {
          label: "#1",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,83681270,86961440,27852478,86961441",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#2",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,16081363,86961440,83681269,86961446",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
        {
          label: "#3",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,83681270,5701361,86961443,86961439",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
      ],
      pc: [
        {
          label: "앱 스킴",
          uri: "vibe://listen?version=3&trackIds=93668872,93668873,83681270,86961440,27852478,86961441",
          idParamKey: "trackIds",
          idSeparator: ",",
          dedupeIds: true,
        },
      ],
    },
    color: "bg-[var(--mint-light)]",
    category: "music",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/streaming/FLO-logo.png",
    url: "https://www.music-flo.com/detail/album/437566658/albumtrack",
    deeplinks: {
      android: [
        {
          label: "플로",
          uri: "flomusic://play/track?ids=538889145,538889146,497881291,512780061,427164276,512780062,538889145,538889146,30540153,512780061,497881290,512780067,538889145,538889146,497881291,4551006,512780064,512780060",
          dedupeIds: false,
        },
      ],
      ios: [
        {
          label: "플로",
          uri: "flomusic://play/track?ids=538889145,538889146,497881291,512780061,427164276,512780062,538889145,538889146,30540153,512780061,497881290,512780067,538889145,538889146,497881291,4551006,512780064,512780060",
          dedupeIds: false,
        },
      ],
      pc: [],
    },
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
