import { axiosInstance } from "@/shared/api/axios";

interface GetBlockOptionsResponse {
  blocks: BlockOption[];
}

export interface BlockOption {
  id: string;
  name: string;
}
export const getBlocksOptions = (eventId: string) => {
  return axiosInstance.get<GetBlockOptionsResponse>(`event/${eventId}/blocks`);
};
