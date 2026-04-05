import { axiosInstance } from "@/shared/api";

export const deleteNotification = (id: string) => {
  return axiosInstance.delete(`notifications/${id}`);
};
