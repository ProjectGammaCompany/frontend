import { useMutation } from "@tanstack/react-query";
import { updateTasksOrder } from "../api/updateTasksOrder";

export const useUpdateTasksOrder = (
  eventId: string,
  blockId: string,
  onSuccess: () => void,
) => {
  return useMutation<unknown, Error, string[]>({
    mutationFn: (tasks) => updateTasksOrder(eventId, blockId, tasks),
    onSuccess,
  });
};
