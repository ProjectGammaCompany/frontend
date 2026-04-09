import { render, type RenderOptions } from "@testing-library/react";
import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";

// eslint-disable-next-line boundaries/dependencies
import AntConfigProvider from "@/app/providers/antConfigProvider/AntConfigProvider";
// eslint-disable-next-line boundaries/dependencies
import { MessageProvider } from "@/app/providers/messageProvider/messageProvider";
// eslint-disable-next-line boundaries/dependencies
import { NotificationProvider } from "@/app/providers/notificationProvider/notificationProvider";
import { MemoryRouter } from "react-router";
import type { AppStore, PreloadedState } from "../redux";
import { setupStore } from "../redux/setupStore";
import { ReactQueryWrapper } from "./ReactQueryWrapper";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as preloadedState, store.
interface ExtendedRenderOptions
  extends Omit<RenderOptions, "queries" | "wrapper"> {
  preloadedState?: PreloadedState;
  store?: AppStore;
}

export function renderWithStoreAndRouter(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
  Stub?: boolean,
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    if (Stub) {
      return (
        <ReactQueryWrapper>
          <Provider store={store}>
            <AntConfigProvider>
              <NotificationProvider>
                <MessageProvider>{children}</MessageProvider>
              </NotificationProvider>
            </AntConfigProvider>
          </Provider>
        </ReactQueryWrapper>
      );
    }
    return (
      <MemoryRouter>
        <ReactQueryWrapper>
          <Provider store={store}>
            <AntConfigProvider>
              <NotificationProvider>
                <MessageProvider>{children}</MessageProvider>
              </NotificationProvider>
            </AntConfigProvider>
          </Provider>
        </ReactQueryWrapper>
      </MemoryRouter>
    );
  };

  const screen = render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    store,
    ...screen,
  };
}
