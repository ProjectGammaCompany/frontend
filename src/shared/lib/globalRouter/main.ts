import type { NavigateFunction } from "react-router";

export const globalRouter = { navigate: null } as {
  navigate: null | NavigateFunction;
};
