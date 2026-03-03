import { axiosInstance } from "@/src/shared/api";

export const updateTasksOrder = (
  eventId: string,
  blockId: string,
  tasks: string[],
) => {
  return axiosInstance.put(`event/${eventId}/blocks/${blockId}/tasks`, {
    tasks,
  });
};
