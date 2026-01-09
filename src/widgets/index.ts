export { default as BaseLayout } from "./baseLayout/ui/BaseLayout.tsx";

export { EventHeader } from "./eventHeader";
export { default as LinkEventCard } from "./linkEventCard/ui/LinkEventCard.tsx";

export {
  conditionDataReducer,
  EditorContent,
  taskDataReducer,
} from "./eventContentByRole/editorContent";
export { ParticipantContent } from "./eventContentByRole/participantContent";

export { ChoiceTask } from "./taskViews/choiceTask";
export { InfoBlock } from "./taskViews/infoBlock";
export { TextEntryTask } from "./taskViews/textEntryTask";
