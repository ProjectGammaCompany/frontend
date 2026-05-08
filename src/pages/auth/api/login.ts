import { axiosInstance } from "@/shared/api/axios";
import type { TokensResponse } from "@/shared/model/types";

export interface loginProps {
  email: string;
  password: string;
}
export const login = (values: loginProps) => {
  return axiosInstance.post<TokensResponse>("auth/login", values);
};
