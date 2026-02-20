import { axiosInstance } from "@/src/shared/api";

export const setAvatar = (url: string) => {
  return axiosInstance.put("profile/avatar", {
    url,
  });
};
