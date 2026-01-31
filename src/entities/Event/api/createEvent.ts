import { axiosInstance } from "@/src/shared/api";
export interface createEventResponse {
  eventId: string;
}

interface CreateEventData {
  title: string;
  description: string;
  cover?: string;
  tags: string[];
  startDate?: string;
  endDate?: string;
  private: boolean;
  password?: string;
}
export const createEvent = (data: CreateEventData) => {
  return axiosInstance.post<createEventResponse>("event", data);
};
