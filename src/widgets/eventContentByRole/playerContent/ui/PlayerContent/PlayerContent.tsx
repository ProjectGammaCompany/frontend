import { getPlayerInfo, useRateEvent } from "@/entities";
import { JoinGroupWindow, ToggleFavoriteEventButton } from "@/features";
import { getFullFileUrl, Seo, useNotify } from "@/shared/lib";
import { DefaultEventCoverSvg } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Rate, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InteractButton from "../InteractButton/InteractButton";
import "./PlayerContent.scss";

interface ParticipantContentProps {
  eventId: string;
}

const PlayerContent = ({ eventId }: ParticipantContentProps) => {
  const navigate = useNavigate();
  const notify = useNotify();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [eventId, "playerInfo"],
    queryFn: () => getPlayerInfo(eventId),
    select: (data) => {
      return data.data;
    },
  });

  const [openLoginGroupWindow, setOpenLoginGroupWindow] = useState(false);

  const [rated, setRated] = useState(true);

  const [rate, setRate] = useState<undefined | number>(undefined);

  const handleRateSuccess = () => {
    notify.success({
      title: "Оценка отправлена",
      description: "Благодарим за оценку!",
    });
    setRated(true);
  };

  const handleRateError = () => {
    notify.error({
      title: "Не удалось оценить событие",
      description: "Произошла ошибка. Оцените событие позднее.",
    });
  };

  const rateEventMutation = useRateEvent(
    eventId,
    handleRateSuccess,
    handleRateError,
  );

  const handleSubmitRateBtn = () => {
    if (typeof rate === "number") {
      rateEventMutation.mutate(rate);
    }
  };

  useEffect(() => {
    if (data) {
      setRated(data.rated);
    }
  }, [data]);

  if (isPending) {
    return (
      <Flex justify="center">
        <Spin />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex align="center" justify="center" vertical>
        <Typography.Paragraph type="danger">
          Произошла ошибка, обновите страницу
        </Typography.Paragraph>
        <Button
          onClick={() => {
            void refetch();
          }}
        >
          Обновить
        </Button>
      </Flex>
    );
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.title,
    description: data.description,
    image: data.cover ? getFullFileUrl(data.cover) : undefined,
    startDate: data.startDate,
    endDate: data.endDate,
    url: `https://hse-eduplay.ru/event/${eventId}`,
  };

  return (
    <div className="player-content">
      <Seo
        title="Событие"
        description={`Информация о событии ${data.title}.`}
        canonical={`event/${eventId}`}
        schemaMarkup={schemaMarkup}
      />
      <Typography.Title level={1} className="player-content__title">
        {data.title}
      </Typography.Title>
      <div className="player-content__specific-data">
        {data.cover ? (
          <img
            src={getFullFileUrl(data.cover ?? "")}
            alt="Обложка события"
            className="player-content__cover"
          />
        ) : (
          <div className="player-content__cover">
            <DefaultEventCoverSvg />
          </div>
        )}
        <div className="player-content__col">
          <ToggleFavoriteEventButton
            defaultState={data.favorite}
            id={eventId}
          />
          <Flex vertical gap={20}>
            <Typography.Text>
              <b>Рейтинг:</b> <strong>{data.rate} / 5</strong>
            </Typography.Text>
            {!rated && data.status === "finished" && (
              <Flex vertical gap={10} align="stretch">
                <Rate value={rate} onChange={(value) => setRate(value)} />
                <Button
                  disabled={typeof rate != "number"}
                  loading={rateEventMutation.isPending}
                  onClick={handleSubmitRateBtn}
                  className="player-content__rate-btn"
                >
                  Оценить событие
                </Button>
              </Flex>
            )}
          </Flex>
        </div>
      </div>
      {data.tags.length > 0 && (
        <div className="player-content__tags-wrapper">
          <Typography.Title level={2}>Теги</Typography.Title>
          <ul className="player-content__tags">
            {data.tags.map((tag) => (
              <li key={tag.id} className="player-content__tags-item">
                <Typography.Text className="player-content__tags-item-text">
                  {tag.name}
                </Typography.Text>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.startDate && (
        <Typography.Paragraph className="player-content__date-text">
          <b>Открывается:</b>{" "}
          {data.startDate.slice(0, data.startDate.length - 7)}
        </Typography.Paragraph>
      )}
      {data.endDate && (
        <Typography.Paragraph className="player-content__date-text">
          <b>Закрывается:</b> {data.endDate.slice(0, data.endDate.length - 7)}
        </Typography.Paragraph>
      )}
      {data.description && (
        <div className="player-content__description-wrapper">
          <Typography.Title level={2} className="player-content__title">
            Описание события
          </Typography.Title>
          <Typography.Paragraph className="player-content__description">
            {data.description}
          </Typography.Paragraph>
        </div>
      )}
      <div className="player-content__interact-btn-wrapper">
        <InteractButton
          eventId={eventId}
          status={data.status}
          startDate={data.startDate}
          endDate={data.endDate}
          needGroup={data.needGroup}
          onNeedGroup={() => {
            setOpenLoginGroupWindow(true);
          }}
        />
      </div>
      <JoinGroupWindow
        eventId={eventId}
        open={openLoginGroupWindow}
        setIsOpen={setOpenLoginGroupWindow}
        onSuccess={() => {
          void navigate(`/event/${eventId}/game`);
        }}
      />
    </div>
  );
};

export default PlayerContent;
