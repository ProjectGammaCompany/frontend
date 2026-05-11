import { useQuery } from "@tanstack/react-query";
import { getEditorUserStats } from "../api/getEditorUserStats";
import { eventQueries } from "../api/queries";

export const useEditorUserStats = (eventId: string, userId: string) => {
  return useQuery({
    queryKey: eventQueries.getEditorUserStats(eventId, userId),
    queryFn: () => {
      return getEditorUserStats(eventId, userId);
    },
    select: (data) => data.data,
  });
};
