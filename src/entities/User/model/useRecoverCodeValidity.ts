import { useQuery } from "@tanstack/react-query";
import { getRecoverPasswordCodeValidity } from "../api/getRecoverPasswordCodeValidity";
import { userQueries } from "../api/queries";

export const useRecoverCodeValidity = (
  code: string | null,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: userQueries.getRecoverCodeValidity(code!),
    queryFn: () => getRecoverPasswordCodeValidity(code!),
    enabled: enabled,
    select: (data) => data.data,
  });
};
