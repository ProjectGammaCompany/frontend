import { axiosInstance } from "@/src/shared/api";

export const updateUsername = (username: string) => {
  return axiosInstance.put("profile/username", {
    username,
  });
};
