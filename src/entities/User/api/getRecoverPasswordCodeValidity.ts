import { axiosInstance } from "@/shared/api/axios";

interface GetRecoverPasswordCodeValidityResponse {
  validity: boolean;
}
export const getRecoverPasswordCodeValidity = (code: string) => {
  return axiosInstance.get<GetRecoverPasswordCodeValidityResponse>(
    "auth/recoverPasswordCodeValidity",
    {
      params: {
        code,
      },
    },
  );
};
