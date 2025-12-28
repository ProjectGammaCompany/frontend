import { axiosInstance } from "@/src/shared/api";

interface EditingEventSettings {
  title: string;
  description: string;
  cover?: string;
  tags: string[];
  startDate?: string;
  endDate?: string;
  private: boolean;
  password?: string;
}

export const editEventSettings = (
  eventId: string,
  settings: EditingEventSettings,
) => {
  return axiosInstance.put(`event/${eventId}/settings`, settings);
};
