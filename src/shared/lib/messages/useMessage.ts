import { use } from "react";
import { MessageContext } from "./messagesContext";

export const useMessage = () => {
  const ctx = use(MessageContext);
  if (!ctx) {
    throw new Error("Вызов хука должен происходить внутри MessageContext");
  }
  return ctx;
};
