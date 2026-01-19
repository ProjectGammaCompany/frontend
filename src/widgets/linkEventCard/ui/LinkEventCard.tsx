import { EventCard } from "@/src/entities";
import { ToggleFavoriteEventButton } from "@/src/features";
import { Typography } from "antd";
import { Link } from "react-router";
import "./LinkEventCard.scss";
interface LinkEventCardProps {
  id: string;
  title: string;
  description?: string;
  cover?: string;
  rating: number;
  favorite: boolean;
  tags: string[];
}

const LinkEventCard = ({
  id,
  title,
  description,
  cover,
  rating,
  favorite,
  tags,
}: LinkEventCardProps) => {
  return (
    <Link to={`/event/${id}`}>
      <EventCard
        title={title}
        description={description}
        cover={cover}
        extra={
          <div>
            <div className="link-event-card__first-row">
              <Typography.Text>Рейтинг: {rating} / 5</Typography.Text>
              <ToggleFavoriteEventButton id={id} defaultState={favorite} />
            </div>
            {tags.length > 0 && (
              <ul className="link-event-card__tags-list">
                {tags.map((tag) => (
                  <li className="link-event-card__tags-item" key={tag}>
                    <Typography.Text className="link-event-card__tags-text">
                      {tag}
                    </Typography.Text>
                  </li>
                ))}
              </ul>
            )}
          </div>
        }
      />
    </Link>
  );
};

export default LinkEventCard;
