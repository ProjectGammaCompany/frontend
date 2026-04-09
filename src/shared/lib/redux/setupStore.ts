/* eslint-disable boundaries/dependencies */
import { rootReducer } from "@/app/providers/reduxProvider/store";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "./types";

export function setupStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
