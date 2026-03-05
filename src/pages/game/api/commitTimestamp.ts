import { axiosInstance } from "@/src/shared/api";

export const commitTimestamp = (
  eventId: string,
  blockId: string,
  taskId: string,
  timestamp: string,
) => {
  return axiosInstance.put(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}/timestamp`,
    {
      timestamp,
    },
  );
};
