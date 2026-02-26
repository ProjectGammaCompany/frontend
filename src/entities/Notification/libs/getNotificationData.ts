import type { NavigateFunction } from "react-router";
import type {
  EventEndExtra,
  EventStartExtra,
  NotificationType,
} from "../api/getNotifications";
import type { NotificationData } from "../ui/NotificationCard/NotificationCard";

const getTimeString = (time: "day" | "hour") => {
  return time === "day" ? "1 день" : "1 час";
};

const handleClick = (
  type: NotificationType,
  extra: object,
  navigate: NavigateFunction,
) => {
  if (type === "eventEnd") {
    const preparedExtra = extra as EventEndExtra;
    if (preparedExtra.timeLeft) {
      navigate(`event/${preparedExtra.id}/game`);
    }
    if (preparedExtra.notStartedFavorite) {
      navigate(`event/${preparedExtra.id}`);
    }
    navigate(`event/${preparedExtra.id}/stats`);
  } else {
    const preparedExtra = extra as EventStartExtra;
    navigate(`event/${preparedExtra.id}/game`);
  }
};

const getEndEventData = (
  extra: EventEndExtra,
  navigate: NavigateFunction,
): NotificationData => {
  if (extra.notStartedFavorite) {
    if (extra.timeLeft) {
      return {
        header:
          "Избранное событие закончится через " + getTimeString(extra.timeLeft),
        body: `Событие \"${extra.eventName}\" закончится через ${getTimeString(extra.timeLeft)}. Успейте в нём поучаствовать, нажав на уведомление! `,
        onClick: () => handleClick("eventEnd", extra, navigate),
      };
    }
    return {
      header: "Избранное событие завершено",
      body: `Событие \"${extra.eventName}\" завершено. Ознакомьтесь с ним, нажав на уведомление!`,
      onClick: () => handleClick("eventEnd", extra, navigate),
    };
  }
  if (extra.timeLeft) {
    return {
      header:
        "Проходимое вами событие закончится через " +
        getTimeString(extra.timeLeft),
      body: `Событие \"${extra.eventName}\" закончится через ${getTimeString(extra.timeLeft)}. Успейте его завершить, нажав на уведомление! `,
      onClick: () => handleClick("eventEnd", extra, navigate),
    };
  }
  return {
    header: "Проходимое вами событие завершилось",
    body: `Событие \"${extra.eventName}\" завершилось. Просмотрите свои результаты, нажав на уведомление! `,
    onClick: () => handleClick("eventEnd", extra, navigate),
  };
};

export const getNotificationData = (
  type: NotificationType,
  extra: object,
  navigate: NavigateFunction,
) => {
  const notificationData: Record<NotificationType, NotificationData> = {
    eventStart: {
      header: "Избранное событие начнётся через 5 минут",
      body: `Событие \"${(extra as EventStartExtra).eventName}\" начнётся через 5 минут. Нажмите на уведомление для перехода к нему.`,
      onClick: () => handleClick("eventEnd", extra, navigate),
    },
    eventEnd: getEndEventData(extra as EventEndExtra, navigate),
  };
  return notificationData[type];
};
