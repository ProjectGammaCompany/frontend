import { axiosInstance } from "@/src/shared/api";

export const rateEvent = (eventId: string, rate: number) => {
  return axiosInstance.post(`event/${eventId}/rate`, {
    rate,
  });
};
