import { deleteBlock } from "@/src/entities";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBlock = (
  eventId: string,
  blockId: string,
  onSuccess?: () => void | Promise<void>,
  onError?: () => void,
) => {
  return useMutation({
    mutationFn: () => deleteBlock(eventId, blockId),
    onSuccess,
    onError,
  });
};
