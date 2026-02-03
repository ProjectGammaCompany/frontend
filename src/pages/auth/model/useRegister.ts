import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";

export const useRegister = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      settingsStorage.setRememberMe();
      onSuccess?.();
    },
  });
};
