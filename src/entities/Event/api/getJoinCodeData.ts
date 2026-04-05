import { axiosInstance } from "@/shared/api";

export interface GetJoinCodeDataResponse {
  joinCode: string;
  expiresAt: string; // "DD.MM.YYYY HH:mm:ss:SSS"
}
export const getJoinCodeData = (eventId: string) => {
  return axiosInstance.get<GetJoinCodeDataResponse>(
    `event/${eventId}/joinCode`,
  );
};
