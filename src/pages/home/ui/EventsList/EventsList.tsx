import { queryClient } from "@/shared/api";
import { getFullFileUrl, getImgUrl } from "@/shared/lib";

import { eventQueries } from "@/entities/Event";
import { LinkEventCard } from "@/widgets/linkEventCard";
import { Button, Flex, Spin, Typography } from "antd";
import { useEffect } from "react";
import { useOnInView } from "react-intersection-observer";
import { useAllEvents, type Filters } from "../../model/useAllEvents";
import "./EventList.scss";

export interface EventsListProps {
  filters: Filters;
}

const EventsList = ({ filters }: EventsListProps) => {
  const { data, hasNextPage, isFetching, fetchNextPage, error } =
    useAllEvents(filters);

  const inViewRef = useOnInView((inView) => {
    if (inView && !isFetching && hasNextPage) {
      void fetchNextPage();
    }
  });

  useEffect(() => {
    void queryClient.invalidateQueries({
      queryKey: eventQueries.getEvents(),
    });
  }, [filters]);

  return (
    <div className="home-page__events-list-wrapper">
      <div className="home-page__events-list">
        {data?.pages.map((page) => {
          return page.data.events.map((card) => (
            <LinkEventCard
              key={card.id}
              title={card.title}
              id={card.id}
              description={card.description}
              cover={
                card.cover
                  ? getFullFileUrl(getImgUrl(card.cover, "m"))
                  : undefined
              }
              rating={card.rate}
              favorite={card.favorite}
              tags={card.tags.map((t) => t.name)}
            />
          ));
        })}
      </div>
      {(isFetching || error) && (
        <div className="home-page__spin-wrapper">
          {isFetching && !error && <Spin />}
          {error && (
            <Flex justify="center" vertical>
              <Typography.Paragraph
                type="danger"
                className="events-list__error"
              >
                Возникла ошибка при загрузке
              </Typography.Paragraph>
              <Button
                onClick={() => {
                  void fetchNextPage();
                }}
              >
                Обновить
              </Button>
            </Flex>
          )}
        </div>
      )}
      <div ref={inViewRef} className="home-page__intersection-observer" />
    </div>
  );
};

export default EventsList;
