import { TaskView, type TaskStageFile } from "@/entities";
import {
  SendAnswerButton,
  useSendAnswer,
  type SendAnswerResponse,
} from "@/features";
import { queryClient } from "@/shared/api";
import { useNotify } from "@/shared/lib";
import { getTaskNotificationStyle } from "@/shared/lib/notifications";
import { Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import QRInputBlock from "../QRBlock/QRBlock";
import TextInputBlock from "../TextInputBlock/TextInputBlock";
import "./TextEntryTask.scss";
interface TextEntryTaskProps {
  data: TextEntryTaskData;
}

//todo: change for final version
//todo: не забыть приведение в lowercase перед отправкой ответа
interface TextEntryTaskData {
  taskId: string;
  name: string;
  description?: string;
  files: TaskStageFile[];
  time?: number;
  timestamp?: string;
  eventId: string;
  blockId: string;
  type: "text" | "qr";
}

const TextEntryTask = ({ data }: TextEntryTaskProps) => {
  const { eventId, blockId, taskId: id } = data;

  const [inputMode, setInputMode] = useState<"qr" | "text">(data.type);

  const taskData = {
    title: data.name,
    defaultTime: data.time,
    description: data.description,
    files: data.files,
    timestamp: data.timestamp,
  };

  const notify = useNotify();

  const [answer, setAnswer] = useState<string[]>([]);

  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const [rightAnswer, setRightAnswer] = useState<string[] | undefined>(
    undefined,
  );

  const [disabled, setDisabled] = useState(false);

  const [isAnswerSended, setIsAnswerSended] = useState(false);

  const [isExpirationFnCanceled, SetIsExpirationFnCanceled] = useState(false);

  const handleSuccessSendAnswer = (data: AxiosResponse<SendAnswerResponse>) => {
    setDisabled(true);
    setSendButtonDisabled(true);

    SetIsExpirationFnCanceled(true);

    const { points, rightAnswer, status } = data.data;

    setRightAnswer(rightAnswer);

    if (status === "correct") {
      notify.success(
        getTaskNotificationStyle(
          status,
          "Задача успешно пройдена!",
          points ? `Вами получено баллов: ${points}` : undefined,
        ),
      );
    } else if (status === "incorrect") {
      notify.error(
        getTaskNotificationStyle(status, "Задача пройдена неправильно!"),
      );
    } else {
      notify.warning(
        getTaskNotificationStyle(
          status,
          "Задача пройдена частично правильно.",
          points ? `Вами получено баллов: ${points}` : undefined,
        ),
      );
    }
    setTimeout(() => {
      const el = document.getElementById("root");
      el?.scrollTo({ top: 0, behavior: "smooth" });
      void queryClient.invalidateQueries({
        queryKey: [eventId, "game"],
      });
    }, 5000);
  };

  const handleErrorSendAnswer = () => {
    setSendButtonDisabled(false);
    notify.error({
      title: "Не удалось сохранить ответ",
      description: "Произошла ошибка. Повторите попытку",
    });
  };

  const sendAnswerMutation = useSendAnswer(
    eventId,
    blockId,
    id,
    handleSuccessSendAnswer,
    handleErrorSendAnswer,
  );

  const handleSuccessScanning = (decodedText: string) => {
    setAnswer([decodedText]);
    sendAnswerMutation.mutate([decodedText]);
  };

  return (
    <TaskView
      taskData={taskData}
      onExpirationTimeFn={() => {
        setDisabled(true);
        sendAnswerMutation.mutate([]);
      }}
      isExpirationFnCanceled={isExpirationFnCanceled}
    >
      {data.type === "qr" ? (
        <QRInputBlock
          answer={answer}
          setAnswer={setAnswer}
          disabled={disabled || isAnswerSended}
          inputMode={inputMode}
          setInputMode={setInputMode}
          onSuccessScanning={handleSuccessScanning}
        />
      ) : (
        <TextInputBlock
          answer={answer}
          setAnswer={setAnswer}
          disabled={disabled || isAnswerSended}
        />
      )}
      {rightAnswer && data.type != "qr" && (
        <Typography.Paragraph>
          Правильный ответ: {rightAnswer}
        </Typography.Paragraph>
      )}
      {((data.type === "qr" && inputMode === "text") ||
        data.type === "text") && (
        <div className="text-entry-task__send-answer-btn-wrapper">
          <SendAnswerButton
            eventId={eventId}
            blockId={blockId}
            taskId={id}
            answer={answer.length > 0 ? [answer[0].toLocaleLowerCase()] : []}
            disabled={!answer.at(0) || sendButtonDisabled}
            timeIsUpError={
              sendAnswerMutation.isError && !sendAnswerMutation.isPending
            }
            onSuccess={handleSuccessSendAnswer}
            onError={handleErrorSendAnswer}
            onMutate={() => {
              setIsAnswerSended(true);
              setSendButtonDisabled(true);
            }}
          />
        </div>
      )}
    </TaskView>
  );
};

export default TextEntryTask;
