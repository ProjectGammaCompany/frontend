import {
  getEventsHistory,
  getFavoritesEvents,
  getUserEvents,
  usePersonalEvents,
  type QueryFnType,
} from "@/src/entities";
import { LinkEventCard } from "@/src/widgets";
import { Spin, Typography } from "antd";
import { useOnInView } from "react-intersection-observer";

type ListType = "userEvents" | "favorites" | "eventsHistory";
interface UserEventsListProps {
  triggerLoading: boolean;
  listType: ListType;
}

const UserEventsList = ({ triggerLoading, listType }: UserEventsListProps) => {
  const queryFunctions: Record<ListType, QueryFnType> = {
    userEvents: getUserEvents,
    favorites: getFavoritesEvents,
    eventsHistory: getEventsHistory,
  };

  const queryKeys: Record<ListType, string[]> = {
    userEvents: ["userEvents"],
    favorites: ["favoritesEvents"],
    eventsHistory: ["eventsHistory"],
  };

  const { data, isFetching, error, hasNextPage, fetchNextPage } =
    usePersonalEvents(
      triggerLoading,
      queryKeys[listType],
      queryFunctions[listType],
    );

  const inViewRef = useOnInView((inView) => {
    if (inView && !isFetching && hasNextPage) {
      void fetchNextPage();
    }
  });
  return (
    <div>
      <div>
        {data?.pages.map((page) => {
          return page.data.events.map((card) => (
            <LinkEventCard
              key={card.id}
              title={card.title}
              id={card.id}
              description={card.description}
              cover={card.cover}
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
          {error && <Typography>Возникла ошибка</Typography>}
        </div>
      )}
      <div ref={inViewRef} className="home-page__intersection-observer" />
    </div>
  );
};

export default UserEventsList;
