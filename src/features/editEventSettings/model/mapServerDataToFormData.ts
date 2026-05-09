import type {
  BaseEventFormData,
  ClientGroup,
  EditingEventSettings,
} from "@/entities/Event";
import dayjs from "dayjs";
import { mapServerGroupToClientGroup } from "./mapServerGroupToClientGroup";

type FullSettingsData = EditingEventSettings & {
  name: string;
};
export type FullFormData = BaseEventFormData & {
  groupEvent: boolean;
  groups: ClientGroup[];
  rating: boolean;
  collaborators: string[];
};

export const mapServerDataToFormData = (data?: FullSettingsData) => {
  if (!data) {
    return undefined;
  }

  const transformedData: FullFormData & { joinCode?: string } = {
    ...data,
    startDate: data.startDate
      ? dayjs(data.startDate, "DD.MM.YYYY HH:mm")
      : undefined,
    endDate: data.endDate ? dayjs(data.endDate, "DD.MM.YYYY HH:mm") : undefined,
    groups: mapServerGroupToClientGroup(data.groups),
  };
  return transformedData;
};
