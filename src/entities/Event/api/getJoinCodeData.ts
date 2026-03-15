import { axiosInstance } from "@/src/shared/api";

export interface GetJoinCodeDataResponse {
  joinCode: string;
  expiresAt: string; // "DD.MM.YYYY HH:mm:ss:SSS"
}
export const getJoinCodeData = (eventId: string) => {
  return axiosInstance.get<GetJoinCodeDataResponse>(
    `events/${eventId}/joinCode`,
  );
};
