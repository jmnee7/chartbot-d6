export interface Award {
  id: string;
  name: string;
  organizer: string;
  date?: string;
  votingPlatform: string;
  links: {
    web?: string;
    android?: string;
    ios?: string;
  };
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
  notes?: string;
}

export const AWARDS: Award[] = [
  {
    id: "mama",
    name: "MAMA AWARDS",
    organizer: "CJ ENM",
    votingPlatform: "Mnet Plus",
    links: {
      web: "https://www.mnetplus.world/",
    },
    icon: "🏅",
    color: "bg-red-600",
    description: "공식 투표는 Mnet Plus에서 오픈되는 'Vote' 섹션 확인",
    isActive: false,
    notes: "연도별 투표 오픈 시기 확인 필요",
  },
  {
    id: "golden-disc",
    name: "골든디스크어워즈",
    organizer: "JDG",
    votingPlatform: "공식 홈페이지",
    links: {
      web: "https://www.goldendisc.co.kr/",
    },
    icon: "💿",
    color: "bg-yellow-600",
    description: "투표/팬초이스 여부는 연도별 공지 확인",
    isActive: false,
  },
  {
    id: "seoul-music",
    name: "서울가요대상 (SMA)",
    organizer: "스포츠서울",
    votingPlatform: "공식 홈페이지",
    links: {
      web: "https://www.seoulmusicawards.com/",
    },
    icon: "🌟",
    color: "bg-blue-600",
    description: "서울가요대상 공식 홈페이지",
    isActive: false,
  },
  {
    id: "circle",
    name: "서클차트 뮤직어워즈",
    organizer: "서클차트",
    votingPlatform: "공식 홈페이지",
    links: {
      web: "https://www.circlemusicawards.co.kr/",
    },
    icon: "📊",
    color: "bg-green-600",
    description: "서클차트 뮤직어워즈 공식 사이트",
    isActive: false,
  },
  {
    id: "aaa",
    name: "AAA",
    organizer: "STARNEWS",
    votingPlatform: "공식 홈페이지",
    links: {
      web: "https://www.asiaartistawards.com/",
    },
    icon: "🎪",
    color: "bg-purple-600",
    description: "아시아 아티스트 어워즈",
    isActive: false,
  },
];

export function getAwardById(id: string): Award | undefined {
  return AWARDS.find((award) => award.id === id);
}

export function getActiveAwards(): Award[] {
  return AWARDS.filter((award) => award.isActive);
}
