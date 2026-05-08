import { axiosInstance } from "@/shared/api/axios";

export interface GetConditionsResponse {
  conditions: Condition[];
}

export interface Condition {
  id: string;
  group?: string[];
  min: number;
  max: number;
  blockId: string;
  blockOrder: number;
}
export const getConditions = (eventId: string, blockId: string) => {
  return axiosInstance.get<GetConditionsResponse>(
    `event/${eventId}/blocks/${blockId}/conditions`,
  );
};
