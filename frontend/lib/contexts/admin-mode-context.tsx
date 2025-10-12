"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminModeContextType {
  isAdminMode: boolean;
  enableAdminMode: (code: string) => Promise<boolean>;
  disableAdminMode: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AdminModeContext = createContext<AdminModeContextType | undefined>(undefined);

export function AdminModeProvider({ children }: { children: React.ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 페이지 로드 시 localStorage에서 관리자 모드 상태 복원
  useEffect(() => {
    const savedAdminMode = localStorage.getItem('d6_admin_mode');
    if (savedAdminMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // 관리자 모드 활성화
  const enableAdminMode = async (code: string): Promise<boolean> => {
    try {
      // API로 인증 코드 검증
      const response = await fetch('/api/admin/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        setIsAdminMode(true);
        localStorage.setItem('d6_admin_mode', 'true');
        setIsAuthModalOpen(false);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('인증 오류:', error);
      return false;
    }
  };

  // 관리자 모드 비활성화
  const disableAdminMode = () => {
    setIsAdminMode(false);
    localStorage.removeItem('d6_admin_mode');
  };

  const value = {
    isAdminMode,
    enableAdminMode,
    disableAdminMode,
    isAuthModalOpen,
    setIsAuthModalOpen,
  };

  return (
    <AdminModeContext.Provider value={value}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  const context = useContext(AdminModeContext);
  if (context === undefined) {
    throw new Error('useAdminMode must be used within an AdminModeProvider');
  }
  return context;
}