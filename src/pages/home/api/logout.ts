import { axiosInstance } from "@/src/shared/api";

export const logout = () => {
  return axiosInstance.delete("logout");
};
