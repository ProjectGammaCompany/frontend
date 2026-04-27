import axios from "axios";
import type { TokensResponse } from "../../model";

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL as string,
});

export const refreshTokens = (accessToken: string, refreshToken: string) => {
  return refreshClient.post<TokensResponse>(
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
