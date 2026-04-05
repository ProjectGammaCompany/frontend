import { axiosInstance } from "@/shared/api";

export const deleteTask = (
  eventId: string,
  blockId: string,
  taskId: string,
) => {
  return axiosInstance.delete(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}`,
  );
};
