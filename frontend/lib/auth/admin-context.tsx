"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { AdminUser, getCurrentUser, onAuthStateChange } from './admin';

interface AdminContextType {
  user: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 사용자 상태 확인
    getCurrentUser()
      .then((adminUser) => {
        setUser(adminUser);
        setLoading(false);
      })
      .catch((error) => {
        console.error('초기 사용자 확인 오류:', error);
        setUser(null);
        setLoading(false);
      });

    // 인증 상태 변경 리스너
    const subscription = onAuthStateChange((adminUser) => {
      setUser(adminUser);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AdminContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: !!user,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}