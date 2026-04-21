import type { TaskItem } from "@/entities";
import { useWindowWidth } from "@/shared/lib";
import { Checkbox, ConfigProvider, Typography } from "antd";
import "./TaskSliderItem.scss";
interface TaskSliderItemProps {
  task: TaskItem;
  onClick: (taskId: string) => void;
  isSelected: boolean;
}

const TaskSliderItem = ({ task, onClick, isSelected }: TaskSliderItemProps) => {
  const windowWidth = useWindowWidth();

  const getTimeString = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time - Math.floor(time / 60) * 60).padStart(2, "0");
    return `${minutes} мин. ${seconds} сек.`;
  };

  const getTaskTypeString = (type: number) => {
    switch (type) {
      case 0:
        return "Информационный блок";
      case 1:
        return "Один правильный ответ";
      case 2:
        return "Множественный выбор";
      case 3:
        return "Ввод текстового ответа";
      case 4:
        return "Сканирование Qr-кода";
      default:
        return "Неизвестный тип";
    }
  };

  const handleClick = () => {
    onClick(task.id);
  };

  return (
    <div className="task-slider-item__wrapper">
      <div onClick={handleClick} className="task-slider-item">
        <div>
          <Typography.Title level={3} className="task-slider-item__header">
            {task.name}
          </Typography.Title>
          <ConfigProvider
            theme={{
              token: {
                controlInteractiveSize: windowWidth >= 700 ? 45 : 20,
              },
            }}
          >
            <Checkbox
              checked={isSelected}
              classNames={{
                root: "task-slider-item__checkbox",
                icon: "task-slider-item__checkbox-icon",
              }}
            />
          </ConfigProvider>
        </div>
        {task.time ? (
          <Typography.Paragraph className="task-slider-item__title">
            Время на выполнение: {getTimeString(task.time)}
          </Typography.Paragraph>
        ) : undefined}
        {/* {task.description && (
        <div className="task-slider-item__description-wrapper">
          <Typography.Text className="task-slider-item__title">
            Описание
          </Typography.Text>
          <Typography.Paragraph className="task-slider-item__description">
            {task.description}
          </Typography.Paragraph>
        </div>
      )} */}
        <Typography.Paragraph className="task-slider-item__title task-slider-item__type">
          Тип: {getTaskTypeString(task.type)}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default TaskSliderItem;
