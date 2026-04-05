import { axiosInstance } from "@/shared/api";

export const selectTask = (
  eventId: string,
  blockId: string,
  taskId: string,
) => {
  return axiosInstance.put(`event/${eventId}/nextStage`, {
    blockId,
    taskId,
  });
};
