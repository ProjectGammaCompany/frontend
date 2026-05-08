import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const updateBlockName = (
  eventId: string,
  blockId: string,
  name: string,
) => {
  return axiosInstance.put(`event/${eventId}/blocks/${blockId}/name`, {
    name,
    lastEditionDate: getCurrentStringDate(),
  });
};
