import { deleteCondition } from "@/src/entities";
import { TrashSvg } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import "./DeleteConditionButton.scss";
interface DeleteConditionButtonProps {
  eventId: string;
  blockId: string;
  conditionId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

//todo: перенести в ui кнопку удаления
const DeleteConditionButton = ({
  eventId,
  blockId,
  conditionId,
  onSuccess,
  onError,
}: DeleteConditionButtonProps) => {
  const deleteMutation = useMutation({
    mutationFn: () => deleteCondition(eventId, blockId, conditionId),
    onSuccess,
    onError,
  });
  return (
    <Button
      loading={deleteMutation.isPending}
      onClick={() => deleteMutation.mutate()}
      className="delete-condition-btn"
    >
      <TrashSvg />
    </Button>
  );
};

export default DeleteConditionButton;
