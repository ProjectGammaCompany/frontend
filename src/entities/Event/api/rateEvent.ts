import { axiosInstance } from "@/shared/api/axios";

export const rateEvent = (eventId: string, rate: number) => {
  return axiosInstance.post(`event/${eventId}/rate`, {
    rate,
  });
};
