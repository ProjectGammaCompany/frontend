import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useEffect } from "react";

//todo: переместить в отдельную директорию
export const useClearTokens = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const rememberMe = settingsStorage.getRememberMe();
      if (rememberMe != "true") {
        tokenStorage.clearTokens();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    window.addEventListener("pagehide", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, []);
};
