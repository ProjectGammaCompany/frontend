import { axiosInstance } from "@/shared/api/axios";

export interface JoinDetails {
  eventPassword: string;
  groupName?: string;
  groupPassword?: string;
}

export interface JoinEventResponse {
  eventId: string;
}
export const joinEvent = (joinCode: string, values: JoinDetails) => {
  return axiosInstance.post<JoinEventResponse>(
    `event/join/${joinCode}`,
    values,
  );
};
