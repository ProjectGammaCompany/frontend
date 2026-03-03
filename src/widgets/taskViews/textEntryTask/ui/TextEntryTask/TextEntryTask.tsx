import { TaskView } from "@/src/entities";
import {
  SendAnswerButton,
  useSendAnswer,
  type SendAnswerResponse,
} from "@/src/features";
import { queryClient } from "@/src/shared/api";
import { useNotify } from "@/src/shared/lib";
import { Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import QRInputBlock from "../QRBlock/QRBlock";
import TextInputBlock from "../TextInputBlock/TextInputBlock";

interface TextEntryTaskProps {
  data: TextEntryTaskData;
}

//todo: change for final version
//todo: не забыть приведение в lowercase перед отправкой ответа
interface TextEntryTaskData {
  taskId: string;
  name: string;
  description?: string;
  files: string[];
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

  const [rightAnswer, setRightAnswer] = useState<string[] | undefined>(
    undefined,
  );

  const [disabled, setDisabled] = useState(false);

  const [isExpirationFnCanceled, SetIsExpirationFnCanceled] = useState(false);

  const handleSuccessAnswerSending = (
    data: AxiosResponse<SendAnswerResponse>,
  ) => {
    setDisabled(true);

    SetIsExpirationFnCanceled(true);

    const { points, rightAnswer } = data.data;

    setRightAnswer(rightAnswer);

    if (points) {
      notify.success({
        title: "Задача успешно пройдена!",
        description: `Вами получено ${points}`,
      });
    }
    setTimeout(() => {
      const el = document.getElementById("root");
      el?.scrollTo({ top: 0, behavior: "smooth" });
      void queryClient.invalidateQueries({
        queryKey: [eventId, "game"],
      });
    }, 5000);
  };

  const sendAnswerMutation = useSendAnswer(
    eventId,
    blockId,
    id,
    handleSuccessAnswerSending,
  );

  const handleSuccessScanning = (decodedText: string) => {
    setAnswer([decodedText]);
    sendAnswerMutation.mutate([decodedText]);
  };

  return (
    <TaskView
      taskData={taskData}
      onExpirationTimeFn={() => {
        sendAnswerMutation.mutate([]);
      }}
      isExpirationFnCanceled={isExpirationFnCanceled}
    >
      {data.type === "qr" ? (
        <QRInputBlock
          answer={answer}
          setAnswer={setAnswer}
          disabled={disabled}
          inputMode={inputMode}
          setInputMode={setInputMode}
          onSuccessScanning={handleSuccessScanning}
        />
      ) : (
        <TextInputBlock
          answer={answer}
          setAnswer={setAnswer}
          disabled={disabled}
        />
      )}
      {rightAnswer && data.type != "qr" && (
        <Typography.Paragraph>
          Правильный ответ: {rightAnswer}
        </Typography.Paragraph>
      )}
      {((data.type === "qr" && inputMode === "text") ||
        data.type === "text") && (
        <SendAnswerButton
          eventId={eventId}
          blockId={blockId}
          taskId={id}
          answer={answer}
          disabled={!answer.at(0)}
          onSuccess={handleSuccessAnswerSending}
        />
      )}
    </TaskView>
  );
};

export default TextEntryTask;
