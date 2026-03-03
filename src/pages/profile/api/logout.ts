import { axiosInstance, queryClient } from "@/src/shared/api";

export const logout = () => {
  queryClient.clear();
  return axiosInstance.put("auth/logout");
};
