import { useQuery } from "@tanstack/react-query";
import { getPlayerStats } from "../api/getPlayerStats";

export const useStats = (eventId: string) => {
  return useQuery({
    queryKey: [eventId, "stats"],
    queryFn: () => getPlayerStats(eventId),
    select: (data) => data.data,
  });
};
