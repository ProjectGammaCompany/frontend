import { blockQueries, type GetTasksResponse } from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const updateTaskInList = (
  eventId: string,
  blockId: string,
  id: string,
  name: string,
  index: number,
) => {
  queryClient.setQueryData(
    blockQueries.getTasks(eventId, blockId),
    (oldData: AxiosResponse<GetTasksResponse>) => {
      if (oldData) {
        const firstSlice = oldData.data.tasks.slice(0, index);
        const secondSlice = oldData.data.tasks.slice(
          index + 1,
          oldData.data.tasks.length,
        );
        const newData: AxiosResponse<GetTasksResponse> = {
          ...oldData,
          data: {
            tasks: [
              ...firstSlice,
              { name, id, order: index + 1 },
              ...secondSlice,
            ],
          },
        };
        console.log(newData);
        return newData;
      }
      return oldData;
    },
  );
};
