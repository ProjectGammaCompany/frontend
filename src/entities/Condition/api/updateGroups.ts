import { axiosInstance } from "@/shared/api/axios";

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
    },
  );
};
