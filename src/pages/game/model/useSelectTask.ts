import { useMutation } from "@tanstack/react-query";
import { selectTask } from "../api/selectTask";

export const useSelectTask = (
  eventId: string,
  blockId: string,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  return useMutation<unknown, Error, string>({
    mutationFn: (taskId) => selectTask(eventId, blockId, taskId),
    onSuccess,
    onError,
  });
};
