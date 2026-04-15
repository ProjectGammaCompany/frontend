import { basicRender } from "@/shared/lib/testFunctions/basicRender";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AuthPage } from "./AuthPage";

describe("AuthPage", () => {
  it("renders login form by default", () => {
    basicRender(<AuthPage />);
    expect(screen.getByText("Забыли пароль?")).toBeInTheDocument();
  });

  it("renders register form after clicking the toggle button", async () => {
    basicRender(<AuthPage />);
    await userEvent.click(screen.getByText("Регистрация"));

    expect(screen.getByLabelText("Повторный ввод пароля")).toBeInTheDocument();
  });

  it("switches back to the login form after clicking the toggle button again", async () => {
    basicRender(<AuthPage />);
    await userEvent.click(screen.getByText("Регистрация"));

    expect(screen.getByLabelText("Повторный ввод пароля")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Вход"));

    expect(screen.getByText("Забыли пароль?")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.queryByLabelText("Повторный ввод пароля"),
      ).not.toBeInTheDocument();
    });
  });
});
