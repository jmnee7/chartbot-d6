import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDE_CATEGORIES } from "@/content/guide.config";
import { CategoryTabs } from "@/components/guide/category-tabs";
import { ImageGallery } from "@/components/guide/image-gallery";
import { ShareButton } from "@/components/guide/share-button";

type Props = { params: Promise<{ slug: string }> };

// 카테고리별 탭 그룹핑
function getCategoryItems(category: string | undefined) {
  return GUIDE_CATEGORIES.filter((item) => item.category === category);
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = GUIDE_CATEGORIES.find((x) => x.slug === slug);
  if (!c) return notFound();

  // 현재 항목과 같은 카테고리의 모든 항목들
  const categoryItems = getCategoryItems(c.category);

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-24">
      {/* 헤더 동일 */}
      <header className="sticky top-0 z-30 bg-white pb-3 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">DAY6 응원 가이드</h1>
          <div className="text-xs text-gray-500">
            {c.date ??
              new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
                .format(new Date())
                .replace(/\. /g, ".")
                .replace(".", "")}
          </div>

          <ShareButton title={c.label} slug={slug} />
        </div>

        {/* 카테고리 탭 */}
        <CategoryTabs categoryItems={categoryItems} activeSlug={slug} />
      </header>

      {/* 가이드 이미지 갤러리 - 클릭 시 팝업 */}
      <ImageGallery
        images={
          c.images?.length
            ? c.images
            : [c.heroImage].filter((img): img is string => Boolean(img))
        }
        label={c.label}
      />

      {/* 간단한 설명 텍스트 */}
      <section className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          {c.label} 이용 팁
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          {c.slug.includes("streaming") ||
          c.slug.includes("melon") ||
          c.slug.includes("genie") ||
          c.slug.includes("bugs") ||
          c.slug.includes("vibe") ||
          c.slug.includes("flo") ? (
            <>
              <p>• 스트리밍은 30초 이상 재생해야 스트리밍 수에 반영됩니다</p>
              <p>• 하루에 같은 곡을 무제한으로 들어도 집계됩니다</p>
              <p>• 음소거나 볼륨 0으로는 스트리밍이 집계되지 않습니다</p>
              <p>• 가능한 한 높은 음질로 재생하는 것이 좋습니다</p>
            </>
          ) : c.slug.includes("vote") ||
            c.slug.includes("inkigayo") ||
            c.slug.includes("musicbank") ||
            c.slug.includes("musiccore") ||
            c.slug.includes("mcountdown") ? (
            <>
              <p>• 투표 시간과 방법을 정확히 확인하세요</p>
              <p>• 하나의 계정으로 하루 1회 투표가 가능합니다</p>
              <p>• 투표 마감 시간을 놓치지 않도록 주의하세요</p>
              <p>• 프로그램별로 투표 방식이 다를 수 있습니다</p>
            </>
          ) : (
            <>
              <p>• 해당 가이드를 참고하여 단계별로 진행해주세요</p>
              <p>• 궁금한 점이 있으면 팬 커뮤니티에서 문의해보세요</p>
              <p>• 정확한 정보는 공식 채널에서 확인하는 것이 좋습니다</p>
            </>
          )}
        </div>
      </section>

      {/* 하단 고정 버튼(모바일 UX) */}
      {c.cta && (
        <div className="fixed inset-x-0 bottom-20 z-20 mx-auto w-full max-w-screen-sm px-4">
          <Link
            href={c.cta.href}
            {...(c.cta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {c.cta.label.replace(" >", "")}
          </Link>
        </div>
      )}
    </div>
  );
}
