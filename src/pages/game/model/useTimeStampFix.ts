import { useMutation } from "@tanstack/react-query";
import { commitTimestamp } from "../api";

export const useTimestampMutation = (
  eventId: string,
  id: string,
  blockId: string,
  onSuccess: (timestamp: string) => void,
  onError: () => void,
) => {
  return useMutation<unknown, Error, string>({
    mutationFn: (timestamp) => commitTimestamp(eventId, blockId, id, timestamp),
    onSuccess: (_, timestamp) => {
      onSuccess(timestamp);
    },
    onError: onError,
  });
};
