import { axiosInstance } from "@/src/shared/api";

interface GetEditingBlockDataResponse {
  name: string;
  isParallel: boolean;
  order: number;
  points: boolean;
  rightAnswers: boolean;
  partialPoints: boolean;
}
export const getEditingBlockData = (eventId: string, blockId: string) => {
  return axiosInstance.get<GetEditingBlockDataResponse>(
    `event/${eventId}/blocks/${blockId}`,
  );
};
