"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Download,
  Play,
  Vote,
  Heart,
  Radio,
  ChevronDown,
  ChevronRight,
  X,
  Music,
  BookOpen,
  ExternalLink,
  Mic,
  Headphones,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/social-links";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  hasChildren?: boolean;
  children?: NavigationItem[];
  external?: boolean;
  type?: "divider" | "section";
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation: NavigationItem[] = [
  { name: "홈", href: "/", icon: Home },
  { name: "차트", href: "/charts", icon: BarChart3 },
  {
    name: "스트리밍",
    icon: Play,
    hasChildren: true,
    children: [
      {
        name: "스트리밍 리스트 (음원, MV)",
        href: "/streaming",
        icon: Music,
      },
      {
        name: "음원 스트리밍",
        icon: Music,
        hasChildren: true,
        children: [
          {
            name: "멜론",
            href: "https://www.melon.com/search/total/index.htm?q=Day6&section=&mwkLogType=T",
            external: true,
          },
          {
            name: "지니",
            href: "https://www.genie.co.kr/search/searchMain?query=day6",
            external: true,
          },
          {
            name: "벅스",
            href: "https://music.bugs.co.kr/search/track?q=day6",
            external: true,
          },
          {
            name: "바이브",
            href: "https://vibe.naver.com/search?query=DAY6",
            external: true,
          },
          {
            name: "플로",
            href: "https://www.music-flo.com/search/all?keyword=DAY6",
            external: true,
          },
          { name: "애플뮤직", href: "https://music.apple.com", external: true },
          {
            name: "스포티파이",
            href: "https://open.spotify.com/search/day6",
            external: true,
          },
          {
            name: "스테이션헤드",
            href: "https://www.stationhead.com/day6strmteam",
            external: true,
          },
        ],
      },
      {
        name: "MV 스트리밍",
        icon: ExternalLink,
        hasChildren: true,
        children: [
          {
            name: "유튜브",
            href: "https://youtube.com/@day6_stream?si=Z2HBzbbAJgaNM4LM",
            external: true,
          },
        ],
      },
    ],
  },
  {
    name: "다운로드",
    icon: Download,
    hasChildren: true,
    children: [
      {
        name: "다운로드 목록 (음원, MV)",
        href: "/download",
        icon: Download,
      },
      {
        name: "음원 다운로드",
        icon: Download,
        hasChildren: true,
        children: [
          { name: "멜론", href: "https://www.melon.com", external: true },
          { name: "지니", href: "https://www.genie.co.kr", external: true },
          { name: "벅스", href: "https://music.bugs.co.kr", external: true },
          { name: "바이브", href: "https://vibe.naver.com", external: true },
          {
            name: "카카오뮤직",
            href: "https://music.kakao.com",
            external: true,
          },
          {
            name: "V컬러링",
            href: "https://www.sktelecom.com/index_real.html",
            external: true,
          },
        ],
      },
      {
        name: "MV 다운로드",
        icon: ExternalLink,
        hasChildren: true,
        children: [
          { name: "멜론", href: "https://www.melon.com", external: true },
          { name: "벅스", href: "https://music.bugs.co.kr", external: true },
        ],
      },
    ],
  },
  {
    name: "투표",
    icon: Vote,
    hasChildren: true,
    children: [
      {
        name: "투표 가이드",
        icon: BookOpen,
        hasChildren: true,
        children: [
          { name: "더쇼", href: "/guide/theshow" },
          { name: "쇼챔", href: "/guide/musiccore" },
          { name: "엠카운트다운", href: "/guide/mcountdown" },
          { name: "뮤직뱅크", href: "/guide/musicbank" },
          { name: "음악중심", href: "/guide/musiccore" },
          { name: "인기가요", href: "/guide/inkigayo" },
          { name: "뮤빗", href: "/guide/mubeat" },
          { name: "아이돌챔프", href: "/guide/idolchamp" },
          { name: "스타플래닛", href: "/guide/starplanet" },
        ],
      },
      {
        name: "투표 사이트 바로가기",
        icon: ExternalLink,
        hasChildren: true,
        children: [
          {
            name: "더쇼",
            href: "https://apps.apple.com/kr/app/%EC%8A%A4%ED%83%80-%ED%94%8C%EB%9E%98%EB%8B%9B-sbs-m-%EB%8D%94-%EC%87%BC-%EB%8D%94-%ED%8A%B8%EB%A1%AF%EC%87%BC-%ED%88%AC%ED%91%9C/id1377584935",
            external: true,
          },
          {
            name: "쇼챔",
            href: "https://m.mbcplus.com/web/program/contentList.do?searchCondition=001002&programMenuSeq=176&programInfoSeq=67",
            external: true,
          },
          {
            name: "엠카운트다운",
            href: "https://share.mnetplus.world/download?hl=en",
            external: true,
          },
          {
            name: "뮤직뱅크",
            href: "https://program.kbs.co.kr/2tv/enter/musicbank/pc/index.html",
            external: true,
          },
          {
            name: "음악중심",
            href: "https://program.imbc.com/Info/musiccore?seq=5",
            external: true,
          },
          {
            name: "인기가요",
            href: "https://now.sbs.co.kr/now_web/main.html",
            external: true,
          },
          { name: "뮤빗", href: "https://mubeat.com/", external: true },
          {
            name: "아이돌챔프",
            href: "https://idolchamp.co.kr/",
            external: true,
          },
          {
            name: "스타플래닛",
            href: "https://www.starplanet.kr/",
            external: true,
          },
          {
            name: "올차트",
            href: "https://www.allchart.co.kr/",
            external: true,
          },
          { name: "LiNC", href: "https://linc-app.com/", external: true },
        ],
      },
    ],
  },
  {
    name: "라디오",
    icon: Radio,
    hasChildren: true,
    children: [
      {
        name: "KBS",
        href: "https://www.kbs.co.kr/radio/",
        icon: ExternalLink,
        external: true,
      },
      {
        name: "MBC",
        href: "https://www.imbc.com/broad/radio/",
        icon: ExternalLink,
        external: true,
      },
      {
        name: "SBS",
        href: "https://www.sbs.co.kr/radio/",
        icon: ExternalLink,
        external: true,
      },
    ],
  },
  {
    name: "서포트",
    icon: Heart,
    hasChildren: true,
    children: [
      {
        name: "서포트 안내",
        href: "/support",
        icon: Heart,
      },
      {
        name: "공동 구매링크",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSfIHNDZNuR2mgfTmQWGMeHBgiNp3nFs7jZ0Ok3Tz0EFengsyw/viewform",
        icon: ExternalLink,
        external: true,
      },
    ],
  },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderNavigationItem = (
    item: NavigationItem,
    level = 0,
    parentKey = ""
  ) => {
    const key = parentKey ? `${parentKey}-${item.name}` : item.name;
    const isExpanded = expandedItems[key];
    const hasChildren = item.hasChildren && item.children;
    const isActive = item.href && pathname === item.href;

    if (hasChildren) {
      return (
        <div key={key} className={`${level > 0 ? "ml-4" : ""}`}>
          <button
            onClick={() => toggleExpand(key)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors text-left",
              level > 0
                ? "text-sm text-gray-600 hover:bg-gray-50"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className="h-4 w-4" />}
              <span className="font-medium">{item.name}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-1 mt-1">
              {item.children?.map((child: NavigationItem) =>
                renderNavigationItem(child, level + 1, key)
              )}
            </div>
          )}
        </div>
      );
    }

    if (item.type === "section") {
      return (
        <div key={key} className="px-3 pt-3 pb-1">
          <div className="text-xs font-medium text-gray-500">{item.name}</div>
        </div>
      );
    }

    return (
      <div key={key} className={`${level > 0 ? "ml-4" : ""}`}>
        {item.external ? (
          <a
            href={item.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              level > 0
                ? "text-sm text-gray-600 hover:bg-gray-50"
                : isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span className={level > 0 ? "text-sm" : "font-medium"}>
              {item.name}
            </span>
          </a>
        ) : (
          <Link
            href={item.href || "#"}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              level > 0
                ? "text-sm text-gray-600 hover:bg-gray-50"
                : isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span className={level > 0 ? "text-sm" : "font-medium"}>
              {item.name}
            </span>
          </Link>
        )}
      </div>
    );
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
            }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-white shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/streaming/day-6-logo.jpg"
                  alt="DAY6 STRM"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="font-bold text-lg">DAY6 STRM</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation */}
            <nav
              className="p-4 space-y-1 flex-1"
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 200px)",
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db #f3f4f6",
              }}
            >
              {navigation.map((item) => renderNavigationItem(item))}
            </nav>

            {/* Social Links */}
            <div className="border-t border-gray-100 p-4 mt-auto">
              <p className="text-xs font-medium text-gray-500 mb-3">
                DAY6 공식 SNS
              </p>
              <SocialLinks />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
