import { axiosInstance } from "@/src/shared/api";
import type { PickPartial } from "@/src/shared/lib";
import type { ServerOption } from "./getEditorTaskData";

export type ClientOption = PickPartial<ServerOption, "id"> & {
  clientId: string;
};

export interface TaskFile {
  url: string;
  name: string;
}
export interface TaskFormData {
  description?: string;
  type: number;
  options?: ClientOption[];
  files: TaskFile[];
  points?: number;
  time: number;
  partialPoints?: boolean;
}

export type FullTaskData = TaskFormData & { name: string };

export interface CreateTaskResponse {
  taskId: string;
}

export const createTask = (
  eventId: string,
  blockId: string,
  data: FullTaskData,
) => {
  return axiosInstance.post<CreateTaskResponse>(
    `event/${eventId}/blocks/${blockId}/task`,
    data,
  );
};
