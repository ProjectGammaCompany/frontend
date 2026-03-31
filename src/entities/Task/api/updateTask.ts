import { axiosInstance } from "@/src/shared/api";
import type { FullTaskData } from "../api/createTask";
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
