import { type TokensResponse } from "@/src/shared/models";
import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { changePassword } from "../api/changePassword";

interface UseChangePasswordVariables {
  code: string;
  password: string;
}

type OnSuccessFn = (accessToken: string, refreshToken: string) => void;
export const useChangePassword = (
  onSuccess: OnSuccessFn,
  onError: () => void,
) => {
  return useMutation<
    AxiosResponse<TokensResponse>,
    Error,
    UseChangePasswordVariables
  >({
    mutationFn: ({ code, password }) => changePassword(code, password),
    onSuccess: (data) =>
      onSuccess(data.data.accessToken, data.data.refreshToken),
    onError,
  });
};
