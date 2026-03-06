import { Button } from "antd";
import { useNavigate } from "react-router";
import { useInteractButtonFunctioning } from "../../model/useInteractButtonFunctioning";
import "./InteractButton.scss";
interface InteractButtonProps {
  startDate?: string;
  endDate?: string;
  status: "not started" | "in progress" | "finished";
  eventId: string;
  needGroup: boolean;
  onNeedGroup: () => void;
}

const InteractButton = ({
  eventId,
  status,
  startDate,
  endDate,
  needGroup,
  onNeedGroup,
}: InteractButtonProps) => {
  const navigate = useNavigate();

  const [hidden, disabled] = useInteractButtonFunctioning(
    status,
    startDate,
    endDate,
  );

  const handleClick = () => {
    if (needGroup) {
      onNeedGroup();
      return;
    }
    if (status === "finished") {
      void navigate(`/event/${eventId}/stats`);
      return;
    }
    void navigate(`/event/${eventId}/game`);
  };

  return (
    !hidden && (
      <Button
        disabled={disabled && status != "finished"}
        onClick={handleClick}
        className="interact-btn"
      >
        {status === "not started"
          ? "Начать"
          : status === "in progress"
            ? "Продолжить"
            : "Перейти к результатам"}
      </Button>
    )
  );
};

export default InteractButton;
