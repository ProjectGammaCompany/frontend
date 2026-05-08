import { axiosInstance } from "@/shared/api/axios";

export interface CustomNotification {
  id: string;
  type: NotificationType;
  date: string;
  favoriteEventStartExtra?: EventStartExtra;
  eventEndExtra?: EventEndExtra;
}

export type NotificationType = "favoriteEventStart" | "eventEnd";

export interface EventStartExtra {
  id: string;
  eventName: string;
}

export interface EventEndExtra {
  id: string;
  timeLeft?: "hour" | "day";
  notStartedFavorite: boolean;
  eventName: string;
}

export interface GetNotificationsResponse {
  notifications: CustomNotification[];
}
export const getNotifications = (page: number, maxOnPage: number) => {
  return axiosInstance.get(`/notifications`, {
    params: {
      page,
      maxOnPage,
    },
  });
};
