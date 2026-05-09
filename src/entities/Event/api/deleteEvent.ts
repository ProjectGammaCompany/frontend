import { axiosInstance } from "@/shared/api/axios";

export const deleteEvent = (eventId: string) => {
  return axiosInstance.delete(`event/${eventId}`);
};
