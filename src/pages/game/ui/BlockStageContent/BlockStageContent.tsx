import type { BlockStage } from "@/entities";
import { useNotify } from "@/shared/lib";
import { TaskSlider } from "@/widgets";
import { Button, Typography } from "antd";
import { useState } from "react";
import { invalidateGameData } from "../../model/invalidateGameData";
import { useSelectTask } from "../../model/useSelectTask";
import "./BlockStageContent.scss";
interface BlockStageProps {
  eventId: string;
  blockStageData: BlockStage;
}

const BlockStageContent = ({ eventId, blockStageData }: BlockStageProps) => {
  const { block } = blockStageData;

  const filteredTasks = blockStageData.block.tasks.filter(
    (task) => !task.isCompleted,
  );

  const notify = useNotify();

  const [taskId, setTaskId] = useState<string | null>(null);

  const selectedTasks = taskId ? [taskId] : [];

  const handleSuccessSelect = () => {
    invalidateGameData(eventId);
  };

  const handleErrorSelect = () => {
    notify.error({
      title: "Не удалось сохранить выбор задания",
      description: "Произошла ошибка. Повторите попытку",
    });
  };

  const selectTaskMutation = useSelectTask(
    eventId,
    block.blockId,
    handleSuccessSelect,
    handleErrorSelect,
  );

  const handleTaskSelect = (selectedTaskId: string) => {
    if (taskId === selectedTaskId) {
      setTaskId(null);
      return;
    }
    setTaskId(selectedTaskId);
  };

  const handleBtnClick = () => {
    if (taskId) {
      selectTaskMutation.mutate(taskId);
    }
  };

  return (
    <div className="block-stage-content" data-testid="block-stage">
      <Typography.Title level={2} className="block-stage-content__title">
        {block.name}
      </Typography.Title>
      <Typography.Paragraph className="block-stage-content__description">
        Пройдите все задания данного блока
      </Typography.Paragraph>
      <TaskSlider
        tasks={filteredTasks}
        onTaskChoice={handleTaskSelect}
        selectedTasks={selectedTasks}
      />
      <Button
        loading={selectTaskMutation.isPending}
        disabled={!taskId || selectTaskMutation.isPending}
        className="block-stage-content__select-btn"
        onClick={handleBtnClick}
      >
        {taskId ? "Начать выполнение" : "Выберите задание"}
      </Button>
    </div>
  );
};

export default BlockStageContent;
