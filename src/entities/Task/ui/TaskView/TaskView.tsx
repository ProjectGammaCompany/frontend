import { Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  isExpirationFnCanceled: boolean;
  //todo узнать, какой лучше тип использовать
  onExpirationTimeFn: () => void;
  children: ReactNode;
}

const TaskView = ({
  taskData,
  children,
  onExpirationTimeFn,
  isExpirationFnCanceled,
}: TaskViewProps) => {
  const { title, defaultTime, description, files, timestamp } = taskData;

  const hasTriggeredRef = useRef(false);

  const [time, setTime] = useState(defaultTime ?? 0);

  const getCounterString = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time - Math.floor(time / 60) * 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!defaultTime) return;
    const counter = setInterval(() => {
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
      const endTime = dayjs(timestamp, "DD.MM.YYYY HH:mm:ss:SSS", true).add(
        defaultTime,
        "seconds",
      );

      setTime(endTime.diff(currentDate, "seconds"));
    }
  }, [defaultTime, timestamp]);

  //todo: фикс зависимостей
  useEffect(() => {
    if (
      !isExpirationFnCanceled &&
      defaultTime &&
      timestamp &&
      time == 0 &&
      !hasTriggeredRef.current
    ) {
      console.log(isExpirationFnCanceled);
      console.log("запуск функции");
      onExpirationTimeFn();
    }
  }, [time, isExpirationFnCanceled]);
  return (
    <div className="task-view">
      <Typography.Title level={1}>{title}</Typography.Title>
      {defaultTime && (
        <Typography.Paragraph>
          <b>Время:</b> {getCounterString(time)}
        </Typography.Paragraph>
      )}
      {description && (
        <div>
          <Typography.Title level={2}>Описание</Typography.Title>
          <Typography.Paragraph>{description}</Typography.Paragraph>
        </div>
      )}
      {files && (
        <div>
          <Typography.Title level={2}>Файлы</Typography.Title>
          <ul className="task-view__file-list">
            {files.map((file) => (
              <FileItem key={file} path={file} />
            ))}
          </ul>
        </div>
      )}
      {children}
    </div>
  );
};

export default TaskView;
