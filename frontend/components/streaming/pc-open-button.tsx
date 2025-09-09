// PcOpenButtons.tsx
import { makePcLinks } from "@/lib/constants/makePcLinks";
import React from "react";

export default function PcOpenButtons() {
  const ids = [
    "38892497",
    "38892498",
    "37323944",
    "37946921",
    "31927275",
    "37946922",
    "30232719",
    "37323943",
    "37946927",
    "7844374",
    "37946924",
    "37946920",
  ];

  // 멜론 예시
  const links = makePcLinks("melon", ids);

  return (
    <div>
      <button
        onClick={() => {
          // 사용자 제스처 1회: 첫 세트는 location으로
          if (links.length) window.location.href = links[0];
        }}
        className="px-3 py-2 rounded bg-black text-white"
      >
        PC 원클릭(세트1 열기)
      </button>

      {/* 팝업 차단 대비: 나머지는 수동 버튼 제공 */}
      {links.length > 1 && (
        <div className="mt-2 flex gap-8 flex-wrap">
          {links.map((u, i) => (
            <a key={i} href={u} className="underline">
              세트 {i + 1} 열기
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
