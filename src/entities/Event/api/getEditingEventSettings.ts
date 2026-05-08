import { axiosInstance } from "@/shared/api/axios";

export interface EditingEventSettings {
  description: string;
  tags: string[];
  cover?: string;
  startDate?: string;
  endDate?: string;
  private: boolean;
  password?: string;
  lastEditionDate: string;
  groupEvent: boolean;
  groups: ServerGroup[];
  rating: boolean;
  joinCode?: string;
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
