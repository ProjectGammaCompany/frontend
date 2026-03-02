import { axiosInstance } from "@/src/shared/api";

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
