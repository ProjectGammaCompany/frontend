import { axiosInstance } from "@/src/shared/api";

export const updateBlocksOrder = (eventId: string, blocks: string[]) => {
  return axiosInstance.put(`event/${eventId}/blocks`, {
    blocks,
  });
};
