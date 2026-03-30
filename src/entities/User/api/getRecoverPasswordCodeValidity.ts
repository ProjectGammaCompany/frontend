import { axiosInstance } from "@/src/shared/api";

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
