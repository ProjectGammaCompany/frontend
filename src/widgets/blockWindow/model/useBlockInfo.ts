import { getEditingBlockData } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useBlockInfo = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: [eventId, blockId, "blockInfo"],
    queryFn: () => getEditingBlockData(eventId, blockId),
    select: (data) => data.data,
  });
};
