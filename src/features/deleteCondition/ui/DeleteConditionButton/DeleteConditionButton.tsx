import { deleteCondition } from "@/src/entities/Condition";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";

interface DeleteConditionButtonProps {
  eventId: string;
  blockId: string;
  conditionId: string;
  onSuccess?: () => void;
}

const DeleteConditionButton = ({
  eventId,
  blockId,
  conditionId,
  onSuccess,
}: DeleteConditionButtonProps) => {
  const deleteMutation = useMutation({
    mutationFn: () => deleteCondition(eventId, blockId, conditionId),
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

export default DeleteConditionButton;
