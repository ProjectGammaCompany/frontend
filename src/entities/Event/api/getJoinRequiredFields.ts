import { axiosInstance } from "@/shared/api";

interface GetJoinRequiredFieldsResponse {
  groupFields: boolean;
}
export const getJoinRequiredFields = (joinCode: string) => {
  return axiosInstance.get<GetJoinRequiredFieldsResponse>(
    `event/joinRequiredFields/${joinCode}`,
  );
};
