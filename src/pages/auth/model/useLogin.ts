import { handleError } from "@/src/shared/api";
import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";

export const useLogin = (
  rememberMe: boolean,
  onSuccess: () => void,
  onForbiddenError: () => void,
  onNotFound: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationFn: login,
    onError: (error) => {
      handleError(error, onForbiddenError, onError, onNotFound);
    },
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      if (rememberMe) {
        settingsStorage.setRememberMe();
      }
      onSuccess?.();
    },
  });
};
