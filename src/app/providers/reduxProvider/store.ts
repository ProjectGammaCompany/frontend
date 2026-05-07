import { tasksReorderingReducer } from "@/entities/Block";
import { blockReorderingReducer, eventNameReducer } from "@/entities/Event";
import { conditionDataReducer, taskDataReducer } from "@/pages/event";
import { filtersWindowStateReducer } from "@/widgets/baseLayout";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  eventName: eventNameReducer,
  taskData: taskDataReducer,
  conditionData: conditionDataReducer,
  blockReorderingState: blockReorderingReducer,
  tasksReorderingState: tasksReorderingReducer,
  filtersWindowState: filtersWindowStateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
