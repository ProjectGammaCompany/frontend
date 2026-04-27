import {
  NotificationCard,
  useDeleteNotification,
  useNotifications,
} from "@/entities";
import { useNotify } from "@/shared/lib";
import { Button, Empty, Flex, Spin, Typography } from "antd";
import { AnimatePresence, motion } from "motion/react";
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
    console.log(inView, !isFetching, hasNextPage);
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

  const isListEmpty =
    !isFetching &&
    data?.pages?.length === 1 &&
    data.pages[0].data.notifications.length === 0;

  return (
    <div className="notifications-list__wrapper">
      <ul className="notifications-list">
        <AnimatePresence>
          {isListEmpty ? (
            <Empty
              className="notifications-list__empty"
              description={
                <Typography.Text className="notifications-list__empty-text">
                  Список уведомлений пуст
                </Typography.Text>
              }
            />
          ) : (
            data?.pages.map((page, index) =>
              page.data.notifications.map((notification) => (
                <motion.li
                  key={notification.id}
                  exit={{
                    x: "200dvw",
                    height: 0,
                    transition: {
                      duration: 0.5,
                    },
                  }}
                >
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    deleteBtnLoading={
                      deleteNotificationMutation.isPending &&
                      deleteNotificationMutation.variables === notification.id
                    }
                    onDelete={(id) => {
                      handleDeleteNotifications(id, index);
                    }}
                  />
                </motion.li>
              )),
            )
          )}
        </AnimatePresence>
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
                Произошла ошибка
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
