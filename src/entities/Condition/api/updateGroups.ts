import { axiosInstance } from "@/shared/api/axios";
import { getCurrentStringDate } from "@/shared/lib/workWitDates";

export const updateGroups = (
  eventId: string,
  blockId: string,
  conditionId: string,
  groups: string[],
) => {
  return axiosInstance.put(
    `event/${eventId}/blocks/${blockId}/conditions/${conditionId}/groups`,
    {
      groups,
      lastEditionDate: getCurrentStringDate(),
    },
  );
};
