export interface Award {
  id: string;
  name: string;
  organizer: string;
  date: string;
  votingPlatform: string;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
}

export const AWARDS: Award[] = [
  {
    id: "mama",
    name: "MAMA Awards",
    organizer: "Mnet",
    date: "2024년 11월",
    votingPlatform: "Mnet Plus",
    icon: "🏅",
    color: "bg-red-600",
    description: "아시아 최대 음악 시상식",
    isActive: false,
  },
  {
    id: "mma",
    name: "Melon Music Awards",
    organizer: "Melon",
    date: "2024년 12월",
    votingPlatform: "멜론",
    icon: "🎯",
    color: "bg-green-600",
    description: "멜론 뮤직 어워드",
    isActive: false,
  },
  {
    id: "gda",
    name: "Golden Disc Awards",
    organizer: "일간스포츠",
    date: "2025년 1월",
    votingPlatform: "공식 홈페이지",
    icon: "💿",
    color: "bg-yellow-600",
    description: "골든디스크 시상식",
    isActive: false,
  },
  {
    id: "sma",
    name: "Seoul Music Awards",
    organizer: "스포츠서울",
    date: "2025년 1월",
    votingPlatform: "공식 홈페이지",
    icon: "🌟",
    color: "bg-blue-600",
    description: "서울가요대상",
    isActive: false,
  },
  {
    id: "aaa",
    name: "Asia Artist Awards",
    organizer: "스타뉴스",
    date: "2024년 12월",
    votingPlatform: "공식 홈페이지",
    icon: "🎪",
    color: "bg-purple-600",
    description: "아시아 아티스트 어워즈",
    isActive: false,
  },
  {
    id: "the-fact",
    name: "THE FACT Music Awards",
    organizer: "THE FACT",
    date: "2024년 10월",
    votingPlatform: "공식 홈페이지",
    icon: "🎭",
    color: "bg-orange-600",
    description: "더팩트 뮤직 어워즈",
    isActive: false,
  },
];

export function getAwardById(id: string): Award | undefined {
  return AWARDS.find((award) => award.id === id);
}

export function getActiveAwards(): Award[] {
  return AWARDS.filter((award) => award.isActive);
}
