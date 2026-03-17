import { useTitle } from "@/src/shared/lib";
import { BackSvg, Header, Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGameData } from "../../model/useGameData";
import BlockStageContent from "../BlockStageContent/BlockStageContent";
import EndGameContent from "../EndGameContent/EndGameContent";
import TaskStageContent from "../TaskStageContent/TaskStageContent";
import "./GamePage.scss";
const GamePage = () => {
  useTitle("Прохождение события");
  const { eventId } = useParams();

  const navigate = useNavigate();

  const { data, isPending, isError } = useGameData(eventId);

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
    <>
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
      <main>
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
