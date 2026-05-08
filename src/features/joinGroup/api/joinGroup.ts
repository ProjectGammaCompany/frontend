import { axiosInstance } from "@/shared/api/axios";

export interface GroupData {
  groupName: string;
  groupPassword: string;
}
export const joinGroup = (eventId: string, groupData: GroupData) => {
  return axiosInstance.post(`event/${eventId}/join`, groupData);
};
