import { axiosInstance } from "@/shared/api";
import type { FullTaskData } from "../model/useFormSubmit";
import { type ServerOption } from "./getEditorTaskData";

export interface UpdateTaskResponse {
  options: ServerOption[];
  order: number;
}

export const updateTask = (
  eventId: string,
  blockId: string,
  taskId: string,
  data: FullTaskData,
) => {
  return axiosInstance.put<UpdateTaskResponse>(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}`,
    data,
  );
};
