import { queryClient } from "@/shared/api/reactQuery";
import { settingsStorage } from "@/shared/lib/settingsStorage";
import { tokenStorage } from "@/shared/lib/tokenStorage";

import { useEffect } from "react";

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
