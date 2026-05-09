import { axiosInstance } from "@/shared/api/axios";

export const setAvatar = (avatar: string) => {
  return axiosInstance.put("profile/avatar", {
    avatar,
  });
};
