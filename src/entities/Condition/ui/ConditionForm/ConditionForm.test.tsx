import { baseApiUrl } from "@/shared/api";
import { basicRender } from "@/shared/lib";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import ConditionForm from "./ConditionForm";

const server = setupServer();

describe("ConditionForm", () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: "error",
    });
    server.use(
      http.get(`${baseApiUrl}event/1234/groups`, () => {
        return HttpResponse.json({
          groups: [
            {
              id: "1",
              name: "1",
            },
          ],
        });
      }),
      http.get(`${baseApiUrl}event/:eventId/blocks`, () => {
        return HttpResponse.json({
          blocks: [],
        });
      }),
    );
  });
  afterAll(() => server.close());

  it("doesn't show min and max fields by default", () => {
    basicRender(
      <ConditionForm<void>
        groups={[]}
        isGroupsPending={false}
        blockOptions={undefined}
        isBlockOptionsError={false}
        isBlockOptionsPending={false}
        mutationFn={() => {
          return Promise.resolve();
        }}
        submitBtnText="submit"
      />,
    );
    expect(screen.queryByLabelText("Введите число")).not.toBeInTheDocument();
  });

  it("shows min and max fields when switches has been activated", async () => {
    basicRender(
      <ConditionForm<void>
        groups={[]}
        isGroupsPending={false}
        blockOptions={undefined}
        isBlockOptionsError={false}
        isBlockOptionsPending={false}
        mutationFn={() => {
          return Promise.resolve();
        }}
        submitBtnText="submit"
      />,
    );

    await userEvent.click(
      screen.getByText(
        "За ранее пройденные задания набрано не менее заданного количества баллов",
        {
          exact: false,
        },
      ),
    );

    await userEvent.click(
      screen.getByText(
        "За ранее пройденные задания набрано менее заданного количества баллов",
        {
          exact: false,
        },
      ),
    );

    expect(screen.getAllByLabelText("Введите число").length).toBe(2);
  });

  it("shows error messages with empty fields", async () => {
    basicRender(
      <ConditionForm<void>
        groups={[
          {
            value: "1",
            label: "1",
          },
        ]}
        isGroupsPending={false}
        blockOptions={undefined}
        isBlockOptionsError={false}
        isBlockOptionsPending={false}
        mutationFn={() => {
          return Promise.resolve();
        }}
        submitBtnText="submit"
      />,
    );

    await userEvent.click(screen.getByText("submit"));

    const texts = await screen.findAllByText(
      "Выберите хотя бы одно из правил для условия",
      {},
      { timeout: 4000 },
    );

    expect(texts.length).toBe(3);

    expect(await screen.findByText("Поле обязательно")).toBeInTheDocument();
  });
});
