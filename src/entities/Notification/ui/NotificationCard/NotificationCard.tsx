import { CrossSvg } from "@/shared/ui/svg/index.ts";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router";
import type { CustomNotification } from "../../api/getNotifications.ts";
import { getNotificationData } from "../../libs/getNotificationData.ts";
import "./NotificationCard.scss";
interface NotificationCardProps {
  notification: CustomNotification;
  deleteBtnLoading: boolean;
  onDelete: (id: string) => void;
}

export interface NotificationData {
  header: string;
  body: string;
  onClick: () => void;
}

export const NotificationCard = ({
  notification,
  deleteBtnLoading,
  onDelete,
}: NotificationCardProps) => {
  const {
    id,
    date,
    favoriteEventStartExtra: eventStartExtra,
    type,
    eventEndExtra,
  } = notification;

  const navigate = useNavigate();

  const extra =
    type === "favoriteEventStart" ? eventStartExtra! : eventEndExtra!;

  const notificationData = getNotificationData(type, extra, navigate);

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div onClick={notificationData.onClick} className="notification-card">
      <Button
        icon={<CrossSvg />}
        onClick={(e) => handleDelete(e)}
        loading={deleteBtnLoading}
        className="notification-card__delete-btn"
      />
      <div className="notification-card__header">
        <Typography.Paragraph className="notification-card__header-text">
          {notificationData.header}
        </Typography.Paragraph>
        <Typography.Paragraph className="notification-card__date">
          {date.slice(0, date.length - 7)}
        </Typography.Paragraph>
      </div>
      <Typography.Paragraph className="notification-card__body">
        {notificationData.body}
      </Typography.Paragraph>
    </div>
  );
};

export default NotificationCard;
