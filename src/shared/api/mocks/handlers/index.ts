import { http, HttpResponse } from "msw";
import { EVENTS } from "../const/events";

const validAccessToken = "testAccess";
const validRefreshToken = "testRefresh";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
  http.post(`login`, () => {
    return HttpResponse.json({
      accessToken: validAccessToken,
      refreshToken: validRefreshToken,
    });
  }),
  http.delete("logout", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put("favoriteState/:id", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("events", ({ request }) => {
    // await sleep(15000);
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor");
    const limit = 10;
    const data = EVENTS.slice(
      cursor ? Number(cursor) : 0,
      cursor ? Number(cursor) + limit : limit,
    );
    const hasNext = data.at(-1)?.id != EVENTS.at(-1)?.id;
    return HttpResponse.json({
      next: cursor
        ? hasNext
          ? `${Number(cursor) + limit}`
          : null
        : limit.toString(),
      info: data,
    });
  }),
];
