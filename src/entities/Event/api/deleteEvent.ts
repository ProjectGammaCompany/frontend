import { axiosInstance } from "@/src/shared/api";

export const deleteEvent = (eventId: string) => {
  return axiosInstance.delete(`event/${eventId}`);
};
