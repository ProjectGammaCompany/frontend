import type { PickPartial } from "@/shared/lib/tsTypes";
import type { ServerOption } from "./getEditorTaskData";

import { axiosInstance } from "@/shared/api/axios";

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
  name: string;
}

export interface CreateTaskResponse {
  taskId: string;
}

export const createTask = (
  eventId: string,
  blockId: string,
  data: TaskFormData,
) => {
  return axiosInstance.post<CreateTaskResponse>(
    `event/${eventId}/blocks/${blockId}/task`,
    data,
  );
};
