import { axiosInstance } from "@/src/shared/api";

export interface GetPlayerStatsResponse {
  points: number;
}
export const getPlayerStats = (eventId: string) => {
  return axiosInstance.get<GetPlayerStatsResponse>(
    `event/${eventId}/playerStats`,
  );
};
