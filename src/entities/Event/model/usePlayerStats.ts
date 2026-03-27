import { useQuery } from "@tanstack/react-query";
import {
  getPlayerStats,
  type GroupDTO,
  type UserDTO,
} from "../api/getPlayerStats";

export type GroupStats = GroupDTO;
export type UserStats = UserDTO;
export const usePlayerStats = (eventId: string) => {
  return useQuery({
    queryKey: [eventId, "stats"],
    queryFn: () => getPlayerStats(eventId),
    select: (data) => data.data,
  });
};
