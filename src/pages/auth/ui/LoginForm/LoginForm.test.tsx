import { baseApiUrl } from "@/shared/api/axios";
import { settingsStorage } from "@/shared/lib/settingsStorage";
import { basicRender } from "@/shared/lib/testFunctions";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createRoutesStub } from "react-router";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import LoginForm from "./LoginForm";

const server = setupServer();

const Home = () => {
  return <div>Home</div>;
};

describe("LoginForm", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("requires email and password fields", async () => {
    basicRender(
      <LoginForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.click(screen.getByText("Войти"));
    expect((await screen.findAllByText("Поле обязательно")).length).toBe(2);
  });

  it("requires email regex in the email field", async () => {
    basicRender(
      <LoginForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Почта"), "1232");

    expect(
      await screen.findByText("Введите корректную почту"),
    ).toBeInTheDocument();
  });

  it("requires password length equals 5 in the email field", async () => {
    basicRender(
      <LoginForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Пароль"), "123");

    expect(
      await screen.findByText("Длина пароля не менее 5 символов"),
    ).toBeInTheDocument();
  });

  it("shows no user error message when gets 403 status code", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/login`, () => {
        return new HttpResponse(null, {
          status: 403,
        });
      }),
    );
    basicRender(
      <LoginForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.click(screen.getByText("Войти"));

    expect(
      await screen.findByText(
        "Пользователя с указанными данными не существует",
      ),
    ).toBeInTheDocument();
  });

  it("shows error message when gets error status code", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/login`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    basicRender(
      <LoginForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );

    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.click(screen.getByText("Войти"));

    expect(
      await screen.findByText("Произошла ошибка. Повторите попытку позже"),
    ).toBeInTheDocument();
  });

  it("navigates to home page after success login", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/login`, () => {
        return HttpResponse.json({
          accessToken: "123456",
          refreshToken: "1234567",
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: "/auth",
        Component: LoginForm,
      },
      {
        path: "/home",
        Component: Home,
      },
    ]);

    basicRender(<Stub initialEntries={["/auth"]} />, true);

    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.click(screen.getByText("Войти"));

    expect(await screen.findByText("Home")).toBeInTheDocument();
  });

  it("sets rememberMe in storage if switch is turned and login is success", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/login`, () => {
        return HttpResponse.json({
          accessToken: "123456",
          refreshToken: "1234567",
        });
      }),
    );

    const Stub = createRoutesStub([
      {
        path: "/auth",
        Component: LoginForm,
      },
      {
        path: "/home",
        Component: Home,
      },
    ]);

    basicRender(<Stub initialEntries={["/auth"]} />, true);

    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.click(screen.getByText("Войти"));
    await userEvent.click(screen.getByText("Запомнить меня"));

    expect(settingsStorage.getRememberMe()).toBeTruthy();
  });
});
