import { axiosInstance } from "@/shared/api/axios";
import { queryClient } from "@/shared/api/reactQuery";

export const logout = () => {
  queryClient.clear();
  return axiosInstance.put("auth/logout");
};
