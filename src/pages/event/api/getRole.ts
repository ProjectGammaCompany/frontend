import { axiosInstance } from "@/src/shared/api";

export interface getRoleResponse {
  role: number;
}
export const getRole = (eventId: string) => {
  return axiosInstance.get<getRoleResponse>(`event/${eventId}/role`);
};
