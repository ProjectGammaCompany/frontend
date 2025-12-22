import { EventHeader } from "@/src/widgets";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getRole } from "../../api";
import MainContent from "../MainContent/MainContent";

const EventPage = () => {
  const { eventId } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => {
      if (eventId) {
        return getRole(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    select: (data) => data.data.role,
  });

  if (!eventId) {
    return <div>Некорректная страница</div>;
  }

  if (isPending) {
    return <div>Загрузка</div>;
  }

  if (isError) {
    return <div>Ошибка на стороне сервера</div>;
  }
  return (
    <>
      <EventHeader role={data} eventId={eventId} />
      <MainContent eventId={eventId} role={data} />
    </>
  );
};

export default EventPage;
