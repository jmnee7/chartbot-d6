"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, BarChart3, Calendar, Zap, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionOverlay } from "./action-overlay";

const navigation = [
  { name: "홈", href: "/", icon: Home, type: "link" },
  { name: "차트", href: "/charts", icon: BarChart3, type: "link" },
  { name: "컴백", href: "/comeback", icon: Calendar, type: "link" },
  { name: "Action", href: "/action", icon: Zap, type: "action" },
  { name: "Support", href: "/support", icon: Headphones, type: "link" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [actionOverlayOpen, setActionOverlayOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        {/* Home indicator */}
        <div className="flex justify-center pt-1 pb-2">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="grid grid-cols-5 pb-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href && item.type !== "action";
            const isActionActive = item.type === "action" && actionOverlayOpen;

            if (item.type === "action") {
              return (
                <button
                  key={item.name}
                  onClick={() => setActionOverlayOpen(true)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 px-1 text-xs font-medium transition-colors rounded-lg mx-1",
                    isActionActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5", isActionActive && "text-blue-600")}
                  />
                  <span
                    className={cn(
                      "text-[10px]",
                      isActionActive && "text-blue-600 font-semibold"
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2 px-1 text-xs font-medium transition-colors rounded-lg mx-1",
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", isActive && "text-blue-600")}
                />
                <span
                  className={cn(
                    "text-[10px]",
                    isActive && "text-blue-600 font-semibold"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Action Overlay */}
      <ActionOverlay
        isOpen={actionOverlayOpen}
        onClose={() => setActionOverlayOpen(false)}
      />
    </>
  );
}
