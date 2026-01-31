import { BackSvg, Header, Logo } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import { getNextStage } from "../../api";
import BlockStageContent from "../BlockStageContent/BlockStageContent";
import EndGameContent from "../EndGameContent/EndGameContent";
import TaskStageContent from "../TaskStageContent/TaskStageContent";
import "./GamePage.scss";
const GamePage = () => {
  const { eventId } = useParams();

  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: [eventId, "game"],
    queryFn: () => {
      if (eventId) {
        return getNextStage(eventId);
      }
      return Promise.reject(Error("Некорректный id"));
    },
    select: (data) => data.data,
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
  }

  if (data.type === "end") {
    return <EndGameContent eventId={eventId!} />;
  }

  return (
    <div>
      <Header>
        <div className="game-page-header__content">
          <div
            className="game-page-header__icons-wrapper"
            onClick={() => void navigate("/")}
          >
            <BackSvg classname="game-page-header__back-icon" />
            <Logo />
          </div>
          <Typography.Title level={1} className="game-page-header__title">
            Прохождение
          </Typography.Title>
        </div>
      </Header>
      {data.type === "block" ? (
        <BlockStageContent key={data.block.id} block={data} />
      ) : (
        <TaskStageContent
          key={data.task.id}
          defaultTask={data.task}
          eventId={eventId!}
        />
      )}
    </div>
  );
};

export default GamePage;
