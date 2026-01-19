import { getPlayerInfo } from "@/src/entities";
import { ToggleFavoriteEventButton } from "@/src/features";
import { getFullFileUrl } from "@/src/shared/lib";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import InteractButton from "../InteractButton/InteractButton";
import "./PlayerContent.scss";

interface ParticipantContentProps {
  eventId: string;
}

const PlayerContent = ({ eventId }: ParticipantContentProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [eventId, "playerInfo"],
    queryFn: () => getPlayerInfo(eventId),
    select: (data) => {
      return data.data;
    },
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
  }

  return (
    <div className="player-content">
      <Typography.Title level={1} className="player-content__title">
        {data.title}
      </Typography.Title>
      <div className="player-content__specific-data">
        <img
          src={getFullFileUrl(data.cover ?? "")}
          alt="Обложка события"
          className="player-content__cover"
        />
        <div className="player-content__col">
          <ToggleFavoriteEventButton
            defaultState={data.favorite}
            id={eventId}
          />
          <Typography.Text>
            <b>Рейтинг:</b> <strong>{data.rate} / 5</strong>
          </Typography.Text>
        </div>
      </div>
      {data.tags.length > 0 && (
        <div className="player-content__tags-wrapper">
          <Typography.Title level={2}>Теги</Typography.Title>
          <ul className="player-content__tags">
            {data.tags.map((tag) => (
              <li key={tag} className="player-content__tags-item">
                <Typography.Text className="player-content__tags-item-text">
                  {tag}
                </Typography.Text>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.startDate && (
        <Typography.Paragraph className="player-content__date-text">
          <b>Открывается:</b> {data.startDate}
        </Typography.Paragraph>
      )}
      {data.endDate && (
        <Typography.Paragraph className="player-content__date-text">
          <b>Закрывается:</b> {data.endDate}
        </Typography.Paragraph>
      )}
      {data.description && (
        <div className="player-content__description-wrapper">
          <Typography.Title level={2}>Описание события</Typography.Title>
          <Typography.Paragraph>{data.description}</Typography.Paragraph>
        </div>
      )}
      <InteractButton
        eventId={eventId}
        status={data.status}
        startDate={data.startDate}
        endDate={data.endDate}
      />
    </div>
  );
};

export default PlayerContent;
