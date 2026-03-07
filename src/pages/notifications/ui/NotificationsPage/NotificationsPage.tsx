import { useTitle } from "@/src/shared/lib";
import NotificationsList from "../NotificationsList/NotificationsList";
import "./NotificationsPage.scss";

const NotificationsPage = () => {
  useTitle("Уведомления");
  return (
    <div className="notifications-page">
      <NotificationsList />
    </div>
  );
};

export default NotificationsPage;
