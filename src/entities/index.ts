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
  blockReorderingReducer,
  deleteEvent,
  editEventSettings,
  eventNameReducer,
  eventQueries,
  getEditingEventData,
  getEditingEventSettings,
  getEventsHistory,
  getFavoritesEvents,
  getNextStage,
  getPlayerInfo,
  getUserEvents,
  selectBlockReorderingState,
  selectEventName,
  setBlockReorderingState,
  setName,
  useEditingEventData,
  useJoinRequiredFields,
  usePersonalEvents,
  useUpdateBlocksOrder,
  type BlockItemData,
  type BlockStage,
  type ClientGroup,
  type EditEventSettingsResponse,
  type EditingEventSettings,
  type EndStage,
  type getEditingEventDataResponse,
  type GetNextStageResponse,
  type QueryFnType,
  type ServerGroup,
  type TaskItem,
  type TaskOption,
  type TaskStage,
  type TaskStageData,
} from "./Event";

export {
  BlockCard,
  blockQueries,
  deleteBlock,
  getBlockSettings,
  getConditions,
  getTasks,
  selectTasksReorderingState,
  setTasksReorderingState,
  tasksReorderingReducer,
  updateBlockSettings,
  useBlockSettings,
  useConditions,
  useTasks,
  useUpdateBlockName,
  useUpdateBlockSettings,
  useUpdateTasksOrder,
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

export {
  getNotifications,
  NotificationCard,
  useDeleteNotification,
  useNotifications,
  type CustomNotification,
  type EventEndExtra,
  type EventStartExtra,
  type GetNotificationsQueryData,
  type NotificationType,
} from "./Notification";

export {
  joinEvent,
  useJoinEvent,
  type JoinDetails,
  type UseJoinEventResponse,
} from "./User";
