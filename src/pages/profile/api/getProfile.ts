import { axiosInstance } from "@/src/shared/api";

export interface GetProfileResponse {
  avatar: string;
  username: string;
}
export const getProfile = () => {
  return axiosInstance.get<GetProfileResponse>("profile");
};
