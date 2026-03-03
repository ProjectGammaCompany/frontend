import { axiosInstance } from "@/src/shared/api";
export interface CreateEventResponse {
  eventId: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  cover?: string;
  tags: string[];
  startDate?: string;
  endDate?: string;
  private: boolean;
  password?: string;
  allowDownloading?: boolean;
}
export const createEvent = (data: CreateEventData) => {
  return axiosInstance.post<CreateEventResponse>("event", data);
};
