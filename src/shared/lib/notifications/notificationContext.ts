import type { notification } from "antd";
import { createContext } from "react";

export type NotificationApi = ReturnType<
  typeof notification.useNotification
>[0];

export const NotificationContext = createContext<NotificationApi | null>(null);
