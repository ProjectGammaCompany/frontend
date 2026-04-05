// eslint-disable-next-line boundaries/dependencies
import AntConfigProvider from "@/app/providers/antConfigProvider/AntConfigProvider";
import { render } from "@testing-library/react";
import type { JSX } from "react";
import { MemoryRouter } from "react-router";
import { ReactQueryWrapper } from "./ReactQueryWrapper";

export const basicRender = (component: JSX.Element, Stub?: boolean) => {
  if (Stub) {
    render(
      <ReactQueryWrapper>
        <AntConfigProvider>{component}</AntConfigProvider>
      </ReactQueryWrapper>,
    );
  } else {
    render(
      <MemoryRouter>
        <ReactQueryWrapper>
          <AntConfigProvider>{component}</AntConfigProvider>
        </ReactQueryWrapper>
        ,
      </MemoryRouter>,
    );
  }
};
