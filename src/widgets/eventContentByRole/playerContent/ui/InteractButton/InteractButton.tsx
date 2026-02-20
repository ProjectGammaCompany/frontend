import { Button } from "antd";
import { useNavigate } from "react-router";
import { useInteractButtonFunctioning } from "../../model/useInteractButtonFunctioning";

interface InteractButtonProps {
  startDate?: string;
  endDate?: string;
  status: "notStarted" | "started" | "ended";
  eventId: string;
}

const InteractButton = ({
  eventId,
  status,
  startDate,
  endDate,
}: InteractButtonProps) => {
  const navigate = useNavigate();

  const [hidden, disabled] = useInteractButtonFunctioning(
    status,
    startDate,
    endDate,
  );

  const handleClick = () => {
    if (status === "ended") {
      void navigate(`/event/${eventId}/results`);
      return;
    }
    void navigate(`/event/${eventId}/game`);
  };

  return (
    !hidden && (
      <Button disabled={disabled && status != "ended"} onClick={handleClick}>
        {status === "notStarted"
          ? "Начать"
          : status === "started"
            ? "Продолжить"
            : "Перейти к результатам"}
      </Button>
    )
  );
};

export default InteractButton;
