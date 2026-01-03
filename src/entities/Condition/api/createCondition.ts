import { axiosInstance } from "@/src/shared/api";

export interface ConditionData {
  group?: string[];
  min: number;
  max: number;
  blockId: string;
}

export interface CreateConditionResponse {
  id: string;
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
