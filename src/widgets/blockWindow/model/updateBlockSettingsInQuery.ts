import { blockQueries, type UpdateBlockData } from "@/entities/Block";
import { queryClient } from "@/shared/api";
import type { AxiosResponse } from "axios";

export const updateBlockSettingsInQuery = (
  eventId: string,
  blockId: string,
  updatedData?: UpdateBlockData,
) => {
  if (updatedData) {
    queryClient.setQueryData(
      blockQueries.getSettings(eventId, blockId),
      (oldData: AxiosResponse<UpdateBlockData>) => {
        if (!oldData) {
          return oldData;
        }
        const newData: AxiosResponse<UpdateBlockData> = {
          ...oldData,
          data: {
            ...oldData.data,
            ...updatedData,
          },
        };
        return newData;
      },
    );
  }
};
