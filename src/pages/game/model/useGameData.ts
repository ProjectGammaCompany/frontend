import { eventQueries, getNextStage } from "@/entities/Event";
import { useQuery } from "@tanstack/react-query";

export const useGameData = (eventId?: string) => {
  return useQuery({
    queryKey: eventQueries.getGameData(eventId ?? ""),
    queryFn: () => {
      if (eventId) {
        return getNextStage(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    select: (data) => data.data,
  });
};
