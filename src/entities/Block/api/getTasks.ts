import { axiosInstance } from "@/shared/api/axios";

export interface TaskItemData {
  id: string;
  name: string;
  order: number;
}

export interface GetTasksResponse {
  tasks: TaskItemData[];
}
export const getTasks = (eventId: string, blockId: string) => {
  return axiosInstance.get<GetTasksResponse>(
    `event/${eventId}/blocks/${blockId}/tasks`,
  );
};
