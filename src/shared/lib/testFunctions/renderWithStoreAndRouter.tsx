import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";

// eslint-disable-next-line boundaries/dependencies
import AntConfigProvider from "@/app/providers/antConfigProvider/AntConfigProvider";
import { MemoryRouter } from "react-router";
import { setupStore } from "../redux/setupStore";
import type { AppStore, PreloadedState } from "../redux/types";
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
        <MemoryRouter>
          <ReactQueryWrapper>
            <Provider store={store}>
              <AntConfigProvider>{children}</AntConfigProvider>
            </Provider>
          </ReactQueryWrapper>
        </MemoryRouter>
      );
    }
    return (
      <ReactQueryWrapper>
        <Provider store={store}>
          <AntConfigProvider>{children}</AntConfigProvider>
        </Provider>
      </ReactQueryWrapper>
    );
  };

  // Return an object with the store, user, and all of RTL's query functions
  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
