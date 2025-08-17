// 디바이스 및 환경 감지 유틸리티 (react-device-detect 기반)

import { isAndroid, isIOS } from "react-device-detect";

export type DeviceType = "android" | "ios" | "pc";
export type AppType = "app" | "web";

/**
 * react-device-detect를 사용한 간단한 디바이스 감지
 */
export function detectDeviceType(): DeviceType {
  if (isAndroid) return "android";
  if (isIOS) return "ios";
  return "pc";
}

/**
 * 앱 내 웹뷰인지 일반 브라우저인지 감지
 */
export function detectAppType(): AppType {
  if (typeof window === "undefined") return "web";

  const userAgent = navigator.userAgent.toLowerCase();

  // 카카오톡 인앱 브라우저
  if (/kakaotalk/i.test(userAgent)) return "app";

  // 네이버 앱
  if (/naver/i.test(userAgent)) return "app";

  // 페이스북 앱
  if (/fbav|fban/i.test(userAgent)) return "app";

  // 인스타그램 앱
  if (/instagram/i.test(userAgent)) return "app";

  // 라인 앱
  if (/line\//i.test(userAgent)) return "app";

  // WebView 일반 감지
  if (/; wv\)|webview/i.test(userAgent)) return "app";

  // iOS Safari 여부 확인 (더 정확한 검사)
  if (isIOS) {
    const hasSafari = /safari/i.test(userAgent);
    const hasChrome = /crios/i.test(userAgent);
    const hasFirefox = /fxios/i.test(userAgent);
    const hasOpera = /opios/i.test(userAgent);
    const hasEdge = /edgios/i.test(userAgent);

    if (hasChrome || hasFirefox || hasOpera || hasEdge) {
      return "web"; // iOS 서드파티 브라우저는 웹으로 처리
    }

    if (!hasSafari) {
      return "app"; // Safari가 없으면 앱 웹뷰
    }
  }

  return "web";
}

/**
 * 서버에서 사용할 수 있는 간단한 UA 기반 감지
 */
export function detectDeviceFromServerUA(
  ua: string | null | undefined
): DeviceType {
  if (!ua) return "pc";

  const uaLower = ua.toLowerCase();
  if (uaLower.includes("android")) return "android";
  if (/(iphone|ipad|ipod)/i.test(ua)) return "ios";
  if (/macintosh/i.test(ua) && /mobile\/\w+/i.test(ua)) return "ios"; // iPadOS

  return "pc";
}

// 스트리밍 앱 설치 여부 확인 (실제로는 직접 확인 불가, 링크 실행 시도로 판단)
export function canUseAppLink(): boolean {
  const deviceType = detectDeviceType();
  const appType = detectAppType();

  // PC는 항상 웹 링크 사용
  if (deviceType === "pc") return false;

  // 인앱 브라우저에서는 앱 링크 사용 불가
  if (appType === "app") return false;

  // 모바일 웹에서는 앱 링크 시도 가능
  return deviceType === "android" || deviceType === "ios";
}

// 플랫폼별 최적 링크 선택
export function getBestStreamingLink(
  platform: string,
  urls?: {
    android?: string[];
    iphone?: string[];
    pc?: string[];
  },
  fallbackUrl?: string
): string | null {
  const deviceType = detectDeviceType();

  if (!urls) return fallbackUrl || null;

  switch (deviceType) {
    case "android":
      return urls.android?.[0] || fallbackUrl || null;

    case "ios":
      return urls.iphone?.[0] || fallbackUrl || null;

    case "pc":
      return urls.pc?.[0] || fallbackUrl || null;

    default:
      return fallbackUrl || null;
  }
}

// 디바이스별 링크 리스트 가져오기
export function getDeviceLinks(urls?: {
  android?: string[];
  iphone?: string[];
  pc?: string[];
}): string[] {
  const deviceType = detectDeviceType();

  if (!urls) return [];

  switch (deviceType) {
    case "android":
      return urls.android || [];

    case "ios":
      return urls.iphone || [];

    case "pc":
      return urls.pc || [];

    default:
      return [];
  }
}

// 디바이스 타입을 사용자 친화적인 텍스트로 변환
export function getDeviceLabel(
  deviceType?: DeviceType,
  appType?: AppType
): string {
  const device = deviceType || detectDeviceType();
  const app = appType || detectAppType();

  switch (device) {
    case "android":
      return app === "app" ? "안드로이드 (앱)" : "안드로이드";
    case "ios":
      return app === "app" ? "iOS (앱)" : "iPhone";
    case "pc":
      return "PC";
    default:
      return "알 수 없음";
  }
}
