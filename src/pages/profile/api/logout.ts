import { axiosInstance, queryClient } from "@/shared/api";

export const logout = () => {
  queryClient.clear();
  return axiosInstance.put("auth/logout");
};
