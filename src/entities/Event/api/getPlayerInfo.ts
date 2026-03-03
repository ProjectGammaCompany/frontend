import { axiosInstance } from "@/src/shared/api";

export interface GetPlayerInfoResponse {
  title: string;
  description: string;
  rate: number;
  favorite: boolean;
  tags: Tag[];
  startDate?: string;
  endDate?: string;
  needGroup: boolean;
  cover?: string;
  status: "not started" | "in progress" | "finished";
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
