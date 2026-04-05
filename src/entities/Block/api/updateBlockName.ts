import { axiosInstance } from "@/shared/api";

export const updateBlockName = (
  eventId: string,
  blockId: string,
  name: string,
) => {
  return axiosInstance.put(`event/${eventId}/blocks/${blockId}/name`, {
    name,
  });
};
