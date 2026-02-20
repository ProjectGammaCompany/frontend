export { default as EventPage } from "./ui/EventPage/EventPage.tsx";

export {
  setTaskId,
  setTaskOrder,
  default as taskDataReducer,
  taskDataSlice,
} from "./model/taskDataSlice.tsx";

export {
  default as conditionDataReducer,
  conditionDataSlice,
  selectCondition,
} from "./model/conditionSlice.tsx";
