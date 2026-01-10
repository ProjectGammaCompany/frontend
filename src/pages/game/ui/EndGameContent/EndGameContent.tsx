import { Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./EndGameContent.scss";

interface EndGameContentProps {
  eventId: string;
}
const EndGameContent = ({ eventId }: EndGameContentProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      void navigate(`/event/${eventId}/stats`);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="end-game-content">
      <Typography.Title level={1} className="end-game-content__text">
        Событие пройдено!
      </Typography.Title>
      <Typography.Title level={2} className="end-game-content__text">
        Поздравляем!
      </Typography.Title>
    </div>
  );
};

export default EndGameContent;
