import { queryClient } from "@/src/shared/api";
import { getFullFileUrl } from "@/src/shared/lib";
import { LinkEventCard } from "@/src/widgets";
import { Spin, Typography } from "antd";
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
      queryKey: ["allEvents"],
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
              cover={getFullFileUrl(card.cover)}
              rating={card.rating}
              favorite={card.favorite}
              tags={card.tags.map((t) => t.name)}
            />
          ));
        })}
      </div>
      {(isFetching || error) && (
        <div className="home-page__spin-wrapper">
          {isFetching && !error && <Spin />}
          {error && <Typography>Возникла ошибка</Typography>}
        </div>
      )}
      <div ref={inViewRef} className="home-page__intersection-observer" />
    </div>
  );
};

export default EventsList;
