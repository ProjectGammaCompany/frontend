// const validAccessToken = "testAccess";
// const validRefreshToken = "testRefresh";

import { http, HttpResponse } from "msw";
import { baseApiUrl } from "../../axios/createAxiosInstance";

// const baseUrl = import.meta.env.VITE_APP_BASE_API_URL as string;

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
  http.get(`${baseApiUrl}event/:eventId/editorStats`, () => {
    return HttpResponse.json({
      groupEvent: true,
      groups: [
        {
          id: "1",
          name: "Группа 1",
          users: [
            {
              id: "2",
              username: "user2",
              answers: {
                correct: 25,
                total: 25,
              },
              points: 250,
            },
            {
              id: "1",
              username: "user1",
              answers: {
                correct: 3,
                total: 5,
              },
              points: 150,
            },
          ],
        },
        {
          id: "2",
          name: "Группа 2",
          users: [
            {
              id: "2",
              username: "user3",
              answers: {
                correct: 10,
                total: 25,
              },
              points: 250,
            },
            {
              id: "3",
              username: "user4",
              answers: {
                correct: 3,
                total: 5,
              },
              points: 150,
            },
            {
              id: "4",
              username: "user5",
              answers: {
                correct: 3,
                total: 5,
              },
              points: 150,
            },
          ],
        },
      ],
    });
  }),
];
