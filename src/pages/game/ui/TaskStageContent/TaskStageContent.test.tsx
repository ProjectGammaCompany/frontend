import type { TaskStageData } from "@/entities";
import { baseApiUrl } from "@/shared/api";
import { basicRender } from "@/shared/lib";
import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import TaskStageContent from "./TaskStageContent";

const server = setupServer();
describe("TaskStageContent", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("shows info block when gets 0 task type", async () => {
    server.use(
      http.put(
        `${baseApiUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
        () => {
          return new HttpResponse(null, {
            status: 200,
          });
        },
      ),
    );

    const taskData: TaskStageData = {
      taskId: "1",
      blockId: "1",
      name: "1",
      type: 0,
      files: [],
    };

    basicRender(<TaskStageContent eventId="123" defaultTask={taskData} />);

    expect(await screen.findByTestId("info-block")).toBeTruthy();
  });

  it("shows single choice task  when gets 1 task type", async () => {
    server.use(
      http.put(
        `${baseApiUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
        () => {
          return new HttpResponse(null, {
            status: 200,
          });
        },
      ),
    );

    const taskData: TaskStageData = {
      taskId: "1",
      blockId: "1",
      name: "1",
      type: 1,
      files: [],
      options: [],
    };

    basicRender(<TaskStageContent eventId="123" defaultTask={taskData} />);

    expect(await screen.findByText("Выберите 1 правильный ответ")).toBeTruthy();
  });

  it("shows multiple choice task when gets 2 task type", async () => {
    server.use(
      http.put(
        `${baseApiUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
        () => {
          return new HttpResponse(null, {
            status: 200,
          });
        },
      ),
    );

    const taskData: TaskStageData = {
      taskId: "1",
      blockId: "1",
      name: "1",
      type: 2,
      files: [],
      options: [],
    };

    basicRender(<TaskStageContent eventId="123" defaultTask={taskData} />);

    expect(await screen.findByText("Выберите правильные ответы")).toBeTruthy();
  });

  it("shows text entry task when gets 3 task type", async () => {
    server.use(
      http.put(
        `${baseApiUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
        () => {
          return new HttpResponse(null, {
            status: 200,
          });
        },
      ),
    );

    const taskData: TaskStageData = {
      taskId: "1",
      blockId: "1",
      name: "1",
      type: 3,
      files: [],
    };

    basicRender(<TaskStageContent eventId="123" defaultTask={taskData} />);

    expect(await screen.findByText("Введите ответ:")).toBeTruthy();
  });

  it("shows qr-code scanning task when gets 4 task type", async () => {
    server.use(
      http.put(
        `${baseApiUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
        () => {
          return new HttpResponse(null, {
            status: 200,
          });
        },
      ),
    );

    const taskData: TaskStageData = {
      taskId: "1",
      blockId: "1",
      name: "1",
      type: 4,
      files: [],
    };

    basicRender(<TaskStageContent eventId="123" defaultTask={taskData} />);

    expect(await screen.findByText("Отсканируйте QR-код:")).toBeTruthy();
  });
});
