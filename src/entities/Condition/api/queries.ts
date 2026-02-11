export const taskQuery = {
  base: (eventId: string, blockId: string) => [eventId, blockId] as const,
  // editorTaskData: (eventId: string, blockId: string, taskId: string) =>
  //   [...taskQueries.base(eventId, blockId), taskId, "editorTaskData"] as const,
};
