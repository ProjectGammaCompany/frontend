import {
  blockQueries,
  type GetTasksResponse,
  type TaskItemData,
} from "@/entities";
import { queryClient } from "@/shared/api";
import type { AxiosResponse } from "axios";

export const updateTasksOrderInQuery = (
  eventId: string,
  blockId: string,
  tasks: TaskItemData[],
) => {
  queryClient.setQueryData(
    blockQueries.getTasks(eventId, blockId),
    (oldData: AxiosResponse<GetTasksResponse>) => {
      if (!oldData) {
        return oldData;
      }
      const newData: AxiosResponse<GetTasksResponse> = {
        ...oldData,
        data: {
          tasks,
        },
      };
      return newData;
    },
  );
};
