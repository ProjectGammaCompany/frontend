import { axiosInstance } from "@/shared/api/axios";

export interface GetPlayerStatsResponse {
  userId: string;
  fullStats: boolean;
  groupEvent: boolean;
  users?: UserDTO[];
  groups?: GroupDTO[];
}

export interface GroupDTO {
  id: string;
  name: string;
  users: UserDTO[];
}

export interface UserDTO {
  id: string;
  username: string;
  avatar?: string;
  points: number;
  current: boolean;
}

export const getPlayerStats = (eventId: string) => {
  return axiosInstance.get<GetPlayerStatsResponse>(
    `event/${eventId}/playerStats`,
  );
};
