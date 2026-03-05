import { TaskView } from "@/src/entities";
import type { SendAnswerResponse } from "@/src/features";
import { SendAnswerButton } from "@/src/features";
import { useSendAnswer } from "@/src/features/sendTaskAnswer";
import { queryClient } from "@/src/shared/api";
import { useNotify } from "@/src/shared/lib";
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
  files: string[];
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

  const [isExpirationFnCanceled, SetIsExpirationFnCanceled] = useState(false);

  const hintTextMap: Record<1 | 2, string> = {
    1: "Выберите 1 правильный ответ",
    2: "Выберите правильные ответы",
  };

  const [answer, setAnswer] = useState<string[]>([]);

  const [rightAnswer, setRightAnswer] = useState<string[] | undefined>(
    undefined,
  );

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

  const handleSuccessAnswerSending = (
    data: AxiosResponse<SendAnswerResponse>,
  ) => {
    console.log(data.data);
    const { points, rightAnswer } = data.data;
    SetIsExpirationFnCanceled(true);
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
          answer={answer}
          onSuccess={handleSuccessAnswerSending}
        />
      </div>
    </TaskView>
  );
};

export default ChoiceTask;
