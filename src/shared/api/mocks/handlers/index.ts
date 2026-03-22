// const validAccessToken = "testAccess";
// const validRefreshToken = "testRefresh";

import { http, HttpResponse } from "msw";

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
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
  // http.put(`${baseUrl}events/personal/favorites`, async () => {
  //   await sleep(5000);
  //   return new HttpResponse(null, {
  //     status: 500,
  //   });
  // }),
];
