import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const deleteCondition = (
  eventId: string,
  blockId: string,
  conditionId: string,
) => {
  return axiosInstance.delete(
    `event/${eventId}/blocks/${blockId}/conditions/${conditionId}`,
    {
      data: {
        lastEditionDate: getCurrentStringDate(),
      },
    },
  );
};
