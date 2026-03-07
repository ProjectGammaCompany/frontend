import { axiosInstance } from "@/src/shared/api";
import type { PickPartial } from "@/src/shared/lib";
import type { ServerGroup } from "./getEditingEventSettings";

interface EditingEventSettings {
  name: string;
  description: string;
  cover?: string;
  tags: string[];
  startDate?: string;
  rating: boolean;
  endDate?: string;
  private: boolean;
  password?: string;
  groups: ClientGroup[];
}

export type ClientGroup = PickPartial<ServerGroup, "id"> & { clientId: string };

export interface EditEventSettingsResponse {
  groups: ServerGroup[];
}

export const editEventSettings = (
  eventId: string,
  settings: EditingEventSettings,
) => {
  return axiosInstance.put<EditEventSettingsResponse>(
    `event/${eventId}`,
    settings,
  );
};
