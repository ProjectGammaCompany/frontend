import {
  blockQueries,
  type ConditionData,
  type GetConditionsResponse,
} from "@/entities";
import { queryClient } from "@/shared/api";
import type { AxiosResponse } from "axios";

export const addConditionToList = (
  eventId: string,
  blockId: string,
  variables: ConditionData,
  id: string,
  blockOrder: number,
) => {
  queryClient.setQueryData(
    blockQueries.getConditions(eventId, blockId),
    (oldData: AxiosResponse<GetConditionsResponse>) => {
      if (oldData) {
        const newData: AxiosResponse<GetConditionsResponse> = {
          ...oldData,
          data: {
            conditions: [
              ...oldData.data.conditions,
              {
                ...variables,
                id,
                blockOrder: blockOrder,
              },
            ],
          },
        };
        return newData;
      }
      return oldData;
    },
  );
};
