import { baseApiUrl } from "@/shared/api";
import { basicRender, renderWithStoreAndRouter } from "@/shared/lib";
import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createRoutesStub } from "react-router";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import EventPage from "./EventPage";

const server = setupServer();

const Stub = createRoutesStub([
  {
    path: "/event/:eventId",
    Component: EventPage,
  },
]);

describe("EventPage", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("shows not found error, when gets response with status code 404", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return new HttpResponse(null, {
          status: 404,
        });
      }),
    );

    basicRender(<Stub initialEntries={["/event/12345"]} />, true);

    expect(
      await screen.findByText("Несуществующее событие"),
    ).toBeInTheDocument();
  });

  it("shows forbidden access error, when gets response with status code 403", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return new HttpResponse(null, {
          status: 403,
        });
      }),
    );

    basicRender(<Stub initialEntries={["/event/12345"]} />, true);

    expect(await screen.findByText("Нет доступа")).toBeInTheDocument();
  });

  it("shows error, when gets response with error status code", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    basicRender(<Stub initialEntries={["/event/12345"]} />, true);

    expect(
      await screen.findByText("Произошла ошибка, обновите страницу"),
    ).toBeInTheDocument();
  });

  it("pass editor role when gets 1 from api", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return HttpResponse.json({
          role: 1,
        });
      }),
      http.get(`${baseApiUrl}tags`, () => {
        return HttpResponse.json([]);
      }),
      http.get(`${baseApiUrl}event/:eventId`, () => {
        return HttpResponse.json({
          name: "event",
          blocks: [],
        });
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { store, ...screen } = renderWithStoreAndRouter(
      <Stub initialEntries={["/event/12345"]} />,
      {},
      true,
    );

    expect(await screen.findByText("Редактор")).toBeInTheDocument();
  });

  it("pass player role when gets 0 from api", async () => {
    server.use(
      http.get(`${baseApiUrl}event/:eventId/role`, () => {
        return HttpResponse.json({
          role: 0,
        });
      }),
      http.get(`${baseApiUrl}event/:eventId/playerInfo`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { store, ...screen } = renderWithStoreAndRouter(
      <Stub initialEntries={["/event/12345"]} />,
      {},
      true,
    );
    expect(await screen.findByText("Событие")).toBeInTheDocument();
  });
});
