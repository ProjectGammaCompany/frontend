import { axiosInstance } from "@/src/shared/api";

export const deleteNotification = (id: string) => {
  return axiosInstance.delete(`notifications/${id}`);
};
