import { useQuery } from "@tanstack/react-query";
import { getJoinRequiredFields } from "../api/getJoinRequiredFields";
import { eventQueries } from "../api/queries";

export const useJoinRequiredFields = (joinCode: string, enabled: boolean) => {
  return useQuery({
    queryKey: eventQueries.getJoinRequiredFields(joinCode),
    queryFn: () => getJoinRequiredFields(joinCode),
    enabled: enabled,
    select: (data) => data.data,
  });
};
