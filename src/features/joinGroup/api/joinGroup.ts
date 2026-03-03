import { axiosInstance } from "@/src/shared/api";

export interface GroupData {
  groupName: string;
  groupPassword: string;
}
export const joinGroup = (eventId: string, groupData: GroupData) => {
  return axiosInstance.post(`events/${eventId}/join`, groupData);
};
