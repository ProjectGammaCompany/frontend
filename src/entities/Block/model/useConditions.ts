import {
  blockQueries,
  getConditions,
  type GetConditionsResponse,
} from "@/entities/Block";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export type UseConditionsData = AxiosResponse<GetConditionsResponse>;
export const useConditions = (eventId: string, blockId: string) => {
  return useQuery({
    queryKey: blockQueries.getConditions(eventId, blockId),
    queryFn: () => getConditions(eventId, blockId),
    select: (data) => data.data.conditions,
  });
};
