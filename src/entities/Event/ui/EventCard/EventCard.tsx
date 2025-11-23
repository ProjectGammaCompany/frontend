import { Typography } from "antd";
import type { ReactNode } from "react";
import "./EventCard.scss";
interface EventCardProps {
  title: string;
  description?: string;
  cover?: string;
  extra?: ReactNode;
}

const EventCard = ({ title, description, cover, extra }: EventCardProps) => {
  const { Title } = Typography;
  return (
    <div className="event-card">
      <Title level={2} className="event-card__title">
        {title}
      </Title>
      <div className="event-card__info">
        {cover && (
          <img
            className="event-card__image"
            src={cover}
            alt="обложка события"
          />
        )}
        {description && (
          <Typography className="event-card__description">
            {description}
          </Typography>
        )}
      </div>
      {extra}
    </div>
  );
};

export default EventCard;
