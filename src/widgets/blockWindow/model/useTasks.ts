import { getTasks } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useTasks = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: [eventId, blockId, "tasksList"],
    queryFn: () => getTasks(eventId, blockId),
    select: (data) => data.data.tasks,
  });
};
