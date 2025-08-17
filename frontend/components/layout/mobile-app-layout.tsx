"use client";

import { useState, createContext, useContext } from "react";
import { DesktopHeader } from "./desktop-header";
import { OverlayHeader } from "./overlay-header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { usePathname } from "next/navigation";

// Context for sidebar control
interface SidebarContextType {
  openSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface MobileAppLayoutProps {
  children: React.ReactNode;
}

export function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const sidebarContextValue = {
    openSidebar: () => setSidebarOpen(true),
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {/* Mobile Layout (sm and below) */}
      <div className="md:hidden min-h-screen flex justify-center">
        <div className="w-full bg-transparent shadow-xl min-h-screen relative">
          <OverlayHeader
            onMenuClick={() => setSidebarOpen(true)}
            variant="solid"
          />

          <main className={`overflow-y-auto px-0 pt-14 pb-20`}>{children}</main>

          <MobileNav />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop Layout (md and above) */}
      <div className="hidden md:block min-h-screen">
        <div className="w-full bg-transparent min-h-screen">
          <DesktopHeader />

          <main
            className={`pt-16 ${isHomePage ? "" : "py-6"} pb-6 overflow-y-auto`}
          >
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 xl:px-16 2xl:px-24">
              {children}
            </div>
          </main>

          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
