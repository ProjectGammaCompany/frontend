import { eventQueries } from "@/entities/Event";
import { queryClient } from "@/shared/api/reactQuery";

export const invalidateGameData = (eventId: string) => {
  void queryClient.invalidateQueries({
    queryKey: eventQueries.getGameData(eventId),
  });
};
