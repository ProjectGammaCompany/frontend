import { eventNameReducer } from "@/src/entities";
import { taskDataReducer } from "@/src/widgets";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    eventName: eventNameReducer,
    taskData: taskDataReducer,
  },
});
