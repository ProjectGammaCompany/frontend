import { axiosInstance } from "@/shared/api";
import type { TaskFormData } from "../model/useFormSubmit";

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
