import { axiosInstance } from "@/src/shared/api";
import { type Event } from "./getEvents";

type ServerEvent = Omit<Event, "rating"> & {
  rate: number;
};
export interface GetFavoritesEventsResponse {
  events: ServerEvent[];
}
export const getFavoritesEvents = (page: number, maxOnPage: number) => {
  return axiosInstance.get<GetFavoritesEventsResponse>(
    `events/personal/favorites`,
    {
      params: {
        page,
        maxOnPage,
      },
    },
  );
};
