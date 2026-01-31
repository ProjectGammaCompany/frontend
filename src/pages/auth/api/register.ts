import { axiosInstance } from "@/src/shared/api";
import type { TokensResponse } from "@/src/shared/models";

export interface registerProps {
  email: string;
  password: string;
  repeatPassword: string;
}
export const register = (values: registerProps) => {
  return axiosInstance.post<TokensResponse>("auth/register", values);
};
