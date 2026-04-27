import { TaskView, type TaskStageFile } from "@/entities";
import type { SendAnswerResponse } from "@/features";
import { SendAnswerButton, useSendAnswer } from "@/features";
import { queryClient } from "@/shared/api";
import { useNotify } from "@/shared/lib";
import { Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import Option from "../Option/Option";
import "./ChoiceTask.scss";
interface ChoiceTaskProps {
  data: ChoiceTaskData;
}

//todo: change
interface ChoiceTaskData {
  taskId: string;
  eventId: string;
  blockId: string;
  name: string;
  description?: string;
  type: 1 | 2;
  options?: TaskOption[];
  files: TaskStageFile[];
  time?: number;
  timestamp?: string;
}

interface TaskOption {
  id: string;
  value: string;
}

//todo: Просмотреть ещё раз логику реагирования на истечение времени, рефакторинг переменных, проверка useEffect
const ChoiceTask = ({ data }: ChoiceTaskProps) => {
  const notify = useNotify();

  const { options, eventId, blockId, taskId: id, type } = data;

  const taskData = {
    title: data.name,
    defaultTime: data.time,
    description: data.description,
    files: data.files,
    timestamp: data.timestamp,
  };
  const hintTextMap: Record<1 | 2, string> = {
    1: "Выберите 1 правильный ответ",
    2: "Выберите правильные ответы",
  };

  const [isExpirationFnCanceled, SetIsExpirationFnCanceled] = useState(false);

  const [answer, setAnswer] = useState<string[]>([]);

  const [rightAnswer, setRightAnswer] = useState<string[] | undefined>(
    undefined,
  );

  const [choiceAnswerDisabled, setChoiceAnswerDisabled] = useState(false);

  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const handleOptionClick = (id: string, value: boolean) => {
    if (!value) {
      setAnswer((prev) => prev.filter((el) => el != id));
      return;
    }
    if (type == 1) {
      setAnswer([id]);
      return;
    }
    setAnswer((prev) => [...prev, id]);
  };

  const handleSuccessSendAnswer = (data: AxiosResponse<SendAnswerResponse>) => {
    const { points, rightAnswerId, status } = data.data;
    SetIsExpirationFnCanceled(true);
    setRightAnswer(rightAnswerId);
    if (status === "correct") {
      notify.success({
        title: "Задача успешно пройдена!",
        description: points ? `Вами получено баллов: ${points}` : undefined,
      });
    } else if (status === "incorrect") {
      notify.error({
        title: "Задача пройдена неправильно!",
      });
    } else {
      notify.warning({
        title: "Задача пройдена частично правильно.",
        description: points ? `Вами получено баллов: ${points}` : undefined,
      });
    }
    setTimeout(() => {
      const el = document.getElementById("root");
      el?.scrollTo({ top: 0, behavior: "smooth" });
      void queryClient.invalidateQueries({
        queryKey: [eventId, "game"],
      });
    }, 3000);
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

  const getOptionClassName = (
    id: string,
    answer: string[],
    rightAnswer?: string[],
  ) => {
    if (!rightAnswer) return "";

    if (!answer.includes(id)) return "";

    return rightAnswer.includes(id)
      ? "choice-task__option_correct"
      : "choice-task__option_incorrect";
  };

  return (
    <TaskView
      taskData={taskData}
      onExpirationTimeFn={() => {
        setChoiceAnswerDisabled(true);
        sendAnswerMutation.mutate(answer);
      }}
      isExpirationFnCanceled={isExpirationFnCanceled}
    >
      <Typography.Title level={2}>{hintTextMap[data.type]}</Typography.Title>
      <ul className="choice-task__option-list">
        {options?.map((option) => (
          <Option
            key={option.id}
            id={option.id}
            value={option.value}
            selected={answer.includes(option.id)}
            disabled={choiceAnswerDisabled}
            clickFn={handleOptionClick}
            className={getOptionClassName(option.id, answer, rightAnswer)}
          />
        ))}
      </ul>
      <div className="choice-task__btn-wrapper">
        <SendAnswerButton
          eventId={eventId}
          blockId={blockId}
          taskId={id}
          disabled={sendButtonDisabled}
          timeIsUpError={sendAnswerMutation.isError}
          answer={answer}
          onSuccess={handleSuccessSendAnswer}
          onError={handleErrorSendAnswer}
          onMutate={() => {
            setSendButtonDisabled(true);
            setChoiceAnswerDisabled(true);
          }}
        />
      </div>
    </TaskView>
  );
};

export default ChoiceTask;
