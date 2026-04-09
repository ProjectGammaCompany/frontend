import { axiosInstance } from "@/shared/api";

export interface GroupData {
  groupName: string;
  groupPassword: string;
}
export const joinGroup = (eventId: string, groupData: GroupData) => {
  return axiosInstance.post(`events/${eventId}/join`, groupData);
};
