import { axiosInstance } from "@/src/shared/api";

interface getEventsProps {
  cursor: string | null;
  limit?: number;
  tags?: string[];
  decliningRating: boolean;
  territorialized: boolean;
  active: boolean;
}

export interface getEventsResponse {
  next?: string;
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
