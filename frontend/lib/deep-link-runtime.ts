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

// iOS용 Hidden iframe 방식
function tryIOSDeeplink(url: string, fallbackUrl?: string): void {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);
  
  // 2초 후 fallback 실행
  setTimeout(() => {
    document.body.removeChild(iframe);
    if (fallbackUrl) {
      window.open(fallbackUrl, "_blank");
    }
  }, 2000);
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
  ids?: string[],
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