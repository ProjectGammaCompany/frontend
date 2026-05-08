import { axiosInstance } from "@/shared/api/axios";
import type { ConditionData } from "./createCondition";

export interface UpdateConditionResponse {
  blockOrder: number;
}
export const updateCondition = (
  eventId: string,
  blockId: string,
  id: string,
  data: ConditionData,
) => {
  return axiosInstance.put<UpdateConditionResponse>(
    `event/${eventId}/blocks/${blockId}/conditions/${id}`,
    data,
  );
};
