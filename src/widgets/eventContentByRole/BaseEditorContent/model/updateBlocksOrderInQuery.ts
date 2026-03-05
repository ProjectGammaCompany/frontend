import {
  eventQueries,
  type BlockItemData,
  type getEditingEventDataResponse,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const updateBlocksOrderInQuery = (
  eventId: string,
  blocks: BlockItemData[],
) => {
  return queryClient.setQueryData(
    eventQueries.getEditingEventData(eventId),
    (oldData: AxiosResponse<getEditingEventDataResponse>) => {
      if (!oldData) {
        return oldData;
      }
      const newData = {
        ...oldData,
        data: {
          ...oldData.data,
          blocks,
        },
      };
      return newData;
    },
  );
};
