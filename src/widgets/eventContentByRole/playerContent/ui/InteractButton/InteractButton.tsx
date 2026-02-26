import { Button } from "antd";
import { useNavigate } from "react-router";
import { useInteractButtonFunctioning } from "../../model/useInteractButtonFunctioning";

interface InteractButtonProps {
  startDate?: string;
  endDate?: string;
  status: "not started" | "in progress" | "finished";
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
    if (status === "finished") {
      void navigate(`/event/${eventId}/results`);
      return;
    }
    void navigate(`/event/${eventId}/game`);
  };

  return (
    !hidden && (
      <Button disabled={disabled && status != "finished"} onClick={handleClick}>
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
