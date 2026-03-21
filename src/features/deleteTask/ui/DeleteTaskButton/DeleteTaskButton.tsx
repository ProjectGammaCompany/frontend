import { TrashSvg } from "@/src/shared/ui";
import { Button } from "antd";
import { useDeleteTask } from "../../model/useDeleteTask";
import "./DeleteTaskButton.scss";
interface DeleteTaskButtonProps {
  eventId: string;
  blockId: string;
  taskId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const DeleteTaskButton = ({
  eventId,
  blockId,
  taskId,
  onSuccess,
  onError,
}: DeleteTaskButtonProps) => {
  const deleteMutation = useDeleteTask(
    eventId,
    blockId,
    taskId,
    onSuccess,
    onError,
  );
  return (
    <Button
      loading={deleteMutation.isPending}
      onClick={() => deleteMutation.mutate()}
      className="delete-task-btn"
    >
      <TrashSvg />
    </Button>
  );
};

export default DeleteTaskButton;
