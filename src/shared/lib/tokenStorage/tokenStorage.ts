import Cookies from "js-cookie";
import type { TokenStorage } from "./types";

const getTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = Cookies.get("refreshToken");
  return {
    accessToken,
    refreshToken,
  };
};

const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
};

const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const tokenStorage: TokenStorage = {
  getTokens,
  setTokens,
  clearTokens,
  getAccessToken,
};
