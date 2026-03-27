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
  http.get(`${baseUrl}event/:eventId/playerStats`, () => {
    return HttpResponse.json({
      fullStats: true,
      groupEvent: false,
      userId: "90d2bc31-e9e4-4694-80d9-8530f3d469d4",
      users: [
        {
          id: "90d2bc31-e9e4-4694-80d9-8530f3d469d4",
          username: "test_user1@gmail.com",
          current: false,
          avatar: "4e02a81e-c94c-4e29-b261-f0bda0b0faa0.jpg",
          points: 10,
        },
        {
          id: "90d2bc31-e9e4-4694-80d9-8530f3d469d5",
          username: "test_user2@gmail.com",
          current: true,
          avatar: "4e02a81e-c94c-4e29-b261-f0bda0b0faa0.jpg",
          points: 20,
        },
      ],
      groups: [
        {
          id: "1",
          name: "Группа 1",
          users: [
            {
              id: "90d2bc31-e9e4-4694-80d9-8530f3d469d4",
              username: "test_user1@gmail.com",
              current: false,
              avatar: "4e02a81e-c94c-4e29-b261-f0bda0b0faa0.jpg",
              points: 10,
            },
            {
              id: "90d2bc31-e9e4-4694-80d9-8530f3d469d5",
              username: "test_user2@gmail.com",
              current: false,
              avatar: "4e02a81e-c94c-4e29-b261-f0bda0b0faa0.jpg",
              points: 20,
            },
          ],
        },
        {
          id: "2",
          name: "Группа 2",
          users: [
            {
              id: "90d2bc31-e9e4-4694-80d9-8530f3d469d6",
              username: "test_user3@gmail.com",
              avatar: "4e02a81e-c94c-4e29-b261-f0bda0b0faa0.jpg",
              current: true,
              points: 30,
            },
            {
              id: "90d2bc31-e9e4-4694-80d9-8530f3d469d7",
              username: "test_user4@gmail.com",
              avatar: "4e02a81e-c94c-4e29-b261-f0bda0b0faa0.jpg",
              points: 40,
              current: false,
            },
          ],
        },
      ],
    });
  }),
];
