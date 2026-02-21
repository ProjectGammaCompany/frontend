import { queryClient } from "@/src/shared/api";

export const invalidateGameData = (eventId: string) => {
  void queryClient.invalidateQueries({
    queryKey: [eventId, "game"],
  });
};
