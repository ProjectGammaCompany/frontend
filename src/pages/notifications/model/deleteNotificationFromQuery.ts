import {
  notificationQueries,
  type GetNotificationsQueryData,
} from "@/entities/Notification";
import { queryClient } from "@/shared/api";
import type { InfiniteData } from "@tanstack/react-query";

export const deleteNotificationFromQuery = (id: string, pageIndex: number) => {
  queryClient.setQueryData(
    notificationQueries.getNotifications(),
    (oldData: InfiniteData<GetNotificationsQueryData>) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page, index) => {
          if (index === pageIndex) {
            return {
              ...page,
              data: {
                notifications: page.data.notifications.filter(
                  (notification) => notification.id != id,
                ),
              },
            };
          }
          return page;
        }),
      };
    },
  );
};
