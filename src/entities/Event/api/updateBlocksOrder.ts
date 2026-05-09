import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const updateBlocksOrder = (eventId: string, blocks: string[]) => {
  return axiosInstance.put(`event/${eventId}/blocks`, {
    blocks,
    lastEditionDate: getCurrentStringDate(),
  });
};
