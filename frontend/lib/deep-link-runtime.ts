import { Platform } from "@/lib/constants/platforms";

export interface OpenOptions {
  androidStep?: number;
  iosStep?: number;
}

// 디바이스 타입 감지
function getDeviceType(): "android" | "ios" | "pc" {
  if (typeof window === "undefined") return "pc";
  
  const userAgent = window.navigator.userAgent;
  if (/Android/i.test(userAgent)) return "android";
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  return "pc";
}

// 인앱 브라우저 감지
function isInAppBrowser(): boolean {
  if (typeof window === "undefined") return false;
  
  const userAgent = window.navigator.userAgent;
  return /KAKAO|NAVER|Line|Instagram|Facebook|Twitter/i.test(userAgent);
}

// Intent URL에 fallback URL 추가 (Android)
function addFallbackToIntent(intentUrl: string, fallbackUrl: string): string {
  if (intentUrl.includes("S.browser_fallback_url=")) {
    return intentUrl;
  }
  
  const encodedFallback = encodeURIComponent(fallbackUrl);
  if (intentUrl.includes("#Intent;")) {
    return intentUrl.replace("#Intent;", `#Intent;S.browser_fallback_url=${encodedFallback};`);
  }
  
  return intentUrl;
}

// iOS용 딥링크 처리 (window.location 방식)
function tryIOSDeeplink(url: string, fallbackUrl?: string): void {
  // 인앱 브라우저에서는 안내 메시지와 함께 웹 폴백
  if (isInAppBrowser()) {
    alert("앱으로 열기가 제한될 수 있습니다. Safari나 Chrome 등 기본 브라우저에서 이용해주세요.");
    if (fallbackUrl) {
      window.open(fallbackUrl, "_blank");
    }
    return;
  }
  
  // iOS에서는 window.location.href로 직접 시도
  let hasFocus = true;
  
  // 페이지가 백그라운드로 가면 앱이 열린 것으로 간주
  const handleVisibilityChange = () => {
    if (document.hidden) {
      hasFocus = false;
    }
  };
  
  const handlePageHide = () => {
    hasFocus = false;
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', handlePageHide);
  
  // 딥링크 시도
  try {
    window.location.href = url;
  } catch (error) {
    console.error("iOS deeplink failed:", error);
    if (fallbackUrl) {
      window.open(fallbackUrl, "_blank");
    }
    return;
  }
  
  // 1.5초 후 앱이 안 열렸으면 폴백 실행
  setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pagehide', handlePageHide);
    
    if (hasFocus && fallbackUrl) {
      // 여전히 포커스가 있다면 앱이 안 열린 것
      window.open(fallbackUrl, "_blank");
    }
  }, 1500);
}

// Android용 Intent 처리
function tryAndroidDeeplink(url: string, fallbackUrl?: string): void {
  const finalUrl = fallbackUrl ? addFallbackToIntent(url, fallbackUrl) : url;
  
  try {
    window.location.href = finalUrl;
  } catch (error) {
    console.error("Android deeplink failed:", error);
    if (fallbackUrl) {
      window.open(fallbackUrl, "_blank");
    }
  }
}

// PC용 처리 (스킴 시도 후 웹 폴백)
function tryPCDeeplink(url: string, fallbackUrl?: string): void {
  try {
    window.location.href = url;
    
    // 1초 후 웹 폴백
    setTimeout(() => {
      if (fallbackUrl) {
        window.open(fallbackUrl, "_blank");
      }
    }, 1000);
  } catch (error) {
    console.error("PC deeplink failed:", error);
    if (fallbackUrl) {
      window.open(fallbackUrl, "_blank");
    }
  }
}

/**
 * 플랫폼별 딥링크를 OS별 폴백과 함께 열기
 */
export function openPlatformAuto(
  platform: Platform,
  _ids?: string[],
  options: OpenOptions = {}
): void {
  const deviceType = getDeviceType();
  const deeplinks = platform.deeplinks?.[deviceType] || [];
  
  if (deeplinks.length === 0) {
    // 딥링크가 없으면 웹 URL로 열기
    window.open(platform.url, "_blank");
    return;
  }
  
  let stepIndex = 0;
  if (deviceType === "android" && options.androidStep !== undefined) {
    stepIndex = options.androidStep;
  } else if (deviceType === "ios" && options.iosStep !== undefined) {
    stepIndex = options.iosStep;
  }
  
  const deeplink = deeplinks[stepIndex] || deeplinks[0];
  if (!deeplink) {
    window.open(platform.url, "_blank");
    return;
  }
  
  const fallbackUrl = platform.url;
  
  switch (deviceType) {
    case "android":
      tryAndroidDeeplink(deeplink.uri, fallbackUrl);
      break;
    case "ios":
      tryIOSDeeplink(deeplink.uri, fallbackUrl);
      break;
    case "pc":
      tryPCDeeplink(deeplink.uri, fallbackUrl);
      break;
  }
}