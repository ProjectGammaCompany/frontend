import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import {
  getNotifications,
  type GetNotificationsResponse,
} from "../api/getNotifications";
import { notificationQueries } from "../api/queries";

export type QueryFnData = AxiosResponse<GetNotificationsResponse>;

export const useNotifications = () => {
  return useInfiniteQuery<
    QueryFnData,
    Error,
    InfiniteData<QueryFnData>,
    unknown[],
    number
  >({
    queryFn: ({ pageParam }) => getNotifications(pageParam, 10),
    queryKey: notificationQueries.getNotifications(),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.notifications.length <= 10) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    initialPageParam: 0,
  });
};
