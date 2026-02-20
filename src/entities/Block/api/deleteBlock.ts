import { axiosInstance } from "@/src/shared/api";

export const deleteBlock = (eventId: string, blockId: string) => {
  return axiosInstance.delete(`event/${eventId}/blocks/${blockId}`);
};
