import type { ConditionData, GetConditionsResponse } from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const addConditionToList = (
  eventId: string,
  blockId: string,
  variables: ConditionData,
  id: string,
  blockOrder: number,
) => {
  queryClient.setQueryData(
    [eventId, blockId, "conditionsList"],
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
