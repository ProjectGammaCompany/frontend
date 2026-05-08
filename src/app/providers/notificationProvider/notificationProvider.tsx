import { NotificationContext } from "@/shared/lib/notifications";
import { notification } from "antd";
import type { ReactNode } from "react";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext value={api}>
      {contextHolder}
      {children}
    </NotificationContext>
  );
};
