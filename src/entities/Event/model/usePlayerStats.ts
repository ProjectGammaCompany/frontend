import { useQuery } from "@tanstack/react-query";
import {
  getPlayerStats,
  type GroupDTO,
  type UserDTO,
} from "../api/getPlayerStats";
import { eventQueries } from "../api/queries";

export type GroupStats = GroupDTO;
export type UserStats = UserDTO;
export const usePlayerStats = (eventId: string) => {
  return useQuery({
    queryKey: eventQueries.getPlayerStats(eventId),
    queryFn: () => getPlayerStats(eventId),
    select: (data) => data.data,
  });
};
