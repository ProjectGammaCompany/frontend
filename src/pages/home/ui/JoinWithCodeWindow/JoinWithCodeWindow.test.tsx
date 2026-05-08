import { baseApiUrl } from "@/shared/api/axios";
import { basicRender } from "@/shared/lib/testFunctions";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import JoinWithCodeWindow from "./JoinWithCodeWindow";

const server = setupServer();

describe("JoinWithCodeWindow", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("shows enter code by default", () => {
    basicRender(
      <JoinWithCodeWindow
        open
        setIsOpen={() => {
          "";
        }}
      />,
    );

    expect(screen.getByText("Введите пригласительный код")).toBeInTheDocument();
  });

  it("shows event fields after success code entering", async () => {
    const code = "12345";

    server.use(
      http.get(`${baseApiUrl}event/joinRequiredFields/:joinCode`, () => {
        return HttpResponse.json({
          groupFields: false,
        });
      }),
    );

    basicRender(
      <JoinWithCodeWindow
        open
        setIsOpen={() => {
          "";
        }}
      />,
    );

    await userEvent.type(screen.getByPlaceholderText("Код"), code);

    await userEvent.click(screen.getByText("Присоединиться"));

    expect(await screen.findByLabelText("Пароль события")).toBeInTheDocument();
  });

  it("shows event fields after success code entering and getting true from response", async () => {
    const code = "12345";

    server.use(
      http.get(`${baseApiUrl}event/joinRequiredFields/:joinCode`, () => {
        return HttpResponse.json({
          groupFields: true,
        });
      }),
    );

    basicRender(
      <JoinWithCodeWindow
        open
        setIsOpen={() => {
          "";
        }}
      />,
    );

    await userEvent.type(screen.getByPlaceholderText("Код"), code);

    await userEvent.click(screen.getByText("Присоединиться"));

    expect(await screen.findByLabelText("Пароль события")).toBeInTheDocument();

    expect(await screen.findByText("Данные группы")).toBeInTheDocument();
  });
});
