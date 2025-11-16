import type { TokenStorage } from "./types";

export const mockTokenStorage: TokenStorage & {
  accessToken: string;
  refreshToken: string;
} = {
  accessToken: "",
  refreshToken: "",
  getAccessToken() {
    return this.accessToken;
  },
  getTokens() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  },
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  },
  clearTokens() {
    this.accessToken = "";
    this.refreshToken = "";
  },
};
