import type { TaskStageData } from "@/src/entities";
import { useSendAnswer } from "@/src/features";
import { ChoiceTask, InfoBlock, TextEntryTask } from "@/src/widgets";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { invalidateGameData } from "../../model/invalidateGameData";
import { useTimestampMutation } from "../../model/useTimeStampFix";

interface TaskStageProps {
  defaultTask: TaskStageData;
  eventId: string;
}

//todo: выделить типизацию таски куда-то для переиспользования
const TaskStageContent = ({ eventId, defaultTask }: TaskStageProps) => {
  const [task, setTask] = useState(defaultTask);

  const [timestampError, setTimeStampError] = useState(false);

  const [isOverdueTask, setIsOverdueTask] = useState(false);

  const handleSuccessSendingAnswer = () => {
    invalidateGameData(eventId);
  };

  const sendAnswerMutation = useSendAnswer(
    eventId,
    defaultTask.blockId,
    defaultTask.taskId,
    handleSuccessSendingAnswer,
  );

  const handleSuccessTimestampFixing = (timestamp: string) => {
    setTask((prev) => {
      return { ...prev, timestamp: timestamp };
    });
  };

  const handleErrorTimestampFixing = () => {
    setTimeStampError(true);
  };

  const timestampFixingMutation = useTimestampMutation(
    eventId,
    task.taskId,
    task.blockId,
    handleSuccessTimestampFixing,
    handleErrorTimestampFixing,
  );

  const taskMap: Record<
    0 | 1 | 2 | 3 | 4,
    React.ComponentType<{ data: TaskStageData }>
  > = {
    0: ({ data }) => (
      <InfoBlock
        data={{
          ...data,
          eventId: eventId,
        }}
      />
    ),
    1: ({ data }) => (
      <ChoiceTask data={{ ...data, type: 1, eventId: eventId }} />
    ),
    2: ({ data }) => (
      <ChoiceTask data={{ ...data, type: 2, eventId: eventId }} />
    ),
    3: ({ data }) => (
      <TextEntryTask data={{ ...data, type: "text", eventId: eventId }} />
    ),
    4: ({ data }) => (
      <TextEntryTask data={{ ...data, type: "qr", eventId: eventId }} />
    ),
  };

  //todo: проверить зависимости
  useEffect(() => {
    if (task.time) {
      if (
        !task.timestamp &&
        !timestampError &&
        !timestampFixingMutation.isPending
      ) {
        timestampFixingMutation.mutate(
          dayjs(Date.now()).format("DD.MM.YYYY HH:mm:ss:SSS"),
        );
      } else if (
        task.timestamp &&
        dayjs(Date.now()) >
          dayjs(task.timestamp, "DD.MM.YYYY HH:mm:ss:SSS", true) &&
        !isOverdueTask
      ) {
        setIsOverdueTask(true);
      }
    }
  }, [
    isOverdueTask,
    task.time,
    task.timestamp,
    timestampError,
    timestampFixingMutation,
  ]);

  useEffect(() => {
    if (isOverdueTask) {
      sendAnswerMutation.mutate([]);
    }
  }, [isOverdueTask, sendAnswerMutation]);

  if (timestampError) {
    return <div>Произошла ошибка. Перезагрузите страницу.</div>;
  }

  if (isOverdueTask) {
    return <div>Просрочка... Отправка пустого ответа...</div>;
  }

  if ([0, 1, 2, 3, 4].includes(task.type)) {
    const Component = taskMap[task.type as 0 | 1 | 2 | 3 | 4];
    return <Component data={task} />;
  }

  return <div>Ошибка, неизвестный тип задачи!</div>;
};

export default TaskStageContent;
