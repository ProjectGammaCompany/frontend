import { axiosInstance } from "@/shared/api";
import { type Event } from "./getEvents";

type ServerEvent = Omit<Event, "rating"> & {
  rate: number;
};
export interface GetEventsHistoryResponse {
  events: ServerEvent[];
}
export const getEventsHistory = (page: number, maxOnPage: number) => {
  return axiosInstance.get<GetEventsHistoryResponse>(
    `events/personal/history`,
    {
      params: {
        page,
        maxOnPage,
      },
    },
  );
};
