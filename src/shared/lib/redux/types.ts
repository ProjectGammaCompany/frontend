/* eslint-disable boundaries/dependencies */
import type { rootReducer, store } from "@/app/providers/reduxProvider/store";

export type PreloadedState = Parameters<typeof rootReducer>[0];
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
