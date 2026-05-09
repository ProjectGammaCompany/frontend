import { axiosInstance } from "@/shared/api/axios";
import type { TaskFile } from "./createTask";

export interface GetEditorTaskDataResponse {
  name: string;
  description?: string;
  type: number; // начинаем с 1
  options: ServerOption[];
  files: TaskFile[];
  points?: number;
  time: number; // в секундах
  partialPoints: boolean;
}

export interface ServerOption {
  id: string;
  value: string;
  isCorrect: boolean;
}
export const getEditorTaskData = (
  eventId: string,
  blockId: string,
  taskId: string,
) => {
  return axiosInstance.get<GetEditorTaskDataResponse>(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}`,
  );
};
