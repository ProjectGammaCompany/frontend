import { deleteTask } from "@/src/entities";
import { TrashSvg } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import "./DeleteTaskButton.scss";
interface DeleteTaskButtonProps {
  eventId: string;
  blockId: string;
  taskId: string;
  onSuccess?: () => void;
}

const DeleteTaskButton = ({
  eventId,
  blockId,
  taskId,
  onSuccess,
}: DeleteTaskButtonProps) => {
  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(eventId, blockId, taskId),
    onSuccess: onSuccess,
  });
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
