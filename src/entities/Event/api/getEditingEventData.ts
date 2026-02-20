import { axiosInstance } from "@/src/shared/api";

export interface BlockItemData {
  id: string;
  name: string;
  order: number;
  connectedBlocks: boolean;
  conditionsWithoutBlocks: boolean;
  isParallel: boolean;
}

export interface getEditingEventDataResponse {
  name: string;
  blocks: BlockItemData[];
}
export const getEditingEventData = (eventId: string) => {
  return axiosInstance.get<getEditingEventDataResponse>(`event/${eventId}`);
};
