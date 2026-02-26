import { axiosInstance } from "@/src/shared/api";

interface GetJoinRequiredFieldsResponse {
  groupFields: boolean;
}
export const getJoinRequiredFields = (joinCode: string) => {
  return axiosInstance.get<GetJoinRequiredFieldsResponse>(
    `events/joinRequiredFields/${joinCode}`,
  );
};
