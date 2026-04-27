import { axiosInstance } from "@/shared/api";
import type { TokensResponse } from "@/shared/model";

export interface loginProps {
  email: string;
  password: string;
}
export const login = (values: loginProps) => {
  return axiosInstance.post<TokensResponse>("auth/login", values);
};
