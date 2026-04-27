import { useQuery } from "@tanstack/react-query";
import {
  getPlayerStats,
  type GroupDTO,
  type UserDTO,
} from "../api/getPlayerStats";
import { eventQueries } from "../api/queries";

export type GroupStats = GroupDTO;
export type UserStats = UserDTO;
const sortByPoints = (a: UserStats, b: UserStats) => b.points - a.points;
export const usePlayerStats = (eventId: string) => {
  return useQuery({
    queryKey: eventQueries.getPlayerStats(eventId),
    queryFn: () => getPlayerStats(eventId),
    select: (data) => {
      const body = data.data;
      return {
        ...body,
        users: body.users ? [...body.users].sort(sortByPoints) : undefined,
        groups: body.groups?.map((group) => ({
          ...group,
          users: [...group.users].sort(sortByPoints),
        })),
      };
    },
  });
};
