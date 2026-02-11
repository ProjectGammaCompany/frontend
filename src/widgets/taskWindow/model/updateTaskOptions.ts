import {
  taskQueries,
  type getEditorTaskDataResponse,
  type ServerOption,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import type { AxiosResponse } from "axios";

export const updateTaskOptions = (
  eventId: string,
  blockId: string,
  id: string,
  name: string,
  options: ServerOption[],
) => {
  queryClient.setQueryData(
    taskQueries.editorTaskData(eventId, blockId, id),
    (oldData: AxiosResponse<getEditorTaskDataResponse>) => {
      //todo: check if splice is bad
      if (oldData) {
        const newData: AxiosResponse<getEditorTaskDataResponse> = {
          ...oldData,
          data: {
            ...oldData.data,
            name,
            options,
          },
        };
        return newData;
      }
      return oldData;
    },
  );
};
