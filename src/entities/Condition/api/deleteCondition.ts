import { axiosInstance } from "@/shared/api/axios";

export const deleteCondition = (
  eventId: string,
  blockId: string,
  conditionId: string,
) => {
  return axiosInstance.delete(
    `event/${eventId}/blocks/${blockId}/conditions/${conditionId}`,
  );
};
