export { default as EventCard } from "./Event/ui/EventCard/EventCard.tsx";
export {
  EventForm,
  type BaseEventFormData,
  type EventFormData,
} from "./Event/ui/EventForm/EventForm.tsx";

export {
  getEvents,
  type Event,
  type getEventsResponse,
} from "./Event/api/getEvents.ts";

export {
  createEvent,
  type createEventResponse,
} from "./Event/api/createEvent.ts";

export { getTags, type Tag } from "./Tag";

//TODO: добавить index.ts для каждой сущности

export {
  deleteEvent,
  editEventSettings,
  eventNameReducer,
  getEditingEventData,
  getEditingEventSettings,
  getPlayerInfo,
  selectEventName,
  setName,
  type BlockItemData,
  type EditingEventSettings,
  type getEditingEventDataResponse,
  type Group,
} from "./Event";

export {
  BlockCard,
  deleteBlock,
  getConditions,
  getEditingBlockData,
  getTasks,
  type Condition,
  type GetConditionsResponse,
  type GetTasksResponse,
  type TaskItemData,
} from "./Block";

export {
  createTask,
  deleteTask,
  getEditorTaskData,
  TaskForm,
  TaskView,
  type ClientOption,
  type CreateTaskResponse,
  type ServerOption,
} from "./Task";

export {
  ConditionForm,
  createCondition,
  type ConditionData,
  type CreateConditionResponse,
} from "./Condition";
