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
  extra: EventStartExtra | EventEndExtra,
  navigate: NavigateFunction,
) => {
  if (type === "eventEnd") {
    const preparedExtra = extra as EventEndExtra;
    if (preparedExtra.timeLeft) {
      void navigate(`/event/${preparedExtra.id}/game`);
      return;
    }
    if (preparedExtra.notStartedFavorite) {
      void navigate(`/event/${preparedExtra.id}`);
      return;
    }
    void navigate(`/event/${preparedExtra.id}/stats`);
  } else {
    const preparedExtra = extra as EventStartExtra;
    void navigate(`/event/${preparedExtra.id}`);
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
        body: `Событие "${extra.eventName}" закончится через ${getTimeString(extra.timeLeft)}. Успейте в нём поучаствовать, нажав на уведомление! `,
        onClick: () => handleClick("eventEnd", extra, navigate),
      };
    }
    return {
      header: "Избранное событие завершено",
      body: `Событие "${extra.eventName}" завершено. Ознакомьтесь с ним, нажав на уведомление!`,
      onClick: () => handleClick("eventEnd", extra, navigate),
    };
  }
  if (extra.timeLeft) {
    return {
      header:
        "Проходимое вами событие закончится через " +
        getTimeString(extra.timeLeft),
      body: `Событие "${extra.eventName}" закончится через ${getTimeString(extra.timeLeft)}. Успейте его завершить, нажав на уведомление! `,
      onClick: () => handleClick("eventEnd", extra, navigate),
    };
  }
  return {
    header: "Проходимое вами событие завершилось",
    body: `Событие "${extra.eventName}" завершилось. Просмотрите свои результаты, нажав на уведомление! `,
    onClick: () => handleClick("eventEnd", extra, navigate),
  };
};

export const getNotificationData = (
  type: NotificationType,
  extra: EventEndExtra | EventStartExtra,
  navigate: NavigateFunction,
) => {
  const notificationData: Record<NotificationType, NotificationData> = {
    favoriteEventStart: {
      header: "Избранное событие начнётся через 5 минут",
      body: `Событие "${(extra as EventStartExtra).eventName}" начнётся через 5 минут. Нажмите на уведомление для перехода к нему.`,
      onClick: () => handleClick(type, extra, navigate),
    },
    eventEnd: getEndEventData(extra as EventEndExtra, navigate),
  };
  return notificationData[type];
};
