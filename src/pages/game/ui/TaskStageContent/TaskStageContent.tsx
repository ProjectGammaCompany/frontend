import type { TaskStageData } from "@/entities";
import { useSendAnswer } from "@/features";
import { getShuffledArray } from "@/shared/lib";
import { ChoiceTask, InfoBlock, TextEntryTask } from "@/widgets";
import { Button, Flex, Spin, Typography } from "antd";
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

  const handleSuccessSendAnswer = () => {
    invalidateGameData(eventId);
  };

  const sendAnswerMutation = useSendAnswer(
    eventId,
    defaultTask.blockId,
    defaultTask.taskId,
    handleSuccessSendAnswer,
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
    1: ({ data }) => {
      const shuffledTasks = data.options
        ? getShuffledArray(data.options)
        : data.options;
      return (
        <ChoiceTask
          data={{ ...data, type: 1, eventId: eventId, options: shuffledTasks }}
        />
      );
    },
    2: ({ data }) => {
      const shuffledTasks = data.options
        ? getShuffledArray(data.options)
        : data.options;
      return (
        <ChoiceTask
          data={{ ...data, type: 2, eventId: eventId, options: shuffledTasks }}
        />
      );
    },
    3: ({ data }) => (
      <TextEntryTask data={{ ...data, type: "text", eventId: eventId }} />
    ),
    4: ({ data }) => (
      <TextEntryTask data={{ ...data, type: "qr", eventId: eventId }} />
    ),
  };

  useEffect(() => {
    if (
      !task.timestamp &&
      !timestampError &&
      !timestampFixingMutation.isPending
    ) {
      timestampFixingMutation.mutate(
        dayjs(Date.now()).format("DD.MM.YYYY HH:mm:ss.SSS"),
      );
    } else if (
      task.time &&
      task.timestamp &&
      dayjs(Date.now()) >
        dayjs(task.timestamp, "DD.MM.YYYY HH:mm:ss.SSS", true).add(
          task.time,
          "seconds",
        ) &&
      !isOverdueTask
    ) {
      setIsOverdueTask(true);
    }
  }, [
    isOverdueTask,
    task.timestamp,
    timestampError,
    timestampFixingMutation,
    task.time,
  ]);

  useEffect(() => {
    if (
      isOverdueTask &&
      !sendAnswerMutation.isPending &&
      !sendAnswerMutation.isError
    ) {
      sendAnswerMutation.mutate([]);
    }
  }, [isOverdueTask, sendAnswerMutation]);

  if (timestampError) {
    return (
      <Flex align="center">
        <Typography.Paragraph type="danger">
          Произошла ошибка. Перезагрузите страницу.
        </Typography.Paragraph>
      </Flex>
    );
  }

  if (isOverdueTask) {
    return (
      <Flex align="center" justify="center" vertical>
        <Typography.Paragraph type="danger">
          Срок выполнения задания истёк. Обновление данных...
        </Typography.Paragraph>
        {sendAnswerMutation.isPending && <Spin />}
        {sendAnswerMutation.isError && (
          <>
            <Typography.Paragraph type="danger">
              Не удалось обновить данные. Повторите попытку
            </Typography.Paragraph>
            <Button
              onClick={() => {
                sendAnswerMutation.mutate([]);
              }}
            >
              Обновить данные
            </Button>
          </>
        )}
      </Flex>
    );
  }

  if ([0, 1, 2, 3, 4].includes(task.type)) {
    const Component = taskMap[task.type as 0 | 1 | 2 | 3 | 4];
    return <Component data={task} />;
  }

  return <div>Ошибка, неизвестный тип задачи!</div>;
};

export default TaskStageContent;
