import { useRole } from "@/src/entities";
import { BackSvg, Header, Logo } from "@/src/shared/ui";
import { EventHeader } from "@/src/widgets";
import { Button, Flex, Skeleton, Spin, Typography } from "antd";
import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import MainContent from "../MainContent/MainContent";
import "./EventPage.scss";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { data, isError, isPending, refetch, error } = useRole(eventId);

  const getErrorBlock = (status: number) => {
    switch (status) {
      case 404:
        return (
          <Typography.Paragraph type="danger">
            Несуществующее событие
          </Typography.Paragraph>
        );
      case 403:
        return (
          <Typography.Paragraph type="danger">Нет доступа</Typography.Paragraph>
        );
      default:
        return (
          <>
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
          </>
        );
    }
  };

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
            <Skeleton.Input active />
          </div>
        </Header>
        <Flex align="center" justify="center" vertical>
          <Spin />
        </Flex>
      </>
    );
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
          {isAxiosError(error) && error.response ? (
            getErrorBlock(error.response.status)
          ) : (
            <>
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
            </>
          )}
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
