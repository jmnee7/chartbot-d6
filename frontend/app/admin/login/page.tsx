"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Music, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { signInWithPassword, getCurrentUser } from "@/lib/auth/admin";

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  // 이미 로그인된 사용자는 대시보드로 리다이렉트
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          router.push('/admin');
          return;
        }
      } catch (error) {
        console.error('기존 인증 확인 오류:', error);
      }
      setIsCheckingAuth(false);
    };

    checkExistingAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await signInWithPassword(email, password);
      console.log('로그인 성공:', user);
      
      // 성공 시 대시보드로 리다이렉트
      router.push('/admin');
    } catch (error: any) {
      console.error('로그인 오류:', error);
      setError(error.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 빠른 로그인 함수들
  const quickLoginAdmin = () => {
    setEmail('admin@day6.com');
    setPassword('day6admin123');
  };

  const quickLoginManager = () => {
    setEmail('manager@day6.com');
    setPassword('day6manager123');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>인증 상태 확인 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 로고 및 헤더 */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            D6 관리자 로그인
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            관리자 계정으로 시스템에 액세스하세요
          </p>
        </div>

        {/* 로그인 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">관리자 인증</CardTitle>
            <CardDescription className="text-center">
              이메일과 비밀번호를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 에러 메시지 */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* 로그인 폼 */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  이메일
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@day6.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  비밀번호
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>

            {/* 빠른 로그인 버튼들 */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 text-center">빠른 로그인 (개발용)</div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={quickLoginAdmin}
                  disabled={isLoading}
                >
                  관리자로 로그인
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={quickLoginManager}
                  disabled={isLoading}
                >
                  매니저로 로그인
                </Button>
              </div>
            </div>

            {/* 계정 정보 안내 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                사용 가능한 계정
              </h4>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <div>
                  <span className="font-mono">admin@day6.com</span>
                  <span className="text-blue-600 dark:text-blue-300 ml-2">/ day6admin123</span>
                </div>
                <div>
                  <span className="font-mono">manager@day6.com</span>
                  <span className="text-blue-600 dark:text-blue-300 ml-2">/ day6manager123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 시스템 정보 */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>D6 관리자 시스템 v1.0.0</p>
          <p>개발용 하드코딩 인증 시스템</p>
        </div>
      </div>
    </div>
  );
}