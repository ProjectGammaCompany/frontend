import { use } from "react";
import { NotificationContext } from "./notificationContext";

export const useNotify = () => {
  const ctx = use(NotificationContext);
  if (!ctx) {
    throw new Error("Вызов хука должен происходить внутри NotificationContext");
  }
  return ctx;
};
