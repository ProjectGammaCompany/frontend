import { axiosInstance } from "@/shared/api/axios";
import type { TokensResponse } from "@/shared/model/types";

export const changePassword = (
  code: string,
  password: string,
  repeatPassword: string,
) => {
  return axiosInstance.put<TokensResponse>("auth/password", {
    code,
    password,
    repeatPassword,
  });
};
