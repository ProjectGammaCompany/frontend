// const validAccessToken = "testAccess";
// const validRefreshToken = "testRefresh";

import { http, HttpResponse } from "msw";

const baseUrl = import.meta.env.VITE_APP_BASE_API_URL as string;

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
  http.get(`${baseUrl}event/:eventId/nextStage`, () => {
    return HttpResponse.json({
      type: "task",
      task: {
        taskId: "1",
        blockId: "1",
        name: "1",
        type: 2,
        options: [
          {
            id: "1",
            value: "1",
          },
          {
            id: "2",
            value: "2",
          },
          {
            id: "3",
            value: "3",
          },
        ],
        files: [],
      },
    });
  }),
  http.post(
    `${baseUrl}event/:eventId/blocks/:blockId/tasks/:taskId/answer`,
    () =>
      HttpResponse.json({
        status: "partial",
        points: 30,
        rightAnswerId: ["1", "2"],
      }),
  ),
];
