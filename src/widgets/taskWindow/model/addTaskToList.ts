import { type GetTasksResponse, blockQueries } from "@/entities/Block";
import { queryClient } from "@/shared/api";
import type { AxiosResponse } from "axios";

export const addTaskToList = (
  eventId: string,
  blockId: string,
  id: string,
  name: string,
  order: number,
) => {
  queryClient.setQueryData(
    blockQueries.getTasks(eventId, blockId),
    (oldData: AxiosResponse<GetTasksResponse>) => {
      if (oldData) {
        const newData: AxiosResponse<GetTasksResponse> = {
          ...oldData,
          data: {
            tasks: [
              ...oldData.data.tasks,
              {
                id: id,
                name: name,
                order: order,
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
