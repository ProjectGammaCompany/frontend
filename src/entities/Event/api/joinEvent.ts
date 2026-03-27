import { axiosInstance } from "@/src/shared/api";

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
    `events/join/${joinCode}`,
    values,
  );
};
