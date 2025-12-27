import { deleteBlock } from "@/src/entities";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";

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
    >
      У
    </Button>
  );
};

export default DeleteBlockButton;
