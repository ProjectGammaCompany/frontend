import { axiosInstance } from "@/src/shared/api";
import type { BaseEventFormData } from "../ui/EventForm/EventForm";
export interface createEventResponse {
  eventId: string;
}
export const createEvent = (data: BaseEventFormData) => {
  return axiosInstance.post<createEventResponse>("event", {
    data,
  });
};
