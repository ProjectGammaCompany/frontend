import { axiosInstance } from "@/src/shared/api";

export const logout = () => {
  return axiosInstance.post("logout");
};
