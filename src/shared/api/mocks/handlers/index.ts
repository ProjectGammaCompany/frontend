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
  http.post("file", () => {
    return HttpResponse.json({
      url: "50faa6d198e1d1d15e868a7433f87346.jpg",
    });
  }),
  http.get("files/:id", () => {
    return HttpResponse.redirect(
      "https://i.pinimg.com/736x/50/fa/a6/50faa6d198e1d1d15e868a7433f87346.jpg",
    );
  }),
  http.get("tags", () => {
    return HttpResponse.json({
      tags: [
        {
          name: "Крч",
          id: "1",
        },
        {
          name: "Среднее",
          id: "2",
        },
        {
          name: "Максимально длинный тег",
          id: "3",
        },
        {
          name: "Проверка",
          id: "4",
        },
        {
          name: "Заполненность",
          id: "5",
        },
        {
          name: "Химия",
          id: "6",
        },
      ],
    });
  }),
  http.post("event", () => {
    return HttpResponse.json({
      id: "23232323",
    });
  }),
  http.get("profile", () => {
    return HttpResponse.json({
      avatar: "fdjvnjvdjdv.pnh",
      username: "СамыйСексуальныйМужчина",
    });
  }),
  http.put("profile/avatar", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
