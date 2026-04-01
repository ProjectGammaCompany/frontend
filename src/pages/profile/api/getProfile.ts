import { axiosInstance } from "@/src/shared/api";

export interface GetProfileResponse {
  avatar: string;
  email: string;
  username: string;
}
export const getProfile = () => {
  return axiosInstance.get<GetProfileResponse>("profile");
};
