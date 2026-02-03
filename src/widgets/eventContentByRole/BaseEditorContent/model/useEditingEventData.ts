import { getEditingEventData } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";

export const useEditingEventData = (eventId: string) => {
  return useQuery({
    queryKey: [eventId, "data"],
    queryFn: () => getEditingEventData(eventId),
    select: (data) => data.data,
  });
};
