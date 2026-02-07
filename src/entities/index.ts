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
  blockQueries,
  deleteBlock,
  getBlockSettings,
  getConditions,
  getTasks,
  updateBlockSettings,
  useBlockSettings,
  useConditions,
  useTasks,
  useUpdateBlockName,
  useUpdateBlockSettings,
  type BlockSettings,
  type Condition,
  type GetConditionsResponse,
  type GetTasksResponse,
  type TaskItemData,
  type UpdateBlockData,
} from "./Block";

export {
  createTask,
  deleteTask,
  getEditorTaskData,
  TaskForm,
  taskQueries,
  TaskView,
  updateTask,
  useEditorTaskData,
  type ClientOption,
  type CreateTaskResponse,
  type getEditorTaskDataResponse,
  type ServerOption,
  type UpdateTaskResponse,
} from "./Task";

export {
  ConditionForm,
  createCondition,
  updateCondition,
  type ConditionData,
  type CreateConditionResponse,
  type UpdateConditionResponse,
} from "./Condition";
