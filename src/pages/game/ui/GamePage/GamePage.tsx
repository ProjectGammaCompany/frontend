import { Seo } from "@/shared/lib/seo";
import { Header } from "@/shared/ui/Header";
import { Logo } from "@/shared/ui/Logo";
import { BackSvg } from "@/shared/ui/svg";
import { Button, Flex, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGameData } from "../../model/useGameData";
import BlockStageContent from "../BlockStageContent/BlockStageContent";
import EndGameContent from "../EndGameContent/EndGameContent";
import TaskStageContent from "../TaskStageContent/TaskStageContent";
import "./GamePage.scss";
const GamePage = () => {
  const { eventId } = useParams();

  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useGameData(eventId);

  if (isPending) {
    return (
      <>
        <Flex
          align="center"
          justify="center"
          vertical
          className="game-page__loading-content"
        >
          <Spin />
        </Flex>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header>
          <div className="game-page-header__content">
            <div
              className="game-page-header__icons-wrapper"
              onClick={() => void navigate(`/event/${eventId}`)}
            >
              <BackSvg classname="game-page-header__back-icon" />
              <Logo className="game-page-header__logo" />
            </div>
            <Typography.Text className="game-page-header__error-text">
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

  if (data.type === "end") {
    return <EndGameContent eventId={eventId!} />;
  }

  return (
    <>
      <Header>
        <Seo
          title="Прохождение"
          description="Страница прохождения события."
          canonical={`event/${eventId}/game`}
          noIndex
        />
        <div className="game-page-header__content">
          <div
            className="game-page-header__icons-wrapper"
            onClick={() => void navigate(`/event/${eventId}`)}
          >
            <BackSvg classname="game-page-header__back-icon" />
            <Logo className="game-page-header__logo" />
          </div>
          <Typography.Title level={1} className="game-page-header__title">
            Прохождение
          </Typography.Title>
        </div>
      </Header>
      <main className="game-page__main">
        {data.type === "block" ? (
          <BlockStageContent
            key={data.block.blockId}
            blockStageData={data}
            eventId={eventId!}
          />
        ) : (
          <TaskStageContent
            key={data.task.taskId}
            defaultTask={data.task}
            eventId={eventId!}
          />
        )}
      </main>
    </>
  );
};

export default GamePage;
