import { basicRender } from "@/shared/lib";
import { screen } from "@testing-library/react";
import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import InteractButton from "./InteractButton";

describe("InteractButton", () => {
  it("active, when the event is not started and it doesn't have start or end dates", () => {
    basicRender(
      <InteractButton
        eventId="1234"
        status="not started"
        needGroup={false}
        onNeedGroup={() => {
          "";
        }}
      />,
    );

    const button = screen.getByRole("button", { name: /Начать/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("active, when the event is not started, startDate is less than the current date and endDate isn't provided", () => {
    const currentDate = dayjs(Date.now());
    const startDate = currentDate
      .subtract(3, "minute")
      .format("DD.MM.YYYY HH:mm");
    basicRender(
      <InteractButton
        eventId="1234"
        status="not started"
        needGroup={false}
        onNeedGroup={() => {
          "";
        }}
        startDate={startDate}
      />,
    );

    const button = screen.getByRole("button", { name: /Начать/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("active, when the event is not started, startDate is less than the current date and endDate is greater than currentDate", () => {
    const currentDate = dayjs(Date.now());
    const startDate = currentDate
      .subtract(3, "minute")
      .format("DD.MM.YYYY HH:mm");

    const endDate = currentDate.add(3, "minute").format("DD.MM.YYYY HH:mm");
    basicRender(
      <InteractButton
        eventId="1234"
        status="not started"
        needGroup={false}
        onNeedGroup={() => {
          "";
        }}
        startDate={startDate}
        endDate={endDate}
      />,
    );

    const button = screen.getByRole("button", { name: /Начать/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("disabled, when the event is not started, startDate is greater than the current date and endDate is not provided", () => {
    const currentDate = dayjs(Date.now());
    const startDate = currentDate.add(3, "minute").format("DD.MM.YYYY HH:mm");

    basicRender(
      <InteractButton
        eventId="1234"
        status="not started"
        needGroup={false}
        onNeedGroup={() => {
          "";
        }}
        startDate={startDate}
      />,
    );

    const button = screen.getByRole("button", { name: /Начать/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("hidden, when the event is not started, startDate is less than the current date and endDate is less than the current date", () => {
    const currentDate = dayjs(Date.now());
    const startDate = currentDate
      .subtract(3, "minute")
      .format("DD.MM.YYYY HH:mm");
    const endDate = currentDate
      .subtract(2, "minute")
      .format("DD.MM.YYYY HH:mm");

    basicRender(
      <InteractButton
        eventId="1234"
        status="not started"
        needGroup={false}
        onNeedGroup={() => {
          "";
        }}
        startDate={startDate}
        endDate={endDate}
      />,
    );

    const button = screen.queryByRole("button", { name: /Начать/i });

    expect(button).not.toBeInTheDocument();
  });

  it("active, when the event is in progress, startDate is less than the current date and endDate is less than the current date", () => {
    const currentDate = dayjs(Date.now());
    const startDate = currentDate
      .subtract(3, "minute")
      .format("DD.MM.YYYY HH:mm");
    const endDate = currentDate
      .subtract(2, "minute")
      .format("DD.MM.YYYY HH:mm");

    basicRender(
      <InteractButton
        eventId="1234"
        status="in progress"
        needGroup={false}
        onNeedGroup={() => {
          "";
        }}
        startDate={startDate}
        endDate={endDate}
      />,
    );

    const button = screen.queryByRole("button", { name: /Начать/i });

    expect(button).not.toBeInTheDocument();
  });
});
