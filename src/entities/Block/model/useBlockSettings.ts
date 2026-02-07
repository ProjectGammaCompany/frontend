import { getBlockSettings } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useBlockSettings = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: [eventId, blockId, "blockInfo"],
    queryFn: () => getBlockSettings(eventId, blockId),
    select: (data) => data.data,
  });
};
