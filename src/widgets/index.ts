export { default as BaseLayout } from "./baseLayout/ui/BaseLayout/BaseLayout.tsx";

export { EventHeader } from "./eventHeader";
export { default as LinkEventCard } from "./linkEventCard/ui/LinkEventCard.tsx";

export {
  conditionDataReducer,
  EditorContent,
  taskDataReducer,
} from "./eventContentByRole/editorContent";
export { PlayerContent } from "./eventContentByRole/playerContent";

export { ChoiceTask } from "./taskViews/choiceTask";
export { InfoBlock } from "./taskViews/infoBlock";
export { TextEntryTask } from "./taskViews/textEntryTask";
