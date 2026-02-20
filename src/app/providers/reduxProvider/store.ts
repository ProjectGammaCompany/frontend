import { eventNameReducer } from "@/src/entities";
import { conditionDataReducer, taskDataReducer } from "@/src/pages/event";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    eventName: eventNameReducer,
    taskData: taskDataReducer,
    conditionData: conditionDataReducer,
  },
});
