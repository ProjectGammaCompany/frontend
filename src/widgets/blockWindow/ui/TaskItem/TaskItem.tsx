import type { TaskItemData } from "@/entities/Block";
import { DraggableCard } from "@/shared/lib/dnd";
import { Typography } from "antd";
import "./TaskItem.scss";
interface TaskItemProps {
  data: TaskItemData;
  index: number;
  onClick?: () => void;
}

const TaskItem = ({ data, index, onClick }: TaskItemProps) => {
  return (
    <li onClick={onClick}>
      <DraggableCard index={index} draggableId={data.id} className="task-item">
        <Typography.Text className="task-item__order-text">
          {data.name}
        </Typography.Text>
      </DraggableCard>
    </li>
  );
};

export default TaskItem;
