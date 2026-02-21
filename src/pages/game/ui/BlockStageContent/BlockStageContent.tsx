import type { BlockStage } from "@/src/entities";
import { TaskSlider } from "@/src/widgets/taskSlider";
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

  const [taskId, setTaskId] = useState<string | null>(null);

  const selectedTasks = taskId ? [taskId] : [];

  const handleSuccessSelect = () => {
    invalidateGameData(eventId);
  };

  const selectTaskMutation = useSelectTask(
    eventId,
    block.id,
    handleSuccessSelect,
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
    <div className="block-stage-content">
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
