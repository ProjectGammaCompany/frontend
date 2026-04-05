import { axiosInstance } from "@/shared/api";

export const updateUsername = (username: string) => {
  return axiosInstance.put("profile/username", {
    username,
  });
};
