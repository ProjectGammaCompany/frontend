import { MessageContext } from "@/src/shared/lib";
import { message } from "antd";
import { type ReactNode } from "react";
export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = message.useMessage();

  return (
    <MessageContext value={api}>
      {contextHolder}
      {children}
    </MessageContext>
  );
};
