import { deleteTask } from "@/src/entities";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTask = (
  eventId: string,
  blockId: string,
  taskId: string,
  onSuccess?: () => void,
) => {
  return useMutation({
    mutationFn: () => deleteTask(eventId, blockId, taskId),
    onSuccess: onSuccess,
  });
};
