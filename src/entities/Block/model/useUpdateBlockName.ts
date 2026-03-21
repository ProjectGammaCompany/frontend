import { useMutation } from "@tanstack/react-query";
import { updateBlockName } from "../api/updateBlockName";

export const useUpdateBlockName = (
  eventId: string,
  blockId: string,
  onError?: () => void,
) => {
  return useMutation<unknown, Error, string>({
    mutationFn: (data) => updateBlockName(eventId, blockId, data),
    onError,
    retry: 0,
  });
};
