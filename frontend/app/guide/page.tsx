"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { GUIDE_CATEGORIES } from "@/content/guide.config";

// 카테고리별로 그룹핑
const categoryGroups = {
  streaming: GUIDE_CATEGORIES.filter((c) => c.category === "streaming"),
  support: GUIDE_CATEGORIES.filter((c) => c.category === "support"),
  donation: GUIDE_CATEGORIES.filter((c) => c.category === "donation"),
  voting: GUIDE_CATEGORIES.filter((c) => c.category === "voting"),
};

// 카테고리 아이콘 및 제목
const categoryInfo = {
  streaming: {
    icon: "📱",
    title: "스트리밍",
    description: "음원 플랫폼에서 DAY6를 스트리밍해주세요",
  },
  support: {
    icon: "📥",
    title: "다운로드",
    description: "음원 다운로드로 DAY6를 응원해주세요",
  },
  donation: {
    icon: "🤝",
    title: "아이디 기부",
    description: "아이디 기부로 DAY6를 응원해주세요",
  },
  voting: {
    icon: "🗳️",
    title: "음악방송 투표",
    description: "음악방송 1위를 위해 투표해주세요",
  },
};

function CategorySection({
  categoryKey,
  items,
}: {
  categoryKey: keyof typeof categoryInfo;
  items: typeof GUIDE_CATEGORIES;
}) {
  const { icon, title, description } = categoryInfo[categoryKey];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      {/* 가로 스크롤 카드 컨테이너 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {items.map((item) => (
            <Link key={item.slug} href={`/guide/${item.slug}`}>
              <Card className="w-40 flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* 이미지 영역 */}
                    <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      {item.heroImage ? (
                        item.heroImage.includes("placeholder") ||
                        item.heroImage.includes("hero") ? (
                          <div className="text-center">
                            <div className="text-2xl mb-1">📖</div>
                            <p className="text-xs text-gray-500">가이드</p>
                          </div>
                        ) : (
                          <div className="text-2xl">
                            {categoryKey === "streaming"
                              ? "🎵"
                              : categoryKey === "support"
                              ? "📁"
                              : "📺"}
                          </div>
                        )
                      ) : (
                        <div className="text-xs text-gray-400">준비중</div>
                      )}
                    </div>

                    {/* 제목 및 설명 */}
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">
                        {item.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {categoryKey === "streaming"
                          ? `${item.label}에서 스트리밍`
                          : categoryKey === "support"
                          ? `${item.label} 다운로드`
                          : categoryKey === "donation"
                          ? `${item.label} 아이디 기부`
                          : `${item.label} 투표하기`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      <PageHeader
        title="DAY6 응원 가이드"
        description="DAY6를 응원하는 다양한 방법들을 확인해보세요"
      />

      <div className="mt-6">
        <CategorySection
          categoryKey="streaming"
          items={categoryGroups.streaming}
        />
        <CategorySection categoryKey="support" items={categoryGroups.support} />
        <CategorySection
          categoryKey="donation"
          items={categoryGroups.donation}
        />
        <CategorySection categoryKey="voting" items={categoryGroups.voting} />
      </div>
    </div>
  );
}
