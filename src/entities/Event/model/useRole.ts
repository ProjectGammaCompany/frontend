import { useQuery } from "@tanstack/react-query";
import { getRole } from "../api/getRole";

export const useRole = (eventId: string | undefined) => {
  return useQuery({
    queryKey: ["userRole"],
    queryFn: () => {
      if (eventId) {
        return getRole(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    select: (data) => data.data.role,
  });
};
