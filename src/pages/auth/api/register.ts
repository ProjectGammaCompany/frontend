import { axiosInstance } from "@/shared/api";
import type { TokensResponse } from "@/shared/models";

export interface registerProps {
  email: string;
  password: string;
  repeatPassword: string;
}
export const register = (values: registerProps) => {
  return axiosInstance.post<TokensResponse>("auth/register", values);
};
