import { getEditorTaskData } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useTaskData = (
  mode: string,
  eventId: string,
  blockId: string,
  id?: string,
) => {
  return useQuery({
    queryKey: [eventId, blockId, id, "taskData"],
    queryFn: () => {
      return getEditorTaskData(eventId, blockId, id!);
    },
    select: (data) => data.data,
    enabled: mode === "edit" && !!id,
  });
};
