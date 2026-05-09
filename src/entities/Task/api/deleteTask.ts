import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const deleteTask = (
  eventId: string,
  blockId: string,
  taskId: string,
) => {
  return axiosInstance.delete(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}`,
    {
      data: {
        lastEditionDate: getCurrentStringDate(),
      },
    },
  );
};
