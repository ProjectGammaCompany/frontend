import { Seo } from "@/shared/lib"
import NotificationsList from "../NotificationsList/NotificationsList"
import "./NotificationsPage.scss"

const NotificationsPage = () => {
  return (
    <div className="notifications-page">
      <Seo
        title="Уведомления"
        description="Страница уведомлений пользователя."
        canonical={`notifications`}
        noIndex
      />
      <NotificationsList />
    </div>
  );
};

export default NotificationsPage;
