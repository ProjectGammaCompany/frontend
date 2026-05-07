import { eventQueries } from "@/entities/Event";
import { queryClient } from "@/shared/api";

export const invalidateGameData = (eventId: string) => {
  void queryClient.invalidateQueries({
    queryKey: eventQueries.getGameData(eventId),
  });
};
