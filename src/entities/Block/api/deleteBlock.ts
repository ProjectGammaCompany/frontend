import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const deleteBlock = (eventId: string, blockId: string) => {
  return axiosInstance.delete(`event/${eventId}/blocks/${blockId}`, {
    data: {
      lastEditionDate: getCurrentStringDate(),
    },
  });
};
