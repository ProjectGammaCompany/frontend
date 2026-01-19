import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const [hidden, setIsHidden] = useState(false);

  const handleClick = () => {
    if (status === "ended") {
      void navigate(`/event/${eventId}/results`);
      return;
    }
    void navigate(`/event/${eventId}/game`);
  };

  useEffect(() => {
    const initialDate = dayjs(Date.now());
    let startInterval = 0;
    let endInterval = 0;

    if (status != "ended") {
      if (!startDate && !endDate) {
        setDisabled(false);
        return;
      }

      if (startDate) {
        const parsedStartDate = dayjs(startDate, "DD.MM.YYYY HH:mm").tz(
          "Europe/Moscow",
        );
        if (initialDate < parsedStartDate) {
          startInterval = setInterval(() => {
            const date = dayjs(Date.now());
            if (date >= parsedStartDate) {
              setDisabled(false);
              clearInterval(startInterval);
            }
          }, 1000);
        } else {
          setDisabled(false);
        }
      }

      if (endDate) {
        const parsedEndDate = dayjs(endDate, "DD.MM.YYYY HH:mm").tz(
          "Europe/Moscow",
        );
        if (initialDate < parsedEndDate) {
          if (!startDate) {
            setDisabled(false);
          }
          endInterval = setInterval(() => {
            const date = dayjs(Date.now());
            if (date >= parsedEndDate) {
              setDisabled(true);
              if (status === "notStarted") {
                setIsHidden(true);
              }
              clearInterval(endInterval);
            }
          }, 1000);
        } else {
          if (status === "notStarted") {
            setIsHidden(true);
          }
          setDisabled(true);
        }
      }
    }

    return () => {
      clearInterval(startInterval);
      clearInterval(endInterval);
    };
  }, [startDate, endDate, status]);

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
