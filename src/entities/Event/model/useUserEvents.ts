import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { type GetUserEventsResponse } from "../api/getUserEvents";

export type QueryFnType = (
  page: number,
  maxOnPage: number,
) => Promise<AxiosResponse<GetUserEventsResponse>>;
export const usePersonalEvents = (
  enabled: boolean,
  queryKey: string[],
  queryFn: QueryFnType,
) => {
  return useInfiniteQuery<
    AxiosResponse<GetUserEventsResponse>,
    Error,
    InfiniteData<AxiosResponse<GetUserEventsResponse>>,
    unknown[],
    number
  >({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam, 10),
    getNextPageParam: (lastPage, _, lasPageParam) => {
      if (lastPage.data.events.length === 0) {
        return undefined;
      }
      return lasPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    initialPageParam: 1,
    enabled: enabled,
  });
};
