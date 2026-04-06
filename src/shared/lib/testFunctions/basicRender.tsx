// eslint-disable-next-line boundaries/dependencies
import AntConfigProvider from "@/app/providers/antConfigProvider/AntConfigProvider";
// eslint-disable-next-line boundaries/dependencies
import { MessageProvider } from "@/app/providers/messageProvider/messageProvider";
// eslint-disable-next-line boundaries/dependencies
import { NotificationProvider } from "@/app/providers/notificationProvider/notificationProvider";
import { render } from "@testing-library/react";
import type { JSX } from "react";
import { MemoryRouter } from "react-router";
import { ReactQueryWrapper } from "./ReactQueryWrapper";

export const basicRender = (component: JSX.Element, Stub?: boolean) => {
  if (Stub) {
    render(
      <ReactQueryWrapper>
        <AntConfigProvider>
          <NotificationProvider>
            <MessageProvider>{component}</MessageProvider>
          </NotificationProvider>
        </AntConfigProvider>
      </ReactQueryWrapper>,
    );
  } else {
    render(
      <MemoryRouter>
        <ReactQueryWrapper>
          <AntConfigProvider>
            <NotificationProvider>
              <MessageProvider>{component}</MessageProvider>
            </NotificationProvider>
          </AntConfigProvider>
        </ReactQueryWrapper>
        ,
      </MemoryRouter>,
    );
  }
};
