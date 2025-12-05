import { Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import "./NotificationPageHeaderContent.scss";
const NotificationPageHeaderContent = () => {
  return (
    <div className="notifications-page-header-content">
      <Logo />
      <Typography.Title level={2}>Уведомления</Typography.Title>
    </div>
  );
};

export default NotificationPageHeaderContent;
