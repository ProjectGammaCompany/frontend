import {
  blockReorderingReducer,
  eventNameReducer,
  tasksReorderingReducer,
} from "@/src/entities";
import { conditionDataReducer, taskDataReducer } from "@/src/pages/event";
import { filtersWindowStateReducer } from "@/src/widgets";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    eventName: eventNameReducer,
    taskData: taskDataReducer,
    conditionData: conditionDataReducer,
    blockReorderingState: blockReorderingReducer,
    tasksReorderingState: tasksReorderingReducer,
    filtersWindowState: filtersWindowStateReducer,
  },
});
