import type { TokensResponse } from "../models/types/tokenResponse";
import { axiosInstance } from "./axios/axios";

export const refreshTokens = (accessToken: string, refreshToken: string) => {
  return axiosInstance.post<TokensResponse>(
    "refresh",
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
