import { baseUrl } from "@/shared/api";
import { basicRender } from "@/shared/lib";
import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createRoutesStub } from "react-router";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import GamePage from "./GamePage";

const server = setupServer();
describe("GamePage", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("shows endGameContent, when it gets type end", async () => {
    server.use(
      http.get(`${baseUrl}event/:eventId/nextStage`, () => {
        return HttpResponse.json({
          type: "end",
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: "/event/:eventId/game",
        Component: GamePage,
      },
    ]);
    basicRender(<Stub initialEntries={["/event/1234/game"]} />, true);

    expect(await screen.findByTestId("end-game")).toBeInTheDocument();
  });

  it("shows block stage, when it gets type block", async () => {
    server.use(
      http.get(`${baseUrl}event/:eventId/nextStage`, () => {
        return HttpResponse.json({
          type: "block",
          block: {
            blockId: "1",
            name: "",
            tasks: [],
          },
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: "/event/:eventId/game",
        Component: GamePage,
      },
    ]);
    basicRender(<Stub initialEntries={["/event/1234/game"]} />, true);

    expect(await screen.findByTestId("block-stage")).toBeInTheDocument();
  });

  it("shows task stage, when it gets type task", async () => {
    server.use(
      http.get(`${baseUrl}event/:eventId/nextStage`, () => {
        return HttpResponse.json({
          type: "task",
          task: {
            taskId: "1",
            blockId: "1",
            name: "1",
            type: 0,
            files: [],
          },
        });
      }),
      http.put(
        `${baseUrl}event/:eventId/blocks/:blockId/tasks/:taskId/timestamp`,
        () => {
          return new HttpResponse(null, {
            status: 200,
          });
        },
      ),
    );

    const Stub = createRoutesStub([
      {
        path: "/event/:eventId/game",
        Component: GamePage,
      },
    ]);

    basicRender(<Stub initialEntries={["/event/1234/game"]} />, true);

    expect(await screen.findByTestId("task-view")).toBeTruthy();
  });
});
