import dayjs from "dayjs";
import { useEffect, useState } from "react";
export const useInteractButtonFunctioning = (
  status: "not started" | "in progress" | "finished",
  startDate?: string,
  endDate?: string,
) => {
  const [disabled, setDisabled] = useState(true);

  const [hidden, setIsHidden] = useState(false);

  useEffect(() => {
    const initialDate = dayjs(Date.now());
    let startInterval = 0;
    let endInterval = 0;

    if (status != "finished") {
      if (!startDate && !endDate) {
        setDisabled(false);
        return;
      }

      if (startDate) {
        const parsedStartDate = dayjs(startDate, "DD.MM.YYYY HH:mm").tz(
          "Europe/Moscow",
        );
        if (initialDate < parsedStartDate) {
          startInterval = window.setInterval(() => {
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
          endInterval = window.setInterval(() => {
            const date = dayjs(Date.now());
            if (date >= parsedEndDate) {
              if (status === "not started") {
                setIsHidden(true);
                setDisabled(true);
              }
              clearInterval(endInterval);
            }
          }, 1000);
        } else {
          if (status === "not started") {
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

  return [hidden, disabled];
};
