"use client";

import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { Shield, X, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export function AdminIndicator() {
  const { isAdminMode, disableAdminMode } = useAdminMode();
  const [position, setPosition] = useState({ x: 20, y: 64 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    // 로컬 스토리지에서 저장된 위치 불러오기
    const savedPosition = localStorage.getItem('adminBadgePosition');
    if (savedPosition) {
      const pos = JSON.parse(savedPosition);
      setPosition(pos);
    } else {
      // 기본 위치: 모바일에서는 왼쪽, 데스크탑에서는 오른쪽
      const isMobile = window.innerWidth < 768;
      setPosition({
        x: isMobile ? 20 : window.innerWidth - 150,
        y: 64
      });
    }

    // 윈도우 리사이즈 시 위치 조정
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 150),
        y: Math.min(prev.y, window.innerHeight - 50)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - 150));
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 50));
      
      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const newX = Math.max(0, Math.min(touch.clientX - dragStart.x, window.innerWidth - 150));
      const newY = Math.max(0, Math.min(touch.clientY - dragStart.y, window.innerHeight - 50));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // 위치 저장
        localStorage.setItem('adminBadgePosition', JSON.stringify(position));
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        // 위치 저장
        localStorage.setItem('adminBadgePosition', JSON.stringify(position));
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart, position]);

  if (!isAdminMode) return null;

  return (
    <div 
      ref={elementRef}
      className={`fixed z-[100] bg-mint-primary text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm ${
        isDragging ? 'cursor-grabbing opacity-90' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      <div 
        className="flex items-center gap-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Move className="w-3 h-3 opacity-70" />
        <Shield className="w-4 h-4" />
        <span className="font-medium">관리자 모드</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={disableAdminMode}
        className="h-6 w-6 p-0 hover:bg-white/20 text-white"
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  );
}