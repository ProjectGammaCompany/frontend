import { useMessage } from "@/shared/lib";
import { Typography } from "antd";
import dayjs from "dayjs";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from "react";
import FileItem from "../FileItem/FileItem";
import "./TaskView.scss";
interface TaskViewProps {
  taskData: {
    title: string;
    defaultTime?: number;
    description?: string;
    files: string[];
    timestamp?: string;
  };
  isExpirationFnCanceled?: boolean;
  //todo узнать, какой лучше тип использовать
  onExpirationTimeFn?: () => void;
  children?: ReactNode;
}

const TaskView = ({
  taskData,
  children,
  onExpirationTimeFn,
  isExpirationFnCanceled = false,
}: TaskViewProps) => {
  const { title, defaultTime, description, files, timestamp } = taskData;

  const extensions = {
    pic: ["svg", "jpg", "jpeg", "png", "webp"],
  };

  const hasTriggeredRef = useRef(false);

  const message = useMessage();

  const hasNotificationTimeTriggeredRef = useRef(false);

  const [time, setTime] = useState(defaultTime ?? 0);

  const getCounterString = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time - Math.floor(time / 60) * 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const getFileType = (
    extension: string,
  ): "default" | keyof typeof extensions => {
    for (const [key, value] of Object.entries(extensions)) {
      if (value.includes(extension)) {
        return key as keyof typeof extensions;
      }
    }
    return "default";
  };

  useEffect(() => {
    if (!defaultTime) return;
    const counter = window.setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, [defaultTime]);

  useEffect(() => {
    const currentDate = dayjs(Date.now());
    if (timestamp && defaultTime) {
      const endTime = dayjs(timestamp, "DD.MM.YYYY HH:mm:ss.SSS", true).add(
        defaultTime,
        "seconds",
      );

      setTime(endTime.diff(currentDate, "seconds"));
    }
  }, [defaultTime, timestamp]);

  const onTimeIsUp = useEffectEvent(() => {
    if (timestamp && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      onExpirationTimeFn?.();
    }
  });

  const onNotifyTime = useEffectEvent(() => {
    if (timestamp) {
      hasNotificationTimeTriggeredRef.current = true;
      message.warning("У вас осталось 15 секунд!");
    }
  });

  useEffect(() => {
    if (
      !isExpirationFnCanceled &&
      defaultTime &&
      defaultTime > 0 &&
      time <= 0
    ) {
      onTimeIsUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, defaultTime, isExpirationFnCanceled]);

  useEffect(() => {
    if (
      defaultTime &&
      defaultTime > 0 &&
      time <= 15 &&
      !hasNotificationTimeTriggeredRef.current
    ) {
      onNotifyTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTime, time]);

  return (
    <div className="task-view" data-testid="task-view">
      <Typography.Title level={1} className="task-view__title">
        {title}
      </Typography.Title>
      {defaultTime && defaultTime > 0 ? (
        <Typography.Paragraph
          className="task-view__timer-text"
          data-testid="time-text"
        >
          <b>Время: </b>
          <Typography.Text
            className={
              time < 30 ? "task-view__timer-text_running-out" : undefined
            }
          >
            {getCounterString(time)}
          </Typography.Text>
        </Typography.Paragraph>
      ) : undefined}
      {description && (
        <div>
          <Typography.Title level={2}>Описание</Typography.Title>
          <Typography.Paragraph>{description}</Typography.Paragraph>
        </div>
      )}
      {files && files.length > 0 && (
        <div>
          <Typography.Title level={2}>Файлы</Typography.Title>
          <ul className="task-view__file-list">
            {files.map((file) => {
              const fileExst = file.split(".").at(-1) ?? "";
              const iconType = getFileType(fileExst);
              return <FileItem key={file} path={file} iconType={iconType} />;
            })}
          </ul>
        </div>
      )}
      {children}
    </div>
  );
};

export default TaskView;
