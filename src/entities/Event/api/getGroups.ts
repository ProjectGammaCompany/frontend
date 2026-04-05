import { axiosInstance } from "@/shared/api";

export interface GetGroupsResponse {
  groups: Group[];
}

export interface Group {
  id: string;
  name: string;
}
export const getGroups = (eventId: string) => {
  return axiosInstance.get<GetGroupsResponse>(`event/${eventId}/groups`);
};
