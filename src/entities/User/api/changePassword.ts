import { axiosInstance } from "@/shared/api";
import type { TokensResponse } from "@/shared/models";

export const changePassword = (code: string, password: string) => {
  return axiosInstance.put<TokensResponse>("auth/password", {
    code,
    password,
  });
};
