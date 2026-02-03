import type { GetTasksResponse } from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const removeTaskFromList = (
  eventId: string,
  blockId: string,
  id: string,
) => {
  queryClient.setQueryData(
    [eventId, blockId, "tasksList"],
    (oldData: AxiosResponse<GetTasksResponse>) => {
      if (oldData) {
        const newData: AxiosResponse<GetTasksResponse> = {
          ...oldData,
          data: {
            ...oldData.data,
            tasks: oldData.data.tasks
              .filter((elem) => elem.id != id)
              .map((elem, index) => {
                return {
                  ...elem,
                  order: index + 1,
                };
              }),
          },
        };
        return newData;
      }
      return oldData;
    },
  );
};
