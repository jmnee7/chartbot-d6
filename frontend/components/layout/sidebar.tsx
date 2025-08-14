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
  X,
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
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "홈", href: "/", icon: Home },
  { name: "차트", href: "/charts", icon: BarChart3 },
  { name: "스트리밍", href: "/streaming", icon: Play },
  { name: "다운로드", href: "/download", icon: Download },
  { name: "투표", href: "/votes", icon: Vote },
  { name: "라디오 신청", href: "/radio", icon: HelpCircle },
  { name: "서포트", href: "/support", icon: Heart },
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
