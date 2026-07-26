import { useState, useEffect } from "react";

/**
 * 일정 주기로 갱신되는 현재 시각(ms)을 반환한다.
 * 예약 발매 시각(publish_at)이 지났는지 재평가하는 용도.
 * 페이지를 열어둔 채로 예약 시각이 지나도 자동으로 곡이 노출되도록 한다.
 *
 * @param intervalMs 갱신 주기 (기본 60초)
 */
export function useNow(intervalMs: number = 60000): number {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}
