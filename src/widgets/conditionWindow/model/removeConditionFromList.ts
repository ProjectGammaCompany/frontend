import type { GetConditionsResponse } from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const removeConditionFromList = (
  eventId: string,
  blockId: string,
  id: string,
) => {
  queryClient.setQueryData(
    [eventId, blockId, "conditionsList"],
    (oldData: AxiosResponse<GetConditionsResponse>) => {
      if (oldData) {
        const newData: AxiosResponse<GetConditionsResponse> = {
          ...oldData,
          data: {
            ...oldData,
            conditions: oldData.data.conditions.filter((el) => el.id != id),
          },
        };
        console.log(newData);
        return newData;
      }
      return oldData;
    },
  );
};
