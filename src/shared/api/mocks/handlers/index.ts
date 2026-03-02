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
  http.put(`${baseUrl}event/:eventId/blocks/:blockId`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put("/profile/avatar", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put(`${baseUrl}event/:eventId`, () => {
    return HttpResponse.json({
      groups: [
        {
          id: "1",
          login: "Группа 123",
          password: "1234",
        },
      ],
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
  http.get(`${baseUrl}event/:eventId/nextStage`, () => {
    return HttpResponse.json({
      type: "block",
      block: {
        id: "id1",
        name: "Блок 1",
        tasks: [
          {
            id: "1",
            name: "Информационный блок",
            type: 0,
            isCompleted: false,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a dictum ex. Mauris molestie elit sit amet nulla lacinia, in euismod tellus auctor. Quisque semper lorem non dolor facilisis aliquam. Mauris dapibus, felis at tempus aliquam, libero nibh ultrices risus, non tincidunt felis metus sed urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ornare viverra felis, quis ultrices sem elementum vel. Phasellus hendrerit volutpat tellus, sit amet semper magna ultrices ut. Aliquam accumsan tincidunt sagittis. Quisque maximus tortor fringilla est euismod, vel euismod leo semper. Nunc malesuada odio eu nulla malesuada, id iaculis velit malesuada. Mauris fermentum diam nec justo sodales, sed pretium quam porta. Vivamus hendrerit eros a felis ornare, et ultrices turpis iaculis.",
          },
          {
            id: "2",
            name: "Единичный выбор",
            type: 1,
            time: 62,
            isCompleted: false,
            description: "Описание",
          },
          {
            id: "3",
            name: "Множественный выбор",
            type: 2,
            isCompleted: false,
            description: "description",
          },
          {
            id: "4",
            name: "Текстовый ввод",
            type: 3,
            isCompleted: false,
            description: "description",
          },
          {
            id: "5",
            name: "QR-сканирование",
            type: 4,
            isCompleted: false,
            description: "description",
          },
        ],
      },
    });
  }),
  http.post(
    `${baseUrl}event/:eventId/block/:blockId/task/:taskId/answer`,
    () => {
      return HttpResponse.json({
        rightAnswer: ["1"],
        points: 250,
      });
    },
  ),
  http.put(`/event/:eventId/blocks/:blockId/task/:taskId/timestamp`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put(`${baseUrl}event/:eventId/nextStage`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get("/event/:eventId/playerStats", () => {
    return HttpResponse.json({
      points: 250,
    });
  }),
  http.put(`${baseUrl}event/:eventId/blocksOrder`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put(`${baseUrl}event/:eventId/blocks/:blockId/tasksOrder`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.get(`${baseUrl}events/joinRequiredFields/:joinCode`, () => {
    return HttpResponse.json({
      groupFields: true,
    });
  }),
  http.post(`${baseUrl}events/join/:joinCode`, () => {
    return HttpResponse.json({
      eventId: "33d7c987-50cd-422f-9c7e-4c824c92e218",
    });
  }),
  http.get(`${baseUrl}notifications`, () => {
    return HttpResponse.json({
      notifications: [
        {
          id: "1",
          type: "eventStart",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
          },
        },
        {
          id: "2",
          type: "eventEnd",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
            notStartedFavorite: true,
          },
        },
        {
          id: "3",
          type: "eventEnd",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
            notStartedFavorite: true,
            timeLeft: "hour",
          },
        },
        {
          id: "4",
          type: "eventEnd",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
            notStartedFavorite: true,
            timeLeft: "day",
          },
        },
        {
          id: "5",
          type: "eventEnd",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
            notStartedFavorite: false,
          },
        },
        {
          id: "6",
          type: "eventEnd",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
            notStartedFavorite: false,
            timeLeft: "hour",
          },
        },
        {
          id: "7",
          type: "eventEnd",
          date: "12.08.2004",
          extra: {
            id: "32323",
            eventName: "Квест 1",
            notStartedFavorite: false,
            timeLeft: "day",
          },
        },
      ],
    });
  }),
  http.delete(`${baseUrl}notifications/:id`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.put(
    `${baseUrl}event/:eventId/blocks/:blockId/conditions/:conditionId/groups`,
    () => {
      return new HttpResponse(null, {
        status: 500,
      });
    },
  ),
  http.get(`${baseUrl}event/:eventId/groups`, () => {
    return HttpResponse.json({
      groups: [
        {
          id: "1",
          name: "Группа 1",
        },
        {
          id: "2",
          name: "Группа 2",
        },
        {
          id: "3",
          name: "Группа 3",
        },
      ],
    });
  }),
];
