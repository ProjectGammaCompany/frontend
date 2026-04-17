import {
  getEventsHistory,
  getFavoritesEvents,
  getUserEvents,
  usePersonalEvents,
  type QueryFnType,
} from "@/entities";
import { getFullFileUrl, getImgUrl } from "@/shared/lib";
import { LinkEventCard } from "@/widgets";
import { Button, Flex, Spin, Typography } from "antd";
import { useOnInView } from "react-intersection-observer";
import "./UserEventsList.scss";

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
      <div className="user-events-list__card-list">
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
        <Flex justify="center">
          {isFetching && !error && <Spin />}
          {error && (
            <Flex justify="center" vertical>
              <Typography.Paragraph type="danger">
                Произошла ошибка
              </Typography.Paragraph>
              <Button onClick={() => void fetchNextPage()}>Обновить</Button>
            </Flex>
          )}
        </Flex>
      )}
      <div ref={inViewRef} className="home-page__intersection-observer" />
    </div>
  );
};

export default UserEventsList;
