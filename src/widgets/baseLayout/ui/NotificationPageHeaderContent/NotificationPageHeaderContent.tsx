import { Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import { useLocation } from "react-router";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import "./NotificationPageHeaderContent.scss";
const NotificationPageHeaderContent = () => {
  const { pathname } = useLocation();
  return (
    <div className="notifications-page-header-content">
      <Logo className="notifications-page-header-content__logo" />
      <Typography.Title
        level={1}
        className="notifications-page-header-content__text"
      >
        Уведомления
      </Typography.Title>
      <div className="notifications-page-header-content__buttons-wrapper">
        <NavigationButtons pathname={pathname} />
      </div>
    </div>
  );
};

export default NotificationPageHeaderContent;
