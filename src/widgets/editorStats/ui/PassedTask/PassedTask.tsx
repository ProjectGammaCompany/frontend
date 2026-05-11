import type { PassedTask } from "@/entities/Event";
import { GameOption } from "@/entities/Task";
import { Typography } from "antd";
import type { JSX } from "react";
import "./PassedTask.scss";
type TaskType = 1 | 2 | 3 | 4;
interface PassedTaskProps {
  task: PassedTask;
}

const PassedTaskView = ({ task }: PassedTaskProps) => {
  const { options, userAnswers, points, status, type, userPoints } = task;
  const taskTypeMap: Record<TaskType, string> = {
    1: "Выбор одного правильного ответа",
    2: "Множественный выбор ответа",
    3: "Ввод текста",
    4: "Сканирование QR-кода",
  };

  const statusMap: Record<"correct" | "incorrect" | "partial", JSX.Element> = {
    correct: (
      <Typography.Text className="passed-task__status-text passed-task__status-text_correct">
        Правильно
      </Typography.Text>
    ),
    incorrect: (
      <Typography.Text className="passed-task__status-text passed-task__status-text_incorrect">
        Неправильно
      </Typography.Text>
    ),

    partial: (
      <Typography.Text className="passed-task__status-text passed-task__status-text_partial">
        Частично правильно
      </Typography.Text>
    ),
  };

  const getChoiceTaskAnswer = () => {
    return (
      <div>
        <Typography.Paragraph>
          <b>Ответ участника:</b>
        </Typography.Paragraph>
        <ul className="passed-task__option-list">
          {options.map((option) => {
            const isSelected = userAnswers.includes(option.id);
            return (
              <GameOption
                key={option.id}
                value={option.value}
                id={option.id}
                selected={isSelected}
                disabled
                className={
                  option.isCorrect
                    ? "passed-task__option_correct"
                    : isSelected
                      ? "passed-task__option_incorrect"
                      : undefined
                }
              />
            );
          })}
        </ul>
      </div>
    );
  };

  const getInputTaskAnswer = () => {
    return (
      <>
        <Typography.Paragraph>
          <b>Ответ участника: </b>
          {userAnswers[0] ? (
            <Typography.Text className="passed-task__input-task-value">
              {userAnswers[0]}
            </Typography.Text>
          ) : (
            <Typography.Text className="passed-task__empty-answer">
              <strong>Ответ не был дан</strong>
            </Typography.Text>
          )}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <b>Правильный ответ: </b>
          <Typography.Text className="passed-task__input-task-value">
            {options[0]?.value}
          </Typography.Text>
        </Typography.Paragraph>
      </>
    );
  };

  const taskAnswerMap: Record<TaskType, JSX.Element> = {
    1: getChoiceTaskAnswer(),
    2: getChoiceTaskAnswer(),
    3: getInputTaskAnswer(),
    4: getInputTaskAnswer(),
  };
  return (
    <div>
      <Typography.Paragraph>
        <b>Тип: </b>
        {type in taskTypeMap
          ? taskTypeMap[task.type as TaskType]
          : "Неизвестный тип"}
      </Typography.Paragraph>
      <Typography.Paragraph className="passed-task__status-wrapper">
        <b>Статус выполнения:</b> {statusMap[status]}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <b>Получено баллов: </b>
        {userPoints} / <strong>{points}</strong>
      </Typography.Paragraph>
      {task.type in taskTypeMap && taskAnswerMap[task.type as TaskType]}
    </div>
  );
};

export default PassedTaskView;
