import { axiosInstance } from "@/src/shared/api";
import type { TokensResponse } from "@/src/shared/models";

export const changePassword = (code: string, password: string) => {
  return axiosInstance.put<TokensResponse>("auth/password", {
    code,
    password,
  });
};
