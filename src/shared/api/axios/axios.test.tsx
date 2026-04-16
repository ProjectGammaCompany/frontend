import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { baseApiUrl, createAxiosInstance } from "..";
import { mockTokenStorage } from "../../lib";

const validAccessToken = "testAccess";
const validRefreshToken = "testRefresh";

const server = setupServer(
  http.post(`${baseApiUrl}auth/refresh`, () => {
    return HttpResponse.json({
      accessToken: validAccessToken,
      refreshToken: validRefreshToken,
    });
  }),
  http.post(`${baseApiUrl}auth/login`, () => {
    return HttpResponse.json({
      accessToken: validAccessToken,
      refreshToken: validRefreshToken,
    });
  }),
);

describe("Проверка настройки axios-instance", () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "error",
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Должны быть новые токены в хранилище после рефреша", async () => {
    let isUsedAlready = false;
    server.use(
      http.get(`${baseApiUrl}someURL`, () => {
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
