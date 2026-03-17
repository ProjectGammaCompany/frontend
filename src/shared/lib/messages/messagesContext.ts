import type { message } from "antd";
import { createContext } from "react";

export type MessageApi = ReturnType<typeof message.useMessage>[0];

export const MessageContext = createContext<MessageApi | null>(null);
