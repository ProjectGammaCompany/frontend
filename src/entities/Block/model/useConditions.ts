import { blockQueries, getConditions } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useConditions = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: blockQueries.getConditions(eventId, blockId),
    queryFn: () => getConditions(eventId, blockId),
    select: (data) => data.data.conditions,
  });
};
