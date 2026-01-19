import { deleteBlock } from "@/src/entities";
import { TrashSvg } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import "./DeleteBlockButton.scss";
interface DeleteBlockButtonProps {
  eventId: string;
  blockId: string;
  onSuccess?: () => void | Promise<void>;
}

const DeleteBlockButton = ({
  eventId,
  blockId,
  onSuccess,
}: DeleteBlockButtonProps) => {
  const deleteMutation = useMutation({
    mutationFn: () => deleteBlock(eventId, blockId),
    onSuccess: onSuccess,
  });
  return (
    <Button
      onClick={() => deleteMutation.mutate()}
      loading={deleteMutation.isPending}
      className="delete-block-btn"
    >
      <TrashSvg />
    </Button>
  );
};

export default DeleteBlockButton;
