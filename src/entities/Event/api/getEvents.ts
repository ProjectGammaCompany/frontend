import { axiosInstance } from "@/src/shared/api";

interface getEventsProps {
  page: number;
  maxOnPage: number;
  tags?: string[];
  decliningRating: boolean;
  territorialized: boolean;
  active: boolean;
}

export interface getEventsResponse {
  info: Event[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  rating: number;
  favorite: boolean;
  lastEditionDate: string;
  tags: string[];
  cover: string;
}
export const getEvents = (props: getEventsProps) => {
  return axiosInstance.get<getEventsResponse>("events", {
    params: props,
  });
};
