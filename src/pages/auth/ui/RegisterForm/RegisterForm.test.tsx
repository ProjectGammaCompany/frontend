import { baseApiUrl } from "@/shared/api/axios";
import { basicRender } from "@/shared/lib/testFunctions";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createRoutesStub } from "react-router";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import RegisterForm from "./RegisterForm";

const server = setupServer();

const Home = () => {
  return <div>Home</div>;
};

describe("RegisterForm", () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: "error",
    }),
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("requires email, password,repeat password and agreement fields", async () => {
    basicRender(
      <RegisterForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.click(screen.getByText("Зарегистрироваться"));
    expect((await screen.findAllByText("Поле обязательно")).length).toBe(4);
  });

  it("requires email regex in the email field", async () => {
    basicRender(
      <RegisterForm
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
      <RegisterForm
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

  it("requires password repeat length equals 5 in the email field", async () => {
    basicRender(
      <RegisterForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Повторный ввод пароля"), "123");

    expect(
      await screen.findByText("Длина пароля не менее 5 символов"),
    ).toBeInTheDocument();
  });

  it("requires similar values in password and password repeat fields", async () => {
    basicRender(
      <RegisterForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");

    await userEvent.type(
      screen.getByLabelText("Повторный ввод пароля"),
      "123456",
    );

    expect(await screen.findByText("Пароли не совпадают")).toBeInTheDocument();
  });

  it("shows user existing error message when gets 403 status code", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/register`, () => {
        return new HttpResponse(null, {
          status: 403,
        });
      }),
    );
    basicRender(
      <RegisterForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.type(
      screen.getByLabelText("Повторный ввод пароля"),
      "12345",
    );
    await userEvent.click(screen.getByText(/Я принимаю/));
    await userEvent.click(screen.getByText("Зарегистрироваться"));

    expect(
      await screen.findByText("Пользователь с указанной почтой уже существует"),
    ).toBeInTheDocument();
  }, 10000);

  it("shows error message when gets error status code", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/register`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );
    basicRender(
      <RegisterForm
        setHeightForm={() => {
          /* empty */
        }}
      />,
    );
    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.type(
      screen.getByLabelText("Повторный ввод пароля"),
      "12345",
    );
    await userEvent.click(screen.getByText(/Я принимаю/));
    await userEvent.click(screen.getByText("Зарегистрироваться"));

    expect(
      await screen.findByText("Произошла ошибка. Повторите попытку позже"),
    ).toBeInTheDocument();
  }, 10000);

  it("navigates to home page after success register", async () => {
    server.use(
      http.post(`${baseApiUrl}auth/register`, () => {
        return HttpResponse.json({
          accessToken: "123456",
          refreshToken: "1234567",
        });
      }),
    );
    const Stub = createRoutesStub([
      {
        path: "/auth",
        Component: RegisterForm,
      },
      {
        path: "/home",
        Component: Home,
      },
    ]);

    basicRender(<Stub initialEntries={["/auth"]} />, true);

    await userEvent.type(screen.getByLabelText("Почта"), "user@email.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "12345");
    await userEvent.type(
      screen.getByLabelText("Повторный ввод пароля"),
      "12345",
    );
    await userEvent.click(screen.getByText(/Я принимаю/));
    await userEvent.click(screen.getByText("Зарегистрироваться"));

    expect(await screen.findByText("Home")).toBeInTheDocument();
  });
});
