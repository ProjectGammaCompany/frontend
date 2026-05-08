import { axiosInstance } from "@/shared/api/axios";

export interface getRoleResponse {
  role: number;
}
export const getRole = (eventId: string) => {
  return axiosInstance.get<getRoleResponse>(`event/${eventId}/role`);
};
