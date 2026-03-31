import { useQuery } from "@tanstack/react-query";
import { getRole } from "../api/getRole";
import { eventQueries } from "../api/queries";

export const useRole = (eventId: string | undefined) => {
  return useQuery({
    queryKey: eventId ? eventQueries.getUserRole(eventId) : ["userRole"],
    queryFn: () => {
      if (eventId) {
        return getRole(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    select: (data) => data.data.role,
  });
};
