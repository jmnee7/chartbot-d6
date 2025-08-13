export interface MusicShow {
  id: string;
  name: string;
  channel: string;
  schedule: string;
  votingMethod: string;
  icon: string;
  color: string;
  description: string;
  votingPeriod?: string;
}

export const MUSIC_SHOWS: MusicShow[] = [
  {
    id: "the-show",
    name: "더쇼",
    channel: "SBS M",
    schedule: "매주 화요일 오후 6시",
    votingMethod: "스타플래닛",
    icon: "🎤",
    color: "bg-purple-500",
    description: "SBS M 더쇼 1위 투표",
    votingPeriod: "일요일 ~ 월요일",
  },
  {
    id: "show-champion",
    name: "쇼챔피언",
    channel: "MBC M",
    schedule: "매주 수요일 오후 6시",
    votingMethod: "아이돌챔프",
    icon: "🏆",
    color: "bg-blue-500",
    description: "MBC M 쇼챔피언 1위 투표",
    votingPeriod: "월요일 ~ 화요일",
  },
  {
    id: "mcountdown",
    name: "엠카운트다운",
    channel: "Mnet",
    schedule: "매주 목요일 오후 6시",
    votingMethod: "Mnet Plus",
    icon: "📺",
    color: "bg-pink-500",
    description: "Mnet 엠카운트다운 1위 투표",
    votingPeriod: "금요일 ~ 월요일",
  },
  {
    id: "music-bank",
    name: "뮤직뱅크",
    channel: "KBS2",
    schedule: "매주 금요일 오후 5시",
    votingMethod: "뮤빗",
    icon: "🎵",
    color: "bg-red-500",
    description: "KBS 뮤직뱅크 1위 투표",
    votingPeriod: "월요일 ~ 목요일",
  },
  {
    id: "show-music-core",
    name: "쇼! 음악중심",
    channel: "MBC",
    schedule: "매주 토요일 오후 3시 15분",
    votingMethod: "사전투표 없음",
    icon: "🎸",
    color: "bg-green-500",
    description: "MBC 쇼! 음악중심",
    votingPeriod: "사전투표 없음",
  },
  {
    id: "inkigayo",
    name: "인기가요",
    channel: "SBS",
    schedule: "매주 일요일 오후 3시 40분",
    votingMethod: "사전투표 없음",
    icon: "🎹",
    color: "bg-yellow-500",
    description: "SBS 인기가요",
    votingPeriod: "사전투표 없음",
  },
];

export function getMusicShowById(id: string): MusicShow | undefined {
  return MUSIC_SHOWS.find((show) => show.id === id);
}

export function getMusicShowsWithVoting(): MusicShow[] {
  return MUSIC_SHOWS.filter((show) => show.votingMethod !== "사전투표 없음");
}
