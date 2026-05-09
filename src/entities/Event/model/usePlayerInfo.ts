import { useQuery } from "@tanstack/react-query";
import { getPlayerInfo } from "../api/getPlayerInfo";
import { eventQueries } from "../api/queries";

export const usePlayerInfo = (eventId: string) => {
  return useQuery({
    queryKey: eventQueries.getPlayerInfo(eventId),
    queryFn: () => getPlayerInfo(eventId),
    select: (data) => {
      return data.data;
    },
  });
};
