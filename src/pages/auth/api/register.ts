import { axiosInstance } from "@/shared/api";
import type { TokensResponse } from "@/shared/model";

export interface RegisterProps {
  email: string;
  password: string;
  repeatPassword: string;
}
export const register = (values: RegisterProps) => {
  return axiosInstance.post<TokensResponse>("auth/register", values);
};
