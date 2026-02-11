import {
  eventQueries,
  type EditingEventSettings,
  type ServerGroup,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const updateGroupsInQuery = (eventId: string, groups: ServerGroup[]) => {
  queryClient.setQueryData(
    eventQueries.getSettings(eventId),
    (oldData: AxiosResponse<EditingEventSettings>) => {
      if (oldData) {
        const newData: AxiosResponse<EditingEventSettings> = {
          ...oldData,
          data: {
            ...oldData.data,
            groups,
          },
        };
        return newData;
      }
      return oldData;
    },
  );
};
