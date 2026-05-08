import { axiosInstance } from "@/shared/api/axios";

export const updateBlocksOrder = (eventId: string, blocks: string[]) => {
  return axiosInstance.put(`event/${eventId}/blocks`, {
    blocks,
  });
};
