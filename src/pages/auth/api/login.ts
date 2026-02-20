import { axiosInstance } from "@/src/shared/api";
import type { TokensResponse } from "@/src/shared/models";

export interface loginProps {
  email: string;
  password: string;
}
export const login = (values: loginProps) => {
  return axiosInstance.post<TokensResponse>("auth/login", values);
};
