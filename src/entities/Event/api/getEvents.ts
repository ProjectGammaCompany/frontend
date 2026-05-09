import { axiosInstance } from "@/shared/api/axios";

interface getEventsProps {
  page: number;
  maxOnPage: number;
  tags?: string[];
  decliningRating: boolean;
  active: boolean;
}

interface Tag {
  id: string;
  name: string;
}

export interface getEventsResponse {
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  rate: number;
  favorite: boolean;
  lastEditionDate: string;
  tags: Tag[];
  cover: string;
}
export const getEvents = (props: getEventsProps) => {
  return axiosInstance.get<getEventsResponse>("events", {
    params: props,
  });
};
