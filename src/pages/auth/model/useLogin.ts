import { settingsStorage, tokenStorage } from "@/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";

export const useLogin = (
  rememberMe: boolean,
  onSuccess: () => void,
  onError: (error: Error) => void,
) => {
  return useMutation({
    mutationFn: login,
    onError,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      if (rememberMe) {
        settingsStorage.setRememberMe();
      }
      onSuccess?.();
    },
  });
};
