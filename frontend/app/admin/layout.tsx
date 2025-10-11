"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminProvider, useAdmin } from "@/lib/auth/admin-context";
import { ThemeProvider } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";

// 인증이 필요 없는 페이지들
const PUBLIC_ADMIN_PAGES = ['/admin/login', '/admin/auth/callback'];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 로딩 중이거나 공개 페이지라면 리다이렉트하지 않음
    if (loading || PUBLIC_ADMIN_PAGES.includes(pathname)) {
      return;
    }

    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
  }, [loading, isAuthenticated, pathname, router]);

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="text-lg">인증 상태 확인 중...</span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                관리자 권한을 확인하고 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 공개 페이지 (로그인, 콜백) - 기본 스타일링만 적용
  if (PUBLIC_ADMIN_PAGES.includes(pathname)) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      </ThemeProvider>
    );
  }

  // 인증되지 않은 사용자 (이미 리다이렉트 되었겠지만 혹시 모를 경우)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Shield className="h-12 w-12 text-red-500" />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  접근 권한 필요
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  이 페이지는 관리자만 접근할 수 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 인증된 사용자 - 관리자 레이아웃
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          
          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}