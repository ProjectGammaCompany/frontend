import dayjs from "dayjs";
import { useEffect, useState } from "react";
export const useInteractButtonFunctioning = (
  status: "not started" | "in progress" | "finished",
  startDate?: string,
  endDate?: string,
) => {
  const [disabled, setDisabled] = useState(true);

  const [hidden, setIsHidden] = useState(true);

  useEffect(() => {
    const initialDate = dayjs(Date.now());
    let startInterval = 0;
    let endInterval = 0;
    let hiddenState = true;
    let disabledState = true;

    if (status == "not started") {
      if (!startDate && !endDate) {
        setDisabled(false);
        setIsHidden(false);
        return;
      }

      if (startDate) {
        const parsedStartDate = dayjs(startDate, "DD.MM.YYYY HH:mm").tz(
          "Europe/Moscow",
        );
        if (initialDate < parsedStartDate) {
          hiddenState = false;
          startInterval = window.setInterval(() => {
            const date = dayjs(Date.now());
            if (date >= parsedStartDate) {
              setDisabled(false);
              clearInterval(startInterval);
            }
          }, 1000);
        } else {
          hiddenState = false;
          disabledState = false;
        }
      }

      if (endDate) {
        const parsedEndDate = dayjs(endDate, "DD.MM.YYYY HH:mm").tz(
          "Europe/Moscow",
        );
        if (initialDate < parsedEndDate) {
          if (!startDate) {
            hiddenState = false;
            disabledState = false;
          }
          endInterval = window.setInterval(() => {
            const date = dayjs(Date.now());
            if (date >= parsedEndDate) {
              setIsHidden(true);
              setDisabled(true);
              clearInterval(endInterval);
            }
          }, 1000);
        } else {
          disabledState = true;
          hiddenState = true;
        }
      }
    } else {
      disabledState = false;
      hiddenState = false;
    }

    setDisabled(disabledState);
    setIsHidden(hiddenState);

    return () => {
      clearInterval(startInterval);
      clearInterval(endInterval);
    };
  }, [startDate, endDate, status]);

  return [hidden, disabled];
};
