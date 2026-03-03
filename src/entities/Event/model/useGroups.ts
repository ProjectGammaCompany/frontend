import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { getGroups, type GetGroupsResponse } from "../api/getGroups";
import { eventQueries } from "../api/queries";

export type UseGroupsQueryData = AxiosResponse<GetGroupsResponse>;

export const useGroups = <SelectType>(
  eventId: string,
  select?: (data: AxiosResponse<GetGroupsResponse>) => SelectType,
) => {
  return useQuery({
    queryFn: () => getGroups(eventId),
    queryKey: eventQueries.getGroups(eventId),
    select: select,
  });
};
