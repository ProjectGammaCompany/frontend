import type { TaskStageFile } from "@/entities";
import { basicRender } from "@/shared/lib";
import { act, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { describe, expect, it, vi } from "vitest";
import TaskView from "./TaskView";

describe("TaskView", () => {
  it("calls once onExpirationTimeFn after time has elapsed", () => {
    vi.useFakeTimers();
    const mock = vi.fn();
    const timestamp = dayjs(Date.now()).format("DD.MM.YYYY HH:mm:ss.SSS");

    const taskData: {
      title: string;
      defaultTime?: number;
      description?: string;
      files: TaskStageFile[];
      timestamp?: string;
    } = {
      title: "",
      defaultTime: 5,
      timestamp,
      files: [],
    };
    basicRender(<TaskView taskData={taskData} onExpirationTimeFn={mock} />);
    expect(mock).not.toHaveBeenCalled();
    expect(screen.queryByTestId("time-text")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(mock).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(mock).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("doesn't use counter without default time", () => {
    vi.useFakeTimers();
    const mock = vi.fn();

    const taskData: {
      title: string;
      defaultTime?: number;
      description?: string;
      files: TaskStageFile[];
      timestamp?: string;
    } = {
      title: "",
      defaultTime: 0,
      files: [],
    };
    basicRender(<TaskView taskData={taskData} onExpirationTimeFn={mock} />);

    expect(screen.queryByTestId("time-text")).not.toBeInTheDocument();
    expect(mock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(mock).not.toHaveBeenCalled();

    expect(screen.queryByTestId("time-text")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
