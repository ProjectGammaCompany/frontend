import { basicRender } from "@/shared/lib";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChoiceTask from "./ChoiceTask";

const mutateMock = vi.fn();

vi.mock("/src/features/sendTaskAnswer/model/useSendAnswer.ts", () => ({
  useSendAnswer: () => ({
    mutate: mutateMock,
    isPending: false,
    isError: false,
  }),
}));

describe("ChoiceTask", () => {
  beforeEach(() => {
    mutateMock.mockReset();
  });
  it("allows selecting only one option for type 1", async () => {
    basicRender(
      <ChoiceTask
        data={{
          type: 1,
          eventId: "1",
          taskId: "1",
          blockId: "1",
          name: "Test",
          files: [],
          options: [
            { id: "1", value: "Первый" },
            { id: "2", value: "Второй" },
          ],
        }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await userEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();

    await userEvent.click(checkboxes[1]);

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it("allows selecting multiple options for type 2", async () => {
    basicRender(
      <ChoiceTask
        data={{
          type: 2,
          eventId: "1",
          taskId: "1",
          blockId: "1",
          name: "Test",
          files: [],
          options: [
            { id: "1", value: "Первый" },
            { id: "2", value: "Второй" },
          ],
        }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it("sends only one selected answer for type 1", async () => {
    basicRender(
      <ChoiceTask
        data={{
          type: 1,
          eventId: "1",
          taskId: "1",
          blockId: "1",
          files: [],
          name: "Test",
          options: [
            { id: "1", value: "Первый" },
            { id: "2", value: "Второй" },
          ],
        }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await userEvent.click(checkboxes[0]);
    await userEvent.click(screen.getByRole("button", { name: /Отправить/i }));

    expect(mutateMock).toHaveBeenCalledWith(["1"]);
    expect(mutateMock).toHaveBeenCalledTimes(1);
  });

  it("sends all selected answers for type 2", async () => {
    basicRender(
      <ChoiceTask
        data={{
          type: 2,
          eventId: "1",
          taskId: "1",
          blockId: "1",
          files: [],
          name: "Test",
          options: [
            { id: "1", value: "Первый" },
            { id: "2", value: "Второй" },
            { id: "3", value: "Третий" },
          ],
        }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[2]);

    await userEvent.click(screen.getByRole("button", { name: /Отправить/i }));

    expect(mutateMock).toHaveBeenCalledWith(["1", "3"]);
    expect(mutateMock).toHaveBeenCalledTimes(1);
  });
});
