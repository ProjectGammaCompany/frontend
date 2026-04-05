import { axiosInstance } from "@/shared/api";

export const deleteCondition = (
  eventId: string,
  blockId: string,
  conditionId: string,
) => {
  return axiosInstance.delete(
    `event/${eventId}/blocks/${blockId}/conditions/${conditionId}`,
  );
};
