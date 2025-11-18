import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { createAxiosInstance } from "..";
import { mockTokenStorage } from "../../lib";

const validAccessToken = "testAccess";
const validRefreshToken = "testRefresh";

const server = setupServer(
  http.post(`${import.meta.env.VITE_APP_BASE_URL as string}refresh`, () => {
    return HttpResponse.json({
      accessToken: validAccessToken,
      refreshToken: validRefreshToken,
    });
  }),
  http.get(`${import.meta.env.VITE_APP_BASE_URL as string}login`, () => {
    return HttpResponse.json({
      accessToken: validAccessToken,
      refreshToken: validRefreshToken,
    });
  }),
);

describe("Проверка настройки axios-instance", () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Должны быть новые токены в хранилище после рефреша", async () => {
    let isUsedAlready = false;
    server.use(
      http.get(`${import.meta.env.VITE_APP_BASE_URL as string}someURL`, () => {
        if (!isUsedAlready) {
          isUsedAlready = true;
          return new HttpResponse(null, { status: 401 });
        }
        return new HttpResponse(null, { status: 200 });
      }),
    );
    mockTokenStorage.setTokens("access", "refresh");
    const testInstance = createAxiosInstance(mockTokenStorage);

    const response = await testInstance.get("someURL");

    const tokens = mockTokenStorage.getTokens();

    expect(tokens.accessToken).toBe(validAccessToken);
    expect(tokens.accessToken).toBe(validAccessToken);
    expect(response.status).toBe(200);
  });
});
