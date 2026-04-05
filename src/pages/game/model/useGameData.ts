import { getNextStage } from "@/entities";
import { useQuery } from "@tanstack/react-query";

export const useGameData = (eventId?: string) => {
  return useQuery({
    queryKey: [eventId, "game"],
    queryFn: () => {
      if (eventId) {
        return getNextStage(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    select: (data) => data.data,
  });
};
