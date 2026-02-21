import { axiosInstance } from "@/src/shared/api";

export interface GetPlayerInfoResponse {
  title: string;
  description: string;
  rate: number;
  favorite: boolean;
  tags: Tag[];
  startDate?: string;
  endDate?: string;
  cover?: string;
  status: "notStarted" | "started" | "ended";
}

interface Tag {
  id: string;
  name: string;
}
export const getPlayerInfo = (eventId: string) => {
  return axiosInstance.get<GetPlayerInfoResponse>(
    `event/${eventId}/playerInfo`,
  );
};
