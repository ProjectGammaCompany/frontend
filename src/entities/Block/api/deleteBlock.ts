import { axiosInstance } from "@/shared/api/axios";

export const deleteBlock = (eventId: string, blockId: string) => {
  return axiosInstance.delete(`event/${eventId}/blocks/${blockId}`);
};
