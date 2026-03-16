import {
  NotificationCard,
  useDeleteNotification,
  useNotifications,
} from "@/src/entities";
import { errorText } from "@/src/shared/api";
import { useNotify } from "@/src/shared/lib";
import { Button, Flex, Spin, Typography } from "antd";
import { useState } from "react";
import { useOnInView } from "react-intersection-observer";
import { deleteNotificationFromQuery } from "../../model/deleteNotificationFromQuery";
import "./NotificationsList.scss";
const NotificationsList = () => {
  const notify = useNotify();
  const { data, isFetching, hasNextPage, error, fetchNextPage } =
    useNotifications();

  const [deletingNotificationPage, setDeletingNotificationPage] = useState(0);

  const inViewRef = useOnInView((inView) => {
    if (inView && !isFetching && hasNextPage) {
      void fetchNextPage();
    }
  });

  const handleSuccessNotificationDelete = (id: string) => {
    deleteNotificationFromQuery(id, deletingNotificationPage);
  };
  const handleFailedNotificationDelete = () => {
    notify.error({
      title: "Ошибка удаления",
      description: "Не удалось удалить уведомление. Попробуйте позднее",
      placement: "top",
    });
  };

  const deleteNotificationMutation = useDeleteNotification(
    handleSuccessNotificationDelete,
    handleFailedNotificationDelete,
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
              key={notification.id}
              notification={notification}
              onDelete={(id) => {
                handleDeleteNotifications(id, index);
              }}
            />
          )),
        )}
      </ul>
      {(isFetching || error) && (
        <Flex
          className="notifications-list__spin-wrapper"
          justify="center"
          align="center"
        >
          {isFetching && !error && <Spin />}
          {error && (
            <Flex justify="center" vertical>
              <Typography.Paragraph type="danger">
                {errorText(
                  error,
                  () => undefined,
                  () => undefined,
                  undefined,
                  "Произошла ошибка",
                  "Произошла ошибка",
                  "Произошла ошибка",
                )}
              </Typography.Paragraph>
              <Button onClick={() => void fetchNextPage()}>Обновить</Button>
            </Flex>
          )}
        </Flex>
      )}
      <div
        ref={inViewRef}
        className="notifications-list__intersection-observer"
      />
    </div>
  );
};

export default NotificationsList;
