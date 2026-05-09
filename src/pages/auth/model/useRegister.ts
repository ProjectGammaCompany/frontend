import { settingsStorage } from "@/shared/lib/settingsStorage";
import { tokenStorage } from "@/shared/lib/tokenStorage";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";
export const useRegister = (
  onSuccess: () => void,
  onError: (error: Error) => void,
) => {
  return useMutation({
    mutationFn: register,
    onError,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      settingsStorage.setRememberMe();
      onSuccess?.();
    },
  });
};
