// const validAccessToken = "testAccess";
// const validRefreshToken = "testRefresh";

import { http, HttpResponse } from "msw";

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const handlers = [
  http.get(`${baseUrl}event/:eventId/nextStage`, () => {
    return HttpResponse.json({
      type: "task",
      task: {
        id: "string",
        blockId: "string",
        name: "string",
        description: "string",
        type: 4,
        options: [],
        files: [],
        time: 30,
      },
    });
  }),
  http.put(
    `${baseUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
    () => {
      return HttpResponse.json({});
    },
  ),
];
