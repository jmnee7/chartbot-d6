import { useState, useRef } from "react";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";

export function useAdminClick() {
  const { setIsAuthModalOpen } = useAdminMode();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e?: React.MouseEvent, allowNavigation: boolean = true) => {
    const newCount = clickCount + 1;
    
    // 기존 타이머 초기화
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newCount === 6) {
      // 6번 클릭 완료 - 인증 모달 열기
      if (e) e.preventDefault(); // 기본 동작 방지
      setIsAuthModalOpen(true);
      setClickCount(0);
    } else {
      // 모바일에서는 항상 기본 동작 방지 (홈 이동 없음)
      // 데스크탑에서는 2번째 클릭부터 기본 동작 방지
      if (!allowNavigation || (allowNavigation && newCount > 1)) {
        if (e) e.preventDefault();
      }
      
      setClickCount(newCount);
      // 3초 후 카운트 리셋
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 3000);
    }
  };

  return {
    clickCount,
    handleClick,
  };
}