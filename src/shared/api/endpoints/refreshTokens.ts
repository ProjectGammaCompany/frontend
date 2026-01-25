import type { TokensResponse } from "../../models";
import { axiosInstance } from "../axios/axios";

export const refreshTokens = (accessToken: string, refreshToken: string) => {
  return axiosInstance.post<TokensResponse>(
    "auth/refresh",
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
