import { basicRender } from "@/shared/lib";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("shows error messages for required fields", async () => {
    basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByText("submit"));

    await waitFor(() => {
      expect(screen.getAllByText("Поле обязательно")).toHaveLength(2);
    });
  });

  it("shows options interface when single choice type has been selected", async () => {
    basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByTestId("select-type"));

    await userEvent.click(screen.getByText("Один правильный ответ"));

    expect(screen.getByText("Опции")).toBeInTheDocument();
  });

  it("shows options interface when multiple choice type has been selected", async () => {
    basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByTestId("select-type"));

    await userEvent.click(screen.getByText("Множественный выбор"));

    expect(screen.getByText("Опции")).toBeInTheDocument();
  });

  it("shows text input interface when text input/qr-code scanning type has been selected", async () => {
    basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByTestId("select-type"));

    await userEvent.click(screen.getByText("Ввод текстом/Считывание QR-кода"));

    expect(screen.getByText("Правильный ответ")).toBeInTheDocument();
  });

  it("shows qr-code scanning interface when text input/qr-code scanning type has been selected and qr-code mode has been activated", async () => {
    const { container } = basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByTestId("select-type"));

    await userEvent.click(screen.getByText("Ввод текстом/Считывание QR-кода"));

    const button = container.querySelector(".task-form__switch-qr-mode-btn");

    expect(button).toBeInTheDocument();
    fireEvent.click(button!);

    expect(screen.getByText("Скачать QR-код")).toBeInTheDocument();
  });

  it("allows to choice only one of the right answer among options when single choice type has been selected", async () => {
    basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByTestId("select-type"));
    await userEvent.click(screen.getByText("Один правильный ответ"));
    expect(screen.getByText("Опции")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Добавить"));
    await userEvent.click(screen.getByText("Добавить"));

    expect(screen.getAllByPlaceholderText("Введите текст опции").length).toBe(
      2,
    );

    let toggles = screen.getAllByTestId(/right-answer-toggle/);
    await userEvent.click(toggles[0]);

    expect(toggles[0]).toHaveClass("option-item__right-answer-toggle_right");

    expect(toggles[1]).not.toHaveClass(
      "option-item__right-answer-toggle_right",
    );

    toggles = screen.getAllByTestId(/right-answer-toggle/);

    await userEvent.click(toggles[1]);

    expect(toggles[0]).not.toHaveClass(
      "option-item__right-answer-toggle_right",
    );
    expect(toggles[1]).toHaveClass("option-item__right-answer-toggle_right");
  }, 10000);

  it("allows to choice multiple right answers among options when multiple choice type has been selected", async () => {
    basicRender(
      <TaskForm<void>
        submitBtnText="submit"
        mutationFn={() => {
          return Promise.resolve();
        }}
        order={1}
      />,
    );

    await userEvent.click(screen.getByTestId("select-type"));
    await userEvent.click(screen.getByText("Множественный выбор"));
    expect(screen.getByText("Опции")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Добавить"));
    await userEvent.click(screen.getByText("Добавить"));
    expect(screen.getAllByPlaceholderText("Введите текст опции").length).toBe(
      2,
    );

    let toggles = screen.getAllByTestId(/right-answer-toggle/);
    await userEvent.click(toggles[0]);

    expect(toggles[0]).toHaveClass("option-item__right-answer-toggle_right");

    expect(toggles[1]).not.toHaveClass(
      "option-item__right-answer-toggle_right",
    );

    toggles = screen.getAllByTestId(/right-answer-toggle/);

    await userEvent.click(toggles[1]);

    expect(toggles[0]).toHaveClass("option-item__right-answer-toggle_right");
    expect(toggles[1]).toHaveClass("option-item__right-answer-toggle_right");
  }, 10000);
});
