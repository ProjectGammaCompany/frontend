import { axiosInstance } from "@/shared/api/axios";

export interface GetProfileResponse {
  avatar: string;
  email: string;
  username: string;
}
export const getProfile = () => {
  return axiosInstance.get<GetProfileResponse>("profile");
};
