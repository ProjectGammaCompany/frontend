import { useMutation } from "@tanstack/react-query";
import { updateBlocksOrder } from "../api/updateBlocksOrder";

export const useUpdateBlocksOrder = (
  eventId: string,
  onSuccess: () => void,
) => {
  return useMutation<unknown, Error, string[]>({
    mutationFn: (blocks) => updateBlocksOrder(eventId, blocks),
    onSuccess,
  });
};
