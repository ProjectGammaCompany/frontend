import { axiosInstance } from "@/shared/api/axios";
import { type Event } from "./getEvents";

type ServerEvent = Omit<Event, "rating"> & {
  rate: number;
};
export interface GetUserEventsResponse {
  events: ServerEvent[];
}
export const getUserEvents = (page: number, maxOnPage: number) => {
  return axiosInstance.get<GetUserEventsResponse>(`events/personal/created`, {
    params: {
      page,
      maxOnPage,
    },
  });
};
