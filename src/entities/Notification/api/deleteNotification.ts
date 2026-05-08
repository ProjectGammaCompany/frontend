import { axiosInstance } from "@/shared/api/axios";

export const deleteNotification = (id: string) => {
  return axiosInstance.delete(`notifications/${id}`);
};
