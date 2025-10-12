"use client";

import { usePathname } from "next/navigation";
import { MobileAppLayout } from "@/components/layout/mobile-app-layout";
import { AdminAuthModal } from "@/components/admin/auth-modal";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // admin 경로인지 확인
  const isAdminPath = pathname.startsWith('/admin');

  // admin 경로라면 레이아웃 없이 children만 반환
  if (isAdminPath) {
    return (
      <>
        {children}
        <AdminAuthModal />
      </>
    );
  }

  // 일반 경로라면 MobileAppLayout 적용
  return (
    <>
      <MobileAppLayout>{children}</MobileAppLayout>
      <AdminAuthModal />
    </>
  );
}