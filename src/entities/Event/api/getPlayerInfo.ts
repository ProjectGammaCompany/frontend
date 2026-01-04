import { axiosInstance } from "@/src/shared/api";

export interface GetPlayerInfoResponse {
  title: string;
  description: string;
  rate: number;
  favorite: boolean;
  tags: string[];
  startDate?: string;
  endDate?: string;
  cover?: string;
  status: "notStarted" | "started" | "ended";
}
export const getPlayerInfo = (eventId: string) => {
  return axiosInstance.get<GetPlayerInfoResponse>(
    `event/${eventId}/playerInfo`,
  );
};
