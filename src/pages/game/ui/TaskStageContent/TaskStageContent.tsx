import { useSendAnswer } from "@/src/features";
import { queryClient } from "@/src/shared/api";
import { ChoiceTask, InfoBlock, TextEntryTask } from "@/src/widgets";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { type TaskStageData } from "../../api";
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
    void queryClient.invalidateQueries({
      queryKey: [eventId, "game"],
    });
  };

  const sendAnswerMutation = useSendAnswer(
    eventId,
    defaultTask.blockId,
    defaultTask.id,
    [],
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
    task.id,
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
    3: TextEntryTask,
    4: TextEntryTask,
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
      sendAnswerMutation.mutate();
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
