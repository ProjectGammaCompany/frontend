import {
  blockQueries,
  type Condition,
  type GetConditionsResponse,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const updateConditionInQuery = (
  eventId: string,
  blockId: string,
  condition: Condition,
) => {
  queryClient.setQueryData(
    blockQueries.getConditions(eventId, blockId),
    (oldData: AxiosResponse<GetConditionsResponse>) => {
      if (oldData) {
        const index = oldData.data.conditions.findIndex(
          (el) => el.id === condition.id,
        );
        const firstSlice = oldData.data.conditions.slice(0, index);
        const secondSlice = oldData.data.conditions.slice(
          index + 1,
          oldData.data.conditions.length,
        );
        const newData: AxiosResponse<GetConditionsResponse> = {
          ...oldData,
          data: {
            conditions: [...firstSlice, { ...condition }, ...secondSlice],
          },
        };
        console.log(newData.data.conditions);
        return newData;
      }
      return oldData;
    },
  );
};
