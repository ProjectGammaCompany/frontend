import { axiosInstance } from "@/src/shared/api";

export const sendCodeByEmail = (email: string) => {
  return axiosInstance.post("auth/recoverPasswordCode", {
    email,
  });
};
