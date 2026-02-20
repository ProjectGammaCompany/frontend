// eslint-disable-next-line boundaries/element-types, boundaries/entry-point
import type { store } from "@/src/app/providers/reduxProvider/store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
