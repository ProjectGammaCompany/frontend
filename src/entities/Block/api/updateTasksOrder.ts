import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const updateTasksOrder = (
  eventId: string,
  blockId: string,
  tasks: string[],
) => {
  return axiosInstance.put(`event/${eventId}/blocks/${blockId}/tasks`, {
    tasks,
    lastEditionDate: getCurrentStringDate(),
  });
};
