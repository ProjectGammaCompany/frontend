import { useQuery } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import {
  getJoinCodeData,
  type GetJoinCodeDataResponse,
} from "../api/getJoinCodeData";
import { eventQueries } from "../api/queries";

export type UseJoinCodeDataResult = GetJoinCodeDataResponse;
export const useJoinCodeData = (eventId: string, enabled: boolean) => {
  return useQuery<
    AxiosResponse<UseJoinCodeDataResult>,
    Error,
    UseJoinCodeDataResult
  >({
    queryKey: eventQueries.getJoinCodeData(eventId),
    queryFn: () => getJoinCodeData(eventId),
    select: (data) => data.data,
    enabled,
    retry: false,
  });
};
