import {
  eventQueries,
  type BaseEventFormData,
  type EditingEventSettings,
  type ServerGroup,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { ChangeTypeOfKeys } from "@/src/shared/lib";
import type { AxiosResponse } from "axios";

type FormData = BaseEventFormData & {
  groupEvent: boolean;
  groups: ServerGroup[];
  collaborators: string[];
};

type SettingsData = ChangeTypeOfKeys<FormData, "startDate" | "endDate", string>;
export const updateSettingsInQuery = (
  eventId: string,
  settings: SettingsData,
) => {
  queryClient.setQueryData(
    eventQueries.getSettings(eventId),
    (oldData: AxiosResponse<EditingEventSettings>) => {
      if (oldData) {
        const newData: AxiosResponse<EditingEventSettings> = {
          ...oldData,
          data: {
            ...oldData.data,
            ...settings,
          },
        };
        return newData;
      }
      return oldData;
    },
  );
};
