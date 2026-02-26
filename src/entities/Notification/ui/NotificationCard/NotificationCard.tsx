import { CrossSvg } from "@/src/shared/ui/index.ts";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router";
import type { CustomNotification } from "../../api/getNotifications.ts";
import { getNotificationData } from "../../libs/getNotificationData.ts";
import "./NotificationCard.scss";
interface NotificationCardProps {
  notification: CustomNotification;
  onDelete: (id: string) => void;
}

export interface NotificationData {
  header: string;
  body: string;
  onClick: () => void;
}

export const NotificationCard = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  const { id, date, extra, type } = notification;

  const navigate = useNavigate();

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
        className="notification-card__delete-btn"
      />
      <div className="notification-card__header">
        <Typography.Paragraph className="notification-card__header-text">
          {notificationData.header}
        </Typography.Paragraph>
        <Typography.Paragraph className="notification-card__date">
          {date}
        </Typography.Paragraph>
      </div>
      <Typography.Paragraph className="notification-card__body">
        {notificationData.body}
      </Typography.Paragraph>
    </div>
  );
};

export default NotificationCard;
