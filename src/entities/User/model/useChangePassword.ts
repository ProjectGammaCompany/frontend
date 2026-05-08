import { type TokensResponse } from "@/shared/model/types";
import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { changePassword } from "../api/changePassword";

interface UseChangePasswordVariables {
  code: string;
  password: string;
  repeatPassword: string;
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
    mutationFn: ({ code, password, repeatPassword }) =>
      changePassword(code, password, repeatPassword),
    onSuccess: (data) =>
      onSuccess(data.data.accessToken, data.data.refreshToken),
    onError,
  });
};
