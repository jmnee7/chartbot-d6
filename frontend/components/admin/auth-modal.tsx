"use client";

import { useState } from 'react';
import { useAdminMode } from '@/lib/contexts/admin-mode-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminAuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, enableAdminMode } = useAdminMode();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    const success = await enableAdminMode(code.trim());
    
    if (!success) {
      setError('잘못된 인증 코드입니다.');
      setCode('');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setCode('');
    setError('');
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-lg max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mint-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-mint-primary" />
                    </div>
                    <CardTitle className="text-lg">관리자 인증</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  관리자 모드로 변경하기 위해서는 인증이 필요합니다.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="auth-code" className="block text-sm font-medium text-gray-700 mb-2">
                      인증 번호 (5자리)
                    </label>
                    <Input
                      id="auth-code"
                      type="text"
                      value={code}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z0-9!@#$]/g, '').slice(0, 5);
                        setCode(value);
                        setError('');
                      }}
                      placeholder="인증번호 입력"
                      maxLength={5}
                      className={`text-center text-lg tracking-wider ${error ? 'border-red-500' : ''}`}
                      autoFocus
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-mint-primary hover:bg-mint-dark text-white"
                      disabled={!code.trim() || isLoading}
                    >
                      {isLoading ? '인증 중...' : '인증'}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-xs text-gray-500">
                    관리자 모드에서는 차트 설정, 링크 등을 수정할 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}