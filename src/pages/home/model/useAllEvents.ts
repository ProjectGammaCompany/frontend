import { getEvents, type getEventsResponse } from "@/src/entities";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export interface Filters {
  tags?: string[];
  decliningRating: boolean;
  active: boolean;
  favorites: boolean;
  title: string;
}

export const useAllEvents = (filters: Filters) => {
  return useInfiniteQuery<
    AxiosResponse<getEventsResponse>,
    Error,
    InfiniteData<AxiosResponse<getEventsResponse>>,
    ["allEvents"],
    number
  >({
    queryKey: ["allEvents"],
    queryFn: ({ pageParam }) =>
      getEvents({
        ...filters,
        page: pageParam,
        maxOnPage: 10,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.events.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    initialPageParam: 1,
  });
};
