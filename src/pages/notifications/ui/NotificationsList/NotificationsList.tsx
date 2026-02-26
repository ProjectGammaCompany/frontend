import { useDeleteNotification, useNotifications } from "@/src/entities";
import NotificationCard from "@/src/entities/Notification/ui/NotificationCard/NotificationCard";
import { Spin, Typography } from "antd";
import { useState } from "react";
import { useOnInView } from "react-intersection-observer";
import { deleteNotificationFromQuery } from "../../model/deleteNotificationFromQuery";
import "./NotificationsList.scss";
const NotificationsList = () => {
  const { data, isFetching, hasNextPage, error, fetchNextPage } =
    useNotifications();

  const [deletingNotificationPage, setDeletingNotificationPage] = useState(0);

  const inViewRef = useOnInView((inView) => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  });

  const handleSuccessNotificationDelete = (id: string) => {
    deleteNotificationFromQuery(id, deletingNotificationPage);
  };

  const deleteNotificationMutation = useDeleteNotification(
    handleSuccessNotificationDelete,
  );

  const handleDeleteNotifications = (id: string, page: number) => {
    setDeletingNotificationPage(page);
    deleteNotificationMutation.mutate(id);
  };

  return (
    <div>
      <ul className="notifications-list">
        {data?.pages.map((page, index) =>
          page.data.notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              onDelete={(id) => {
                handleDeleteNotifications(id, index);
              }}
            />
          )),
        )}
      </ul>
      {(isFetching || error) && (
        <div className="notifications-list__spin-wrapper">
          {isFetching && !error && <Spin />}
          {error && <Typography>Возникла ошибка</Typography>}
        </div>
      )}
      <div
        ref={inViewRef}
        className="notifications-list__intersection-observer"
      />
    </div>
  );
};

export default NotificationsList;
