import { BackSvg, Header, Logo } from "@/src/shared/ui";
import { EventHeader } from "@/src/widgets";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import { getRole } from "../../api";
import MainContent from "../MainContent/MainContent";
import "./EventPage.scss";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => {
      if (eventId) {
        return getRole(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    staleTime: 0,
    select: (data) => data.data.role,
  });

  if (!eventId) {
    return (
      <Flex vertical align="center" justify="center">
        <Typography.Paragraph type="danger">
          Некорректная страница
        </Typography.Paragraph>
        <Button
          onClick={() => {
            void navigate("/");
          }}
        >
          Вернуться на главную страницу
        </Button>
      </Flex>
    );
  }

  if (isPending) {
    return <Spin fullscreen />;
  }

  if (isError) {
    return (
      <>
        <Header>
          <div className="event-page__error-header-content">
            <div
              className="event-page__icons-wrapper"
              onClick={() => void navigate("/")}
            >
              <BackSvg classname="event-page__back-icon" />
              <Logo className="event-page__logo" />
            </div>
            <Typography.Text className="event-page__error-text">
              Ошибка!
            </Typography.Text>
          </div>
        </Header>
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
      </>
    );
  }

  return (
    <>
      <EventHeader role={data} eventId={eventId} />
      <MainContent eventId={eventId} role={data} />
    </>
  );
};

export default EventPage;
