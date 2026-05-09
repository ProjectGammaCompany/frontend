import { axiosInstance } from "@/shared/api/axios";

import { getCurrentStringDate } from "@/shared/lib/workWitDates";
import type { TaskFormData } from "./createTask";
import { type ServerOption } from "./getEditorTaskData";

export interface UpdateTaskResponse {
  options: ServerOption[];
  order: number;
}

export const updateTask = (
  eventId: string,
  blockId: string,
  taskId: string,
  data: TaskFormData,
) => {
  return axiosInstance.put<UpdateTaskResponse>(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}`,
    { ...data, lastEditionDate: getCurrentStringDate() },
  );
};
