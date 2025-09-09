// makePcLinks.ts
type Service = "melon" | "genie" | "bugs" | "vibe";

export function makePcLinks(service: Service, ids: (string | number)[]) {
  // 멜론은 중복금지, 나머지는 그대로
  const baseIds =
    service === "melon"
      ? Array.from(new Set(ids.map(String)))
      : ids.map(String);

  // 플랫폼별 PC 규격 (당신이 올린 데이터와 일치)
  const conf = {
    melon: {
      // 당신의 데이터: melon PC는 cList + ',' 사용 (menuid 포함)
      base: "melonapp://play?ctype=1&menuid=1000002721&cList=",
      sep: ",",
      limit: 30, // 많으면 잘림 → 25~30 권장, 필요시 조정
    },
    genie: {
      // 당신의 데이터: shareProcessV2 + xgnm + ';'
      base: "https://www.genie.co.kr/player/shareProcessV2?xgnm=",
      sep: ";",
      limit: 30,
    },
    bugs: {
      // 당신의 데이터: /newPlayer + trackId + ','
      base: "https://music.bugs.co.kr/newPlayer?trackId=",
      sep: ",",
      limit: 30,
    },
    vibe: {
      // PC에도 trackIds 콤마 (다만 vibe는 PC에서 앱 프로토콜 처리 의존)
      base: "vibe://listen?version=3&trackIds=",
      sep: ",",
      limit: 30,
    },
  }[service];

  // 분할(청크)해서 여러 링크 생성
  const out: string[] = [];
  for (let i = 0; i < baseIds.length; i += conf.limit) {
    const chunk = baseIds.slice(i, i + conf.limit);
    out.push(conf.base + chunk.join(conf.sep));
  }
  return out; // => ["세트1 링크", "세트2 링크", ...]
}
