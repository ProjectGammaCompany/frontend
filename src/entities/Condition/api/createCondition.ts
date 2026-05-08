import { axiosInstance } from "@/shared/api/axios";

export interface ConditionData {
  group?: string[];
  min: number;
  max: number;
  blockId: string;
}

export interface CreateConditionResponse {
  conditionId: string;
  blockOrder: number;
}
export const createCondition = (
  eventId: string,
  blockId: string,
  conditionData: ConditionData,
) => {
  return axiosInstance.post<CreateConditionResponse>(
    `event/${eventId}/blocks/${blockId}/conditions`,
    conditionData,
  );
};
