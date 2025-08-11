"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GuideCategory } from "@/content/guide.config";

interface CategoryTabsProps {
  categoryItems: GuideCategory[];
  activeSlug: string;
}

export function CategoryTabs({ categoryItems, activeSlug }: CategoryTabsProps) {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 활성화된 탭으로 스크롤
    const scrollToActiveTab = () => {
      if (tabsContainerRef.current && activeTabRef.current) {
        const container = tabsContainerRef.current;
        const activeTab = activeTabRef.current;
        
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        
        // 탭이 컨테이너 영역을 벗어났는지 확인
        const isTabVisible = 
          tabRect.left >= containerRect.left && 
          tabRect.right <= containerRect.right;
        
        if (!isTabVisible) {
          // 활성화된 탭을 가운데로 스크롤
          const scrollLeft = activeTab.offsetLeft - (container.offsetWidth / 2) + (activeTab.offsetWidth / 2);
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    };

    // 컴포넌트 마운트 후 스크롤 실행
    const timer = setTimeout(scrollToActiveTab, 100);
    return () => clearTimeout(timer);
  }, [activeSlug]);

  return (
    <div className="mt-3">
      <Tabs value={activeSlug} className="w-full">
        <div 
          ref={tabsContainerRef}
          className="overflow-x-auto pb-2"
        >
          <TabsList className="flex w-full justify-start bg-transparent p-0 h-auto gap-0 min-w-max border-b border-gray-200">
            {categoryItems.map((item) => (
              <Link key={item.slug} href={`/guide/${item.slug}`}>
                <TabsTrigger
                  ref={item.slug === activeSlug ? activeTabRef : null}
                  value={item.slug}
                  className="!border-b-[3px] !border-transparent px-4 py-3 text-sm whitespace-nowrap !bg-transparent data-[state=active]:!border-blue-600 data-[state=active]:!bg-transparent data-[state=active]:font-medium data-[state=active]:text-blue-600 data-[state=active]:!shadow-none !rounded-none text-gray-600 hover:text-gray-800 transition-all -mb-px relative !border-l-0 !border-r-0 !border-t-0"
                >
                  {item.label}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}