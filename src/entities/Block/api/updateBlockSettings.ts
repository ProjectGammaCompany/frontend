import { axiosInstance } from "@/src/shared/api";
import type { BlockSettings } from "./getBlockSettings";

export type UpdateBlockData = Omit<BlockSettings, "name" | "order">;

export const updateBlockSettings = (
  eventId: string,
  blockId: string,
  data: UpdateBlockData,
) => {
  return axiosInstance.put(`event/${eventId}/blocks/${blockId}`, data);
};
