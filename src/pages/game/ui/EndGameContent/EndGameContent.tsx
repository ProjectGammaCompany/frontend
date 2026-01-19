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
  }, [eventId, navigate]);

  useEffect(() => {
    const el = document.getElementById("root-layout");

    if (el) {
      el.classList.toggle("root-layout_on-end-game-stage");
    }

    return () => {
      if (el) {
        el.classList.toggle("root-layout_on-end-game-stage");
      }
    };
  }, []);

  return (
    <div className="end-game-content">
      <Typography.Title level={1} className="end-game-content__text">
        Событие пройдено!
      </Typography.Title>
      <Typography.Title
        level={2}
        className="end-game-content__text end-game-content__text-congrats"
      >
        Поздравляем!
      </Typography.Title>
    </div>
  );
};

export default EndGameContent;
