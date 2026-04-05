import { axiosInstance } from "@/shared/api";
import type { FullTaskData } from "../model/useFormSubmit";

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
