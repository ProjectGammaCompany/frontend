import { type GetEditorTaskDataResponse, taskQueries } from "@/entities/Task";
import { queryClient } from "@/shared/api/reactQuery";
import type { AxiosResponse } from "axios";

export const updateTaskData = (
  eventId: string,
  blockId: string,
  id: string,
  updatedData: GetEditorTaskDataResponse,
) => {
  queryClient.setQueryData(
    taskQueries.editorTaskData(eventId, blockId, id),
    (oldData: AxiosResponse<GetEditorTaskDataResponse>) => {
      if (oldData) {
        const newData: AxiosResponse<GetEditorTaskDataResponse> = {
          ...oldData,
          data: {
            ...oldData.data,
            ...updatedData,
          },
        };
        return newData;
      }
      return oldData;
    },
  );
};
