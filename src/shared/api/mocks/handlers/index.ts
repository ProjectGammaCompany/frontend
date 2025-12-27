import { http, HttpResponse } from "msw";
import { EVENTS } from "../const/events";

const validAccessToken = "testAccess";
const validRefreshToken = "testRefresh";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
  http.post(`/login`, () => {
    return HttpResponse.json({
      accessToken: validAccessToken,
      refreshToken: validRefreshToken,
    });
  }),
  http.delete("/logout", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put("/favoriteState/:id", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("/events", ({ request }) => {
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
  http.post("/file", () => {
    return HttpResponse.json({
      url: "50faa6d198e1d1d15e868a7433f87346.jpg",
    });
  }),
  http.get("/files/:id", () => {
    return HttpResponse.redirect(
      "https://i.pinimg.com/736x/50/fa/a6/50faa6d198e1d1d15e868a7433f87346.jpg",
    );
  }),
  http.get("/tags", () => {
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
  http.post("/event", () => {
    return HttpResponse.json({
      id: "23232323",
    });
  }),
  http.get("/profile", () => {
    return HttpResponse.json({
      avatar: "fdjvnjvdjdv.pnh",
      username: "СамыйСексуальныйМужчина",
    });
  }),
  http.put("/profile/avatar", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("/event/:eventid", () => {
    return HttpResponse.json({
      name: "Квест 1",
      blocks: [
        {
          id: "1",
          name: "блок 1",
          order: 0,
          connectedBlocks: false,
          conditionsWithoutBlocks: false,
        },
        {
          id: "2",
          name: "блок 2",
          order: 1,
          connectedBlocks: true,
          conditionsWithoutBlocks: false,
        },
        {
          id: "3",
          name: "блок 3",
          order: 2,
          connectedBlocks: true,
          conditionsWithoutBlocks: true,
        },
        {
          id: "4",
          name: "блок 4",
          order: 3,
          connectedBlocks: false,
          conditionsWithoutBlocks: false,
        },
        {
          id: "5",
          name: "блок 5",
          order: 4,
          connectedBlocks: false,
          conditionsWithoutBlocks: false,
        },
      ],
    });
  }),
  http.post("/event/:eventid/block", () => {
    return HttpResponse.json({
      id: "232323",
    });
  }),
  http.get("/event/:eventId/blocks/:blockId", () => {
    return HttpResponse.json({
      name: "Блок 1",
      isParallel: false,
      order: 1,
      points: false,
      rightAnswer: false,
      partialPoints: false,
    });
  }),
  http.get("/event/:eventId/blocks/:blockId/tasks", () => {
    return HttpResponse.json({
      tasks: [
        {
          id: "1",
          name: "Короткая",
          order: 1,
        },
        {
          id: "2",
          name: "Достаточно длинное название",
          order: 2,
        },
        {
          id: "3",
          name: "Суууууупер длинное название для удачной вставки",
          order: 3,
        },
        {
          id: "5",
          name: "Ещё одна таска",
          order: 5,
        },
        {
          id: "6",
          name: "Суууууупер длинное название для удачной вставки",
          order: 6,
        },
        {
          id: "7",
          name: "Ещё одна таска",
          order: 7,
        },
        {
          id: "8",
          name: "Ещё одна таска",
          order: 8,
        },
        {
          id: "9",
          name: "Ещё одна таска",
          order: 9,
        },
        {
          id: "10",
          name: "Ещё одна таска",
          order: 10,
        },
        {
          id: "11",
          name: "Ещё одна таска",
          order: 11,
        },
      ],
    });
  }),
  http.get("/event/:eventId/:blocks/:blockId/tasks/:taskId", () => {
    return HttpResponse.json({
      name: "Test Task1",
      description: "Проверка описания",
      type: 0,
      options: [],
      files: [],
      points: 0,
      time: 0,
      partialPoints: false,
    });
  }),
  http.post("/event/:eventId/:blocks/:blockId/tasks", () => {
    return new HttpResponse({
      id: "2121212",
    });
  }),
  http.get("/event/:eventId/blocks/:blockId/conditions", () => {
    return HttpResponse.json({
      conditions: [
        {
          id: "1",
          min: -1, // -1
          max: -1, // -1
          blockId: "", // 0, если ни к чему не привязан, иначе 1
          blockOrder: 0,
        },
        {
          id: "2",
          min: 1, // -1
          max: -1, // -1
          blockId: "2", // 0, если ни к чему не привязан, иначе 1
          blockOrder: 1,
        },
        {
          id: "3",
          min: -1, // -1
          max: 1, // -1
          blockId: "", // 0, если ни к чему не привязан, иначе 1
          blockOrder: 0,
        },
        {
          id: "4",
          min: -1, // -1
          max: -1, // -1
          blockId: "", // 0, если ни к чему не привязан, иначе 1
          blockOrder: 0,
        },
        {
          id: "5",
          min: -1, // -1
          max: -1, // -1
          blockId: "", // 0, если ни к чему не привязан, иначе 1
          blockOrder: 0,
        },
        {
          id: "6",
          min: -1, // -1
          max: -1, // -1
          blockId: "", // 0, если ни к чему не привязан, иначе 1
          blockOrder: 0,
        },
      ],
    });
  }),
  http.post("/event/:eventId/blocks/:blockId/conditions", () => {
    return HttpResponse.json({
      id: "32232233232",
      blockOrder: 5,
    });
  }),
  http.get("/event/:eventId/blocks", () => {
    return HttpResponse.json({
      blocks: [
        {
          id: "1",
          name: "блок 1",
        },
        {
          id: "2",
          name: "блок 2",
        },
        {
          id: "3",
          name: "блок 3",
        },
      ],
    });
  }),
];
