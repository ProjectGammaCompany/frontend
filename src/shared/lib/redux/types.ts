/* eslint-disable boundaries/dependencies */
import type { store } from "@/src/app/providers/reduxProvider/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
