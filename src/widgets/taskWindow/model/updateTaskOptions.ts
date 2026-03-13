import { taskQueries, type GetEditorTaskDataResponse } from "@/src/entities";
import { queryClient } from "@/src/shared/api";
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
      //todo: check if splice is bad
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
