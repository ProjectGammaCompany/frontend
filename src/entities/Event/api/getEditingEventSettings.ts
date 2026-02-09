import { axiosInstance } from "@/src/shared/api";

export interface EditingEventSettings {
  description: string;
  tags: string[];
  cover?: string;
  startDate?: string;
  endDate?: string;
  private: boolean;
  password?: string;
  lastEditionDate: string;
  groups: ServerGroup[];
  rating: boolean;
  collaborators: string[];
  allowDownloading: boolean;
}

export interface ServerGroup {
  id: string;
  login: string;
  password: string;
}

export const getEditingEventSettings = (eventId: string) => {
  return axiosInstance.get<EditingEventSettings>(`event/${eventId}/settings`);
};
