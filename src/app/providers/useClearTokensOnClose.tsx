import { queryClient } from "@/shared/api";
import { settingsStorage, tokenStorage } from "@/shared/lib";
import { useEffect } from "react";

//todo: переместить в отдельную директорию
export const useClearTokens = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const rememberMe = settingsStorage.getRememberMe();
      if (rememberMe != "true") {
        tokenStorage.clearTokens();
        queryClient.clear();
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
