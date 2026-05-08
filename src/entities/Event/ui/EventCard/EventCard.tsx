import { DefaultEventCoverSvg } from "@/shared/ui/svg";
import { Typography } from "antd";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import "./EventCard.scss";
interface EventCardProps {
  title: string;
  description?: string;
  cover?: string;
  extra?: ReactNode;
}

const EventCard = ({ title, description, cover, extra }: EventCardProps) => {
  return (
    <motion.div
      className="event-card"
      whileHover={{
        backgroundColor: "var(--event-card-hover-color)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      draggable="false"
    >
      <Typography.Title level={2} className="event-card__title">
        {title}
      </Typography.Title>
      <div className="event-card__info">
        {cover ? (
          <img
            className="event-card__image"
            src={cover}
            alt="обложка события"
          />
        ) : (
          <div className="event-card__image">
            <DefaultEventCoverSvg />
          </div>
        )}
        {description && (
          <Typography className="event-card__description">
            {description}
          </Typography>
        )}
      </div>
      {extra}
    </motion.div>
  );
};

export default EventCard;
