export { default as BaseEditorContent } from "./ui/BaseEditorContent/BaseEditorContent.tsx";

export {
  setTaskId,
  setTaskOrder,
  default as taskDataReducer,
  taskDataSlice,
} from "../../../pages/event/model/taskDataSlice.tsx";

export {
  default as conditionDataReducer,
  conditionDataSlice,
  selectCondition,
} from "../../../pages/event/model/conditionSlice.tsx";
