import { axiosInstance } from "@/src/shared/api";

export interface GetPlayerStatsResponse {
  fullStats: boolean;
  groupEvent: boolean;
  users?: User[];
  groups?: Group[];
}

interface Group {
  id: string;
  name: string;
  users: User[];
}

interface User {
  id: string;
  username: string;
  avatar?: string;
  points: number;
}

export const getPlayerStats = (eventId: string) => {
  return axiosInstance.get<GetPlayerStatsResponse>(
    `event/${eventId}/playerStats`,
  );
};
