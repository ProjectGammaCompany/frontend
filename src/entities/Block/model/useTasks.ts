import { getTasks } from "@/entities/Block";
import { useQuery } from "@tanstack/react-query";
import { blockQueries } from "../api/queries";

export const useTasks = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: blockQueries.getTasks(eventId, blockId),
    queryFn: () => getTasks(eventId, blockId),
    select: (data) => data.data.tasks,
  });
};
