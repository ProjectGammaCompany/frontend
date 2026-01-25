import { getEvents, type getEventsResponse } from "@/src/entities";
import { LinkEventCard } from "@/src/widgets";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { Spin, Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useOnInView } from "react-intersection-observer";
import "./EventList.scss";
export interface Filters {
  tags?: string[];
  decliningRating: boolean;
  territorialized: boolean;
  active: boolean;
}
export interface EventsListProps {
  filters: Filters;
}

type EventsResponse = AxiosResponse<getEventsResponse>;

const EventsList = ({ filters }: EventsListProps) => {
  const { data, hasNextPage, isFetching, fetchNextPage, error } =
    useInfiniteQuery<
      EventsResponse,
      Error,
      InfiniteData<EventsResponse>,
      ["allEvents"],
      number
    >({
      queryKey: ["allEvents"],
      queryFn: ({ pageParam }) =>
        getEvents({
          ...filters,
          page: pageParam,
          maxOnPage: 10,
        }),
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.data.info.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
      initialPageParam: 0,
    });

  const inViewRef = useOnInView((inView) => {
    if (inView && !isFetching && hasNextPage) {
      void fetchNextPage();
    }
  });

  return (
    <div className="home-page__events-list-wrapper">
      <div className="home-page__events-list">
        {data?.pages.map((page) => {
          return page.data.info.map((card) => (
            <LinkEventCard
              key={card.id}
              title={card.title}
              id={card.id}
              description={card.description}
              cover={card.cover}
              rating={card.rating}
              favorite={card.favorite}
              tags={card.tags}
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
