import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { TokenStorage } from "../../lib/tokenStorage";
import type { TokensResponse } from "../../models/types/tokenResponse";
import { refreshTokens } from "../userAPI";

export const createAxiosInstance = (tokenStorage: TokenStorage) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    paramsSerializer: {
      indexes: null,
    },
  });

  // переменная необходима для случая отправки множества запросов при рефреше
  const refreshingRequest: Promise<
    AxiosResponse<TokensResponse, unknown, object>
  > | null = null;

  instance.interceptors.request.use((request) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    putAccessToken(request, tokenStorage),
  );

  instance.interceptors.response.use(
    (response) => response,

    async (error) =>
      handleRefresh(error, instance, tokenStorage, refreshingRequest),
  );

  return instance;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const putAccessToken = (request: any, tokenStorage: TokenStorage) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request;
};

const handleRefresh = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  instance: AxiosInstance,
  tokenStorage: TokenStorage,
  refreshingRequest: Promise<
    AxiosResponse<TokensResponse, unknown, object>
  > | null,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const originalRequest = error.config;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.response?.status === 401 && !originalRequest._retry) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    originalRequest._retry = true;
    try {
      const { accessToken, refreshToken } = tokenStorage.getTokens();
      if (refreshToken && accessToken) {
        refreshingRequest =
          refreshingRequest ?? refreshTokens(accessToken, refreshToken);

        const response = await refreshingRequest;

        refreshingRequest = null;
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        tokenStorage.setTokens(newAccessToken, newRefreshToken);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return instance(originalRequest);
      }
    } catch (refreshError) {
      tokenStorage.clearTokens();
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject(refreshError);
    }
  }
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
  return Promise.reject(error);
};
