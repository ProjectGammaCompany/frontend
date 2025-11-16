export interface TokenStorage {
  getTokens: () => {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  };
  getAccessToken: () => string | undefined;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}
