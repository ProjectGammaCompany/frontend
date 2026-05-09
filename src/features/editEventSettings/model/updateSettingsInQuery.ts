import {
  type BaseEventFormData,
  type EditingEventSettings,
  type ServerGroup,
  eventQueries,
} from "@/entities/Event";
import { queryClient } from "@/shared/api/reactQuery";
import type { ChangeTypeOfKeys } from "@/shared/lib/tsTypes";
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
