import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import type { DeviceType, AppType } from "@/lib/utils/device-detection";
import { detectAppType } from "@/lib/utils/device-detection";

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("pc");

  useEffect(() => {
    // 클라이언트에서만 실행
    setDeviceType(isAndroid ? "android" : isIOS ? "ios" : "pc");
  }, []);

  return deviceType;
}

export function useAppType(initial?: AppType): AppType {
  const [type, setType] = useState<AppType>(initial ?? "web");

  useEffect(() => {
    setType(detectAppType());
  }, []);

  return type;
}

export function useDeviceAndAppType(initialApp?: AppType) {
  const deviceType = useDeviceType();
  const appType = useAppType(initialApp);

  return { deviceType, appType };
}
