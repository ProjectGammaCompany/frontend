import { axiosInstance } from "@/shared/api/axios";

export interface BlockSettings {
  name: string;
  isParallel: boolean;
  order: number;
  points: boolean;
  rightAnswers: boolean;
}
export const getBlockSettings = (eventId: string, blockId: string) => {
  return axiosInstance.get<BlockSettings>(`event/${eventId}/blocks/${blockId}`);
};
