import { axiosInstance } from "@/src/shared/api";
import { type FullTaskData } from "../ui/TaskForm/TaskForm";

export interface CreateTaskResponse {
  id: string;
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
