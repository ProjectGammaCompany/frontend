import { axiosInstance } from "@/shared/api/axios";

export const sendCodeByEmail = (email: string) => {
  return axiosInstance.post("auth/recoverPasswordCode", {
    email,
  });
};
