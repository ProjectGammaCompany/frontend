import { axiosInstance } from "@/src/shared/api";

export const setAvatar = (avatar: string) => {
  return axiosInstance.put("profile/avatar", {
    avatar,
  });
};
