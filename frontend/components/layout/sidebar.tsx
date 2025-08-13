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
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Music,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/social-links";

interface NavigationItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  hasChildren?: boolean;
  children?: NavigationItem[];
  external?: boolean;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "홈", href: "/", icon: Home },
  { name: "차트", href: "/charts", icon: BarChart3 },
  {
    name: "스트리밍",
    icon: Play,
    hasChildren: true,
    children: [
      { name: "스트리밍리스트", href: "/streaming", icon: Play },
      {
        name: "음원 스트리밍",
        hasChildren: true,
        children: [
          { name: "멜론", href: "/streaming/music/melon", external: true },
          { name: "지니", href: "/streaming/music/genie", external: true },
          { name: "벅스", href: "/streaming/music/bugs", external: true },
          { name: "바이브", href: "/streaming/music/vibe", external: true },
          { name: "플로", href: "/streaming/music/flo", external: true },
          { name: "유튜브", href: "/streaming/music/youtube", external: true },
          { name: "애플", href: "/streaming/music/apple", external: true },
          {
            name: "스포티파이",
            href: "/streaming/music/spotify",
            external: true,
          },
          {
            name: "스테이션헤드",
            href: "/streaming/music/stationhead",
            external: true,
          },
        ],
      },
      {
        name: "MV 스트리밍",
        hasChildren: true,
        children: [
          { name: "유튜브", href: "/streaming/mv/youtube", external: true },
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
        name: "음원 다운로드",
        hasChildren: true,
        children: [
          { name: "멜론", href: "/download/music/melon", external: true },
          { name: "지니", href: "/download/music/genie", external: true },
          { name: "벅스", href: "/download/music/bugs", external: true },
          { name: "바이브", href: "/download/music/vibe", external: true },
          { name: "카카오뮤직", href: "/download/music/kakao", external: true },
          {
            name: "V컬러링",
            href: "/download/music/vcoloring",
            external: true,
          },
        ],
      },
      {
        name: "MV 다운로드",
        hasChildren: true,
        children: [
          { name: "멜론", href: "/download/mv/melon", external: true },
          { name: "벅스", href: "/download/mv/bugs", external: true },
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
        name: "음악방송",
        hasChildren: true,
        children: [
          { name: "더쇼", href: "/votes/music-shows/the-show", external: true },
          {
            name: "쇼챔피언",
            href: "/votes/music-shows/show-champion",
            external: true,
          },
          {
            name: "엠카운트다운",
            href: "/votes/music-shows/mcountdown",
            external: true,
          },
          {
            name: "뮤직뱅크",
            href: "/votes/music-shows/music-bank",
            external: true,
          },
          {
            name: "음악중심",
            href: "/votes/music-shows/music-core",
            external: true,
          },
          {
            name: "인기가요",
            href: "/votes/music-shows/inkigayo",
            external: true,
          },
        ],
      },
      {
        name: "시상식",
        hasChildren: true,
        children: [
          { name: "시상식 투표", href: "/votes/awards", external: true },
        ],
      },
    ],
  },
  {
    name: "라디오 신청",
    icon: HelpCircle,
    hasChildren: true,
    children: [
      { name: "KBS", href: "/radio/kbs", external: true },
      { name: "MBC", href: "/radio/mbc", external: true },
      { name: "SBS", href: "/radio/sbs", external: true },
    ],
  },
  {
    name: "서포트",
    icon: Heart,
    hasChildren: true,
    children: [
      { name: "앨범 공구", href: "/support/group-order" },
      { name: "아이디 기부", href: "/support/id-donation" },
      { name: "헬퍼 지원", href: "/support/helper-support" },
      {
        name: "모금",
        hasChildren: true,
        children: [
          { name: "총공 모금", href: "/support/fundraising/streaming" },
          { name: "투표 모금", href: "/support/fundraising/voting" },
        ],
      },
    ],
  },
  { name: "가이드", href: "/guide", icon: HelpCircle },
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
              <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-lg">DAY6 STRM</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1 overflow-y-auto flex-1">
              {navigation.map((item) => renderNavigationItem(item))}
            </nav>

            {/* Social Links */}
            <div className="absolute bottom-4 left-4 right-4 border-t border-gray-100 pt-4">
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
