import { axiosInstance } from "@/shared/api/axios";

export const updateUsername = (username: string) => {
  return axiosInstance.put("profile/username", {
    username,
  });
};
