import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";

export const useLogin = (rememberMe: boolean, onSuccess?: () => void) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      if (rememberMe) {
        settingsStorage.setRememberMe();
      }
      onSuccess?.();
    },
  });
};
