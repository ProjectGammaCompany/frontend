import { deleteTask } from "@/src/entities";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";

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
    >
      У
    </Button>
  );
};

export default DeleteTaskButton;
