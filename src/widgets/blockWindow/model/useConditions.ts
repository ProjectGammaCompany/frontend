import { getConditions } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useConditions = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: [eventId, blockId, "conditionsList"],
    queryFn: () => getConditions(eventId, blockId),
    select: (data) => data.data.conditions,
  });
};
