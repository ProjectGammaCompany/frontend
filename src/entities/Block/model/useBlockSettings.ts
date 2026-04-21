import { blockQueries, getBlockSettings } from "@/entities";
import { useQuery } from "@tanstack/react-query";

export const useBlockSettings = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: blockQueries.getSettings(eventId, blockId),
    queryFn: () => getBlockSettings(eventId, blockId),
    select: (data) => data.data,
    retry: false,
  });
};
