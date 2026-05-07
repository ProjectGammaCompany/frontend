import { TrashSvg } from "@/shared/ui";
import { Button } from "antd";
import { useDeleteBlock } from "../model/useDeleteBlock";
import "./DeleteBlockButton.scss";
interface DeleteBlockButtonProps {
  eventId: string;
  blockId: string;
  onSuccess?: () => void | Promise<void>;
  onError?: () => void;
}

const DeleteBlockButton = ({
  eventId,
  blockId,
  onSuccess,
  onError,
}: DeleteBlockButtonProps) => {
  const deleteMutation = useDeleteBlock(eventId, blockId, onSuccess, onError);
  return (
    <Button
      onClick={() => deleteMutation.mutate()}
      loading={deleteMutation.isPending}
      className="delete-block-btn"
    >
      {!deleteMutation.isPending && <TrashSvg />}
    </Button>
  );
};

export default DeleteBlockButton;
