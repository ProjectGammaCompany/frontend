import { baseApiUrl } from "@/shared/api/axios";
import { basicRender } from "@/shared/lib/testFunctions";
import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import StatsPageContent from "./StatsPageContent";

const server = setupServer();
describe("StatsPageContent", () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "error",
    });
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it("shows player stats when gets 0 as the role", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return HttpResponse.json({
          role: 0,
        });
      }),
      http.get(`${baseApiUrl}event/:eventId/playerStats`, () => {
        return HttpResponse.json({
          userId: "1",
          fullStats: false,
          groupEvent: false,
          users: [
            {
              id: "1",
              username: "user1",
              points: 25,
              current: true,
            },
          ],
        });
      }),
    );

    basicRender(<StatsPageContent eventId="23" />);

    expect(await screen.findByText(/Вами набрано/)).toBeInTheDocument();
  });

  it("shows editor stats when gets 1 as the role", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return HttpResponse.json({
          role: 1,
        });
      }),
      http.get(`${baseApiUrl}event/:eventId/editorStats`, () => {
        return HttpResponse.json({
          groupEvent: false,
          users: [
            {
              id: "1",
              username: "user",
              answers: {
                correct: 1,
                total: 2,
              },
              points: 25,
            },
          ],
        });
      }),
    );

    basicRender(<StatsPageContent eventId="23" />);

    expect(
      (await screen.findAllByText(/Правильных ответов на вопросы/)).length,
    ).greaterThan(0);
  });
});
