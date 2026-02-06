import { http, HttpResponse } from "msw";

// const validAccessToken = "testAccess";
// const validRefreshToken = "testRefresh";

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
  http.post("/file", () => {
    return HttpResponse.json({
      url: "50faa6d198e1d1d15e868a7433f87346.jpg",
    });
  }),
  http.get("/files/:id", () => {
    return HttpResponse.redirect(
      "https://i.pinimg.com/736x/af/fb/a9/affba91c05f0b42dc3f36f0b341e0e9e.jpg",
    );
  }),
  http.put(`${baseUrl}event/:eventId/:blocks/:blockId/tasks/:taskId`, () => {
    return HttpResponse.json({
      order: 2,
      options: [
        { id: "12", value: "Ответ 1", isCorrect: true },
        { id: "13", value: "Ответ 2", isCorrect: false },
        { id: "14", value: "Ответ 3", isCorrect: false },
      ],
    });
  }),
  http.get(`${baseUrl}event/:eventId/:blocks/:blockId/conditions`, () => {
    return HttpResponse.json({
      conditions: [
        {
          id: "123",
          blockId: "1b57f871-80a5-40b1-8198-c8a0f5cd41aa",
          blockOrder: 1,
          group: null,
          min: 23,
          max: 25,
        },
      ],
    });
  }),
  http.put(
    `${baseUrl}event/:eventId/:blocks/:blockId/conditions/:conditionId`,
    () => {
      return HttpResponse.json({
        id: "123",
        blockId: "1b57f871-80a5-40b1-8198-c8a0f5cd41aa",
        blockOrder: 1,
        group: null,
        min: 20,
        max: 50,
      });
    },
  ),
  http.put("/profile/avatar", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put("/event/:eventId/settings", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("/event/:eventId/playerInfo", () => {
    return HttpResponse.json({
      title: "string",
      description: "string",
      rate: 4.2,
      favorite: false,
      tags: ["Химия", "Биология"],
      startDate: "25.01.2026 13:40",
      endDate: "26.01.2026 13:55",
      cover: "",
      status: "notStarted",
    });
  }),
  http.get("/event/:eventId/nextStage", () => {
    return HttpResponse.json({
      type: "end",
      task: {
        id: String(Math.floor(1 + Math.random() * 5)),
        blockId: "232232323",
        name: "Тестовое задание",
        description: "Проверка описания",
        type: 2,
        options: [
          {
            id: "1",
            value: "Ответ1",
          },
          {
            id: "2",
            value:
              "Проверка достаточно длинного ответа, чтобы было, что проверить несколько раз",
          },
        ],
        files: ["Длинное название файла вот.png", "fjfjfj.docx"],
        // time: 300,
        // timeStamp?: string,
      },
    });
  }),
  http.post(`/event/:eventId/block/:blockId/task/:taskId/answer`, () => {
    return HttpResponse.json({
      rightAnswer: ["1"],
      points: 250,
    });
  }),
  http.put(`/event/:eventId/blocks/:blockId/task/:taskId/timestamp`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("/event/:eventId/playerStats", () => {
    return HttpResponse.json({
      points: 250,
    });
  }),
];
