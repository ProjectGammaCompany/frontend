import { eventQueries, getEditingEventData } from "@/entities";
import { useQuery } from "@tanstack/react-query";

export const useEditingEventData = (eventId: string) => {
  return useQuery({
    queryKey: eventQueries.getEditingEventData(eventId),
    queryFn: () => getEditingEventData(eventId),
    select: (data) => data.data,
  });
};
