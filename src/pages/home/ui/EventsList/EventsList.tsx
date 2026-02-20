import { LinkEventCard } from "@/src/widgets";
import { Spin, Typography } from "antd";
import { useOnInView } from "react-intersection-observer";
import { useAllEvents, type Filters } from "../../model/useAllEvents";
import "./EventList.scss";

//todo: добавить favorites
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
              cover={card.cover}
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
